import { Link } from 'react-router-dom'
import { Bot, Scan, TrendingUp, Users, Trophy, ArrowRight, Leaf, Shield, Zap } from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI Farming Chatbot',
      description: 'Get instant agricultural advice powered by OpenAI technology',
      link: '/ai-chatbot',
      color: 'bg-blue-500'
    },
    {
      icon: Scan,
      title: 'Smart Crop Scanner',
      description: 'Detect plant diseases and get treatment plans using Plant.id',
      link: '/crop-scanner',
      color: 'bg-green-500'
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Price predictions and direct marketplace access',
      link: '/market-intelligence',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Community Platform',
      description: 'Connect with farmers and share knowledge',
      link: '/community',
      color: 'bg-orange-500'
    },
    {
      icon: Trophy,
      title: 'Gamified Rewards',
      description: 'Earn points and badges for sustainable practices',
      link: '/rewards',
      color: 'bg-yellow-500'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Reliable Solutions',
      description: 'AI-powered insights you can trust for your farming decisions'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate answers and solutions to your agricultural challenges'
    },
    {
      icon: Leaf,
      title: 'Sustainable Farming',
      description: 'Promote eco-friendly practices with our reward system'
    }
  ]

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Smart Farming for the <span className="text-green-500">Future</span>
          </h1>
          <p className="hero-description">
            Revolutionize your agricultural practices with AI-powered tools, 
            community insights, and sustainable farming rewards.
          </p>
          <div className="hero-buttons">
            <Link to="/ai-chatbot" className="btn btn-primary">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link to="/community" className="btn btn-secondary">
              Join Community
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card">
            <Leaf size={64} className="text-green-500" />
            <h3>5 Core Modules</h3>
            <p>Everything you need for modern farming</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Platform Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link key={index} to={feature.link} className="feature-card">
                  <div className={`feature-icon ${feature.color}`}>
                    <Icon size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-arrow">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Choose AgriPlatform?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="benefit-card">
                  <Icon size={48} className="benefit-icon" />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Farming?</h2>
            <p>Join thousands of farmers already using our platform</p>
            <Link to="/ai-chatbot" className="btn btn-primary btn-large">
              Start Your Journey <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage