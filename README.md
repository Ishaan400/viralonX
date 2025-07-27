# 🧠 viralonX – AI-Powered Tweet Generator

**viralonX** is an AI-driven platform that helps users create high-impact, viral tweets by combining real-time global trends, Reddit buzzwords, and powerful language generation. Simply input a topic, YouTube video URL, or webpage URL — and ViralonX will generate a tweet crafted to maximize reach and engagement. By leveraging the latest trending data and generative AI, it empowers creators to stay relevant and connect with today’s audience effectively.

## 🔥 Features

* ✨ **Generate Viral Tweets** using Cohere's powerful language model.
* 📈 **Fetch Trending Topics** from Trend24 API.
* 📹 **Extract Video Transcripts** using `yt-dlp` for contextual tweet generation.
* 🌐 **Analyze Reddit Threads** to extract viral buzzwords.
* 🔐 Secure login/signup with hashed passwords and JWT-based sessions.
* 🧾 History tracking of generated tweets for logged-in users.

## 🚀 Tech Stack

* **Frontend**: Next.js 15 (App Router)
* **Backend**: API Routes with MongoDB (Mongoose)
* **AI Provider**: [Cohere](https://cohere.com/)
* **Other Tools**: `yt-dlp`, `sanitize-html`, `Trend24 API`, `Reddit API`

## 🛠️ Local Development

### Prerequisites

* Node.js ≥ 18
* MongoDB URI
* Cohere API Key (`COHERE_API_KEY`)

### Setup

```bash
git clone https://github.com/yourusername/viralsaas.git
cd viralsaas
npm install
```

### Configure Environment Variables

Create a `.env` file with the following:

```env
COHERE_API_KEY=your_cohere_key
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret
```

### Run Locally

```bash
npm run dev
```

For production:

```bash
npm run build
npm run start
```

## 📦 Deployment (Render / Railway)

**Build command:**

```bash
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o yt-dlp && chmod +x yt-dlp && npm install && npm run build
```

**Start command:**

```bash
npm run start
```

Ensure the following environment variables are added in Render/Railway:

* `COHERE_API_KEY`
* `MONGODB_URI`
* `JWT_SECRET`

## 📄 License

MIT © [Ishaan400](https://github.com/Ishaan400)


