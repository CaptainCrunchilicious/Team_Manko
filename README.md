
# Kishan Niwas - Smart Farming Application

A comprehensive React-based agricultural platform with 5 core modules designed to revolutionize modern farming practices.

## 🌱 Features

### Core Platform Modules

1. **AI Farming Chatbot** (`/ai-chatbot`)
   - OpenAI-powered agricultural advisor
   - Instant farming advice and recommendations
   - Interactive chat interface with sample questions
   - Expert guidance on crop management, pest control, and more

2. **Smart Crop Scanner** (`/crop-scanner`)
   - Plant.id integration for disease detection
   - Upload crop images for analysis
   - Detailed treatment plans and prevention tips
   - Confidence-based results with severity indicators

3. **Market Intelligence** (`/market-intelligence`)
   - Real-time price predictions
   - Market trends and demand analysis
   - Direct marketplace for buying/selling
   - Regional price comparisons

4. **Community Platform** (`/community`)
   - Farmer knowledge sharing network
   - Discussion forums by category
   - Expert consultations
   - Community guidelines and moderation

5. **Gamified Rewards** (`/rewards`)
   - Points and badges for sustainable practices
   - Achievement system with different rarities
   - Leaderboards and progress tracking
   - Rewards store with farming equipment and consultations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agri-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: Custom CSS with modern design patterns
- **State Management**: React Hooks (useState, useEffect)

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 Design Features

- Modern, clean interface with agricultural theme
- Intuitive navigation with icon-based menu
- Interactive components with hover effects
- Consistent color scheme using green tones
- Accessible design with proper contrast ratios

## 🔧 Development

### Project Structure
```
src/
├── components/
│   └── Navbar.jsx          # Main navigation component
├── pages/
│   ├── LandingPage.jsx     # Homepage with feature overview
│   ├── AIFarmingChatbot.jsx # AI advisor interface
│   ├── SmartCropScanner.jsx # Disease detection tool
│   ├── MarketIntelligence.jsx # Price tracking & marketplace
│   ├── CommunityPlatform.jsx # Discussion forums
│   └── GamifiedRewards.jsx  # Achievement system
├── App.jsx                 # Main app component with routing
├── App.css                 # Comprehensive styling
├── index.css               # Base styles
└── main.jsx               # Application entry point
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Implementation

### Landing Page
- Hero section with call-to-action buttons
- Feature cards with hover animations
- Benefits section highlighting platform advantages
- Responsive grid layouts

### AI Chatbot
- Mock OpenAI integration (ready for real API)
- Sample questions for user guidance
- Message history with user/bot distinction
- Loading states and error handling

### Crop Scanner
- Image upload functionality
- Mock Plant.id API integration
- Disease detection with confidence scores
- Treatment and prevention recommendations

### Market Intelligence
- Price tracking with trend indicators
- Market statistics and forecasting
- Direct marketplace listings
- Regional filtering options

### Community Platform
- Discussion forums with categories
- Expert profiles and ratings
- Search and filter functionality
- Community statistics dashboard

### Rewards System
- Multi-level achievement system
- Progress tracking with visual indicators
- Leaderboards and rankings
- Rewards store with point redemption

## 🔮 Future Enhancements

- Real API integrations (OpenAI, Plant.id)
- User authentication and profiles
- Real-time chat functionality
- Push notifications for market alerts
- Mobile app development
- Advanced analytics dashboard
- Multi-language support

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ for the farming community
