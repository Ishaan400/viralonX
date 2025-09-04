'use client';

export default function LazyBackendInfo() {
  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">
          🛠️ Built with Modern Backend Technologies
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div>
            <h4 className="text-lg font-semibold text-blue-300 mb-3">Backend Architecture</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• <strong>Node.js</strong> with Next.js 15 API routes</li>
              <li>• <strong>MongoDB</strong> database with Mongoose ODM</li>
              <li>• <strong>JWT Authentication</strong> for secure user sessions</li>
              <li>• <strong>RESTful API</strong> design with proper error handling</li>
              <li>• <strong>Environment-based</strong> configuration</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-teal-300 mb-3">External Services</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• <strong>Cohere</strong> for text generation</li>
              <li>• <strong>Trends24</strong> for real-time trending topics</li>
              <li>• <strong>Reddit</strong> for viral keyword extraction</li>
              <li>• <strong>yt-dlp</strong> for YouTube captions (auto-sub) parsing</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm mb-2">Have questions about the backend implementation?</p>
          <a 
            href="mailto:ishname200@gmail.com" 
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
          >
            📧 ishname200@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
