# viralonX - AI-Powered Tweet Generator

A modern, interactive web application that generates viral tweets using AI technology. The platform leverages real-time trending topics from Twitter and viral keywords from across the internet to create engaging, viral-worthy content. Built with the power of viralonX.

## ✨ Features

- **AI-Powered Generation**: Advanced AI creates engaging, viral-worthy tweets
- **Trending Topics**: Real-time trending topics from Twitter for relevance
- **Viral Keywords**: Integration with Reddit and Google Trends for maximum engagement
- **Interactive UI**: Modern, responsive design with smooth animations
- **Real-time Processing**: Instant tweet generation with loading states
- **History Tracking**: Save and manage all generated tweets
- **Multiple Input Types**: Support for text, article URLs, and YouTube URLs

## 🎨 Design Features

- **Modern Color Scheme**: Beautiful blue/teal gradient theme
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Responsive Design**: Works perfectly on all devices
- **Glassmorphism**: Modern backdrop blur effects and transparency
- **Smooth Animations**: CSS animations and micro-interactions
- **Enhanced UX**: Focus states, loading indicators, and visual feedback

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:Ishaan400/viralonX.git
cd viralonX
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Backend**: Node.js API routes
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI API, Cohere AI
- **Authentication**: JWT tokens

## 📱 Pages

### Landing Page (`/`)
- Interactive hero section with animations
- Feature showcase with auto-rotating highlights
- Backend technology showcase
- Call-to-action sections

### Sign Up (`/signup`)
- Modern authentication form
- Interactive input fields with focus states
- Feature highlights for new users
- Smooth transitions and animations

### Sign In (`/login`)
- Clean login interface
- Enhanced form validation
- Responsive design with backdrop blur

### Dashboard (`/dashboard`)
- **Generate Tab**: AI tweet generation interface
- **History Tab**: View and manage generated tweets
- Interactive navigation with smooth transitions
- Real-time loading states

## 🎯 Key Components

- **Navbar**: Responsive navigation with active states
- **TweetGenerator**: AI-powered content generation
- **TweetHistory**: Tweet management and history
- **LoadingSpinner**: Enhanced loading indicators
- **AuthForm**: Modern authentication forms
- **PerformanceMonitor**: Real-time performance metrics

## 🔧 Customization

### Colors
The application uses a modern blue/teal color scheme defined in `app/globals.css`:
- Primary Blue: `#3b82f6`
- Primary Teal: `#14b8a6`
- Primary Indigo: `#6366f1`

### Animations
Custom CSS animations include:
- Floating effects
- Glow effects
- Shimmer loading states
- Smooth transitions

## 📊 API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `POST /api/generate` - Generate tweets
- `GET /api/history` - Fetch tweet history
- `GET /api/validate` - Validate JWT token

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Ensure these are set in production:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `OPENAI_API_KEY` - OpenAI API key
- `COHERE_API_KEY` - Cohere AI API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support & Contact

For support, questions about the backend implementation, or collaboration opportunities:

- **Email**: [ishname200@gmail.com](mailto:ishname200@gmail.com)
- **GitHub Issues**: Open an issue in the repository for bugs or feature requests

## 🏗️ Backend Architecture Details

### **Core Technologies**
- **Runtime**: Node.js with Next.js 15 API routes
- **Database**: MongoDB with Mongoose ODM for data modeling
- **Authentication**: JWT-based session management with bcrypt password hashing
- **API Design**: RESTful endpoints with proper HTTP status codes and error handling

### **External API Integrations**
- **OpenAI API**: Advanced text generation and content creation
- **Cohere AI**: Natural language processing and text analysis
- **Twitter Trends**: Real-time trending topic extraction
- **Reddit API**: Viral keyword and buzzword analysis
- **YouTube Transcripts**: Video content analysis for tweet generation

### **Security Features**
- **Password Hashing**: bcrypt with salt rounds for secure storage
- **JWT Tokens**: Secure session management with expiration
- **Input Validation**: Sanitized inputs to prevent injection attacks
- **Environment Variables**: Secure configuration management

### **Performance Optimizations**
- **Database Indexing**: Optimized MongoDB queries
- **Caching**: Efficient data retrieval patterns
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Rate Limiting**: API usage controls and abuse prevention

---

**Built with ❤️ by [Ishaan](mailto:ishname200@gmail.com) using Next.js and modern web technologies**


