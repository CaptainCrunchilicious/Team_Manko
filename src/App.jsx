import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import AIFarmingChatbot from './pages/AIFarmingChatbot'
import SmartCropScanner from './pages/SmartCropScanner'
import MarketIntelligence from './pages/MarketIntelligence'
import CommunityPlatform from './pages/CommunityPlatform'
import GamifiedRewards from './pages/GamifiedRewards'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ai-chatbot" element={<AIFarmingChatbot />} />
          <Route path="/crop-scanner" element={<SmartCropScanner />} />
          <Route path="/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/community" element={<CommunityPlatform />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
