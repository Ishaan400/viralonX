// utils/parseContent.js

import { extract } from '@extractus/article-extractor';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Given a blog/article URL, fetches and returns its main content as plain text.
 * Returns an empty string on failure.
 */
export async function parseArticle(url) {
  try {
    const article = await extract(url);
    const html = article?.content || '';

    // ✅ Strip all HTML tags, collapse whitespace
    const plainText = html
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return plainText;
  } catch (err) {
    console.error('❌ parseArticle error:', err.message);
    return '';
  }
}

/**
 * Fetches auto-generated English subtitles using yt-dlp,
 * cleans out all timing markup/headers, and returns plain text.
 */
export async function parseYouTube(linkOrId) {
  try {
    // 1. Extract video ID from URL or assume it's already the ID
    let videoId = linkOrId;
    try {
      const url = new URL(linkOrId);
      videoId = url.searchParams.get('v') || url.pathname.split('/').pop();
    } catch {
      // Not a full URL, treat as ID
    }

    // 2. Build and run yt-dlp command (robust settings and predictable output)
    let YT_DLP = process.env.YT_DLP_PATH || 'yt-dlp';
    // If a custom path is provided but invalid, fall back to PATH
    try {
      if (YT_DLP && YT_DLP !== 'yt-dlp' && !fs.existsSync(YT_DLP)) {
        console.warn('⚠️ YT_DLP_PATH not found on disk, falling back to yt-dlp in PATH');
        YT_DLP = 'yt-dlp';
      }
      if (/yt-dllp/i.test(String(YT_DLP))) {
        console.warn('⚠️ Detected likely typo in YT_DLP_PATH (yt-dllp). Falling back to yt-dlp');
        YT_DLP = 'yt-dlp';
      }
    } catch {}
    // Ensure we try both auto and regular subs, accept en or en-* locales, and try impersonation/cookies if provided
    const baseUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const cookiesArg = process.env.YT_COOKIES_PATH ? ` --cookies "${process.env.YT_COOKIES_PATH}"` : '';
    const attempts = [
      `"${YT_DLP}" --skip-download --write-auto-sub --write-sub --sub-langs en,en.* --sub-format vtt --convert-subs vtt -o ${videoId}.%(ext)s${cookiesArg} "${baseUrl}"`,
      `"${YT_DLP}" --skip-download --write-auto-sub --write-sub --sub-langs en,en.* --sub-format vtt --convert-subs vtt --extractor-args "youtube:player_client=android" -o ${videoId}.%(ext)s${cookiesArg} "${baseUrl}"`,
      `"${YT_DLP}" --skip-download --write-auto-sub --sub-langs en,en.* --sub-format vtt --convert-subs vtt -o ${videoId}.%(ext)s${cookiesArg} "${baseUrl}"`,
    ];

    for (const attempt of attempts) {
      try {
        await new Promise((resolve, reject) => {
          exec(attempt, { shell: true }, (err) => (err ? reject(err) : resolve()));
        });
      } catch {
        // try next attempt
      }
      const maybeVtt = findVttForVideoId(videoId);
      if (maybeVtt) break;
    }

    // 3. Find the produced .vtt file (could be en, en-US, etc.)
    let vttPath = findVttForVideoId(videoId);

    if (!vttPath) {
      console.log('❌ No subtitles file found (yt-dlp ran but no VTT). Falling back to title/description.');
      // Fallback: use yt-dlp JSON to get title + description
      try {
        const metaCmd = `"${YT_DLP}" -J "https://www.youtube.com/watch?v=${videoId}"`;
        const stdout = await new Promise((resolve, reject) => {
          exec(metaCmd, { shell: true, maxBuffer: 20 * 1024 * 1024 }, (err, out) => (err ? reject(err) : resolve(out)));
        });
        const info = JSON.parse(stdout);
        const title = info?.title || '';
        const description = info?.description || '';
        const metaText = `${title}\n\n${description}`.replace(/\s+/g, ' ').trim();
        if (metaText) return metaText;
      } catch (e) {
        console.log('⚠️ yt-dlp metadata fallback failed:', e?.message || e);
      }
      return '';
    }

    const raw = fs.readFileSync(vttPath, 'utf-8');
    try { fs.unlinkSync(vttPath); } catch {}

    // 4. Clean .vtt content into plain text
    const text = raw
      .split('\n')
      .filter(line =>
        line.trim() &&
        !/^[0-9]+$/.test(line) &&
        !line.includes('-->') &&
        !line.startsWith('WEBVTT') &&
        !/^NOTE/.test(line)
      )
      .map(line => line.replace(/<[^>]+>/g, '').trim())
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    return text;
  } catch (err) {
    console.error('❌ parseYouTube error:', err.message);
    return '';
  }
}

function findVttForVideoId(videoId) {
  const candidates = [
    path.resolve(process.cwd(), `${videoId}.en.vtt`),
    path.resolve(process.cwd(), `${videoId}.en-US.vtt`),
    path.resolve(process.cwd(), `${videoId}.en-GB.vtt`),
  ];
  let vttPath = candidates.find(p => fs.existsSync(p));
  if (!vttPath) {
    const files = fs.readdirSync(process.cwd());
    vttPath = files
      .filter(f => f.startsWith(`${videoId}.`) && f.endsWith('.vtt'))
      .map(f => path.resolve(process.cwd(), f))[0];
  }
  return vttPath;
}
