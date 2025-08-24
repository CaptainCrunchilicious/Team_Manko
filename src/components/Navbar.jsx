import { Link, useLocation } from 'react-router-dom'
import { Bot, Scan, TrendingUp, Users, Trophy, Leaf } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Leaf },
    { path: '/ai-chatbot', label: 'AI Advisor', icon: Bot },
    { path: '/crop-scanner', label: 'Crop Scanner', icon: Scan },
    { path: '/market-intelligence', label: 'Market Intel', icon: TrendingUp },
    { path: '/community', label: 'Community', icon: Users },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Leaf className="logo-icon" />
          <span>Kishan Niwas</span>
        </Link>

        <div className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar