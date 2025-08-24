import { useState } from 'react'
import { Trophy, Star, Target, Gift, Leaf, Droplets, Recycle, Users } from 'lucide-react'

const GamifiedRewards = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const userStats = {
    totalPoints: 2847,
    level: 8,
    nextLevelPoints: 3000,
    badges: 12,
    streak: 15,
    rank: 'Eco Warrior'
  }

  const badges = [
    {
      id: 1,
      name: 'Water Saver',
      description: 'Reduced water usage by 20%',
      icon: Droplets,
      earned: true,
      points: 100,
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Composting Champion',
      description: 'Composted 500kg of organic waste',
      icon: Recycle,
      earned: true,
      points: 150,
      rarity: 'uncommon'
    },
    {
      id: 3,
      name: 'Organic Pioneer',
      description: 'Converted 5 acres to organic farming',
      icon: Leaf,
      earned: true,
      points: 300,
      rarity: 'rare'
    },
    {
      id: 4,
      name: 'Community Helper',
      description: 'Helped 50 farmers in the community',
      icon: Users,
      earned: false,
      points: 200,
      rarity: 'uncommon'
    },
    {
      id: 5,
      name: 'Carbon Neutral',
      description: 'Achieved carbon neutral farming',
      icon: Target,
      earned: false,
      points: 500,
      rarity: 'legendary'
    }
  ]

  const challenges = [
    {
      id: 1,
      title: 'Reduce Water Usage',
      description: 'Cut water consumption by 15% this month',
      progress: 78,
      reward: 120,
      deadline: '5 days left',
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Plant Cover Crops',
      description: 'Plant cover crops on 2 acres',
      progress: 50,
      reward: 200,
      deadline: '12 days left',
      difficulty: 'Easy'
    },
    {
      id: 3,
      title: 'Zero Pesticide Week',
      description: 'Go pesticide-free for 7 consecutive days',
      progress: 30,
      reward: 300,
      deadline: '3 days left',
      difficulty: 'Hard'
    }
  ]

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', points: 4521, badge: '🏆' },
    { rank: 2, name: 'Mike Chen', points: 4102, badge: '🥈' },
    { rank: 3, name: 'Emma Rodriguez', points: 3876, badge: '🥉' },
    { rank: 4, name: 'You', points: 2847, badge: '⭐' },
    { rank: 5, name: 'Tom Wilson', points: 2634, badge: '' }
  ]

  const rewards = [
    {
      id: 1,
      name: 'Organic Seeds Pack',
      cost: 500,
      description: 'Premium organic vegetable seeds',
      image: '🌱',
      available: true
    },
    {
      id: 2,
      name: 'Soil Testing Kit',
      cost: 800,
      description: 'Professional soil analysis kit',
      image: '🧪',
      available: true
    },
    {
      id: 3,
      name: 'Farming Equipment Discount',
      cost: 1200,
      description: '20% off next equipment purchase',
      image: '🚜',
      available: true
    },
    {
      id: 4,
      name: 'Expert Consultation',
      cost: 2000,
      description: '1-hour session with agricultural expert',
      image: '👨‍🌾',
      available: true
    }
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-500'
      case 'uncommon': return 'text-green-500'
      case 'rare': return 'text-blue-500'
      case 'legendary': return 'text-purple-500'
      default: return 'text-gray-500'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500'
      case 'Medium': return 'text-yellow-500'
      case 'Hard': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="rewards-page">
      <div className="rewards-container">
        <div className="rewards-header">
          <Trophy className="header-icon" />
          <div>
            <h1>Gamified Rewards</h1>
            <p>Earn points and badges for sustainable farming practices</p>
          </div>
        </div>

        <div className="user-progress">
          <div className="progress-card">
            <div className="level-info">
              <h2>Level {userStats.level}</h2>
              <p>{userStats.rank}</p>
            </div>
            <div className="points-info">
              <h3>{userStats.totalPoints.toLocaleString()} Points</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(userStats.totalPoints / userStats.nextLevelPoints) * 100}%` }}
                ></div>
              </div>
              <p>{userStats.nextLevelPoints - userStats.totalPoints} points to next level</p>
            </div>
            <div className="stats-grid">
              <div className="stat">
                <Trophy size={20} />
                <span>{userStats.badges} Badges</span>
              </div>
              <div className="stat">
                <Target size={20} />
                <span>{userStats.streak} Day Streak</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rewards-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'badges' ? 'active' : ''}`}
            onClick={() => setActiveTab('badges')}
          >
            Badges
          </button>
          <button 
            className={`tab ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges
          </button>
          <button 
            className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
          <button 
            className={`tab ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            Rewards Store
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="recent-achievements">
                <h3>Recent Achievements</h3>
                <div className="achievements-list">
                  {badges.filter(badge => badge.earned).slice(0, 3).map(badge => {
                    const Icon = badge.icon
                    return (
                      <div key={badge.id} className="achievement-item">
                        <Icon size={24} className={getRarityColor(badge.rarity)} />
                        <div>
                          <h4>{badge.name}</h4>
                          <p>+{badge.points} points</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="active-challenges">
                <h3>Active Challenges</h3>
                <div className="challenges-preview">
                  {challenges.slice(0, 2).map(challenge => (
                    <div key={challenge.id} className="challenge-preview">
                      <h4>{challenge.title}</h4>
                      <div className="challenge-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                        <span>{challenge.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="badges-section">
            <div className="badges-grid">
              {badges.map(badge => {
                const Icon = badge.icon
                return (
                  <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}>
                    <div className="badge-icon">
                      <Icon size={32} className={getRarityColor(badge.rarity)} />
                    </div>
                    <h3>{badge.name}</h3>
                    <p>{badge.description}</p>
                    <div className="badge-info">
                      <span className={`rarity ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                      <span className="points">+{badge.points} pts</span>
                    </div>
                    {!badge.earned && <div className="badge-overlay">🔒</div>}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="challenges-section">
            <div className="challenges-list">
              {challenges.map(challenge => (
                <div key={challenge.id} className="challenge-card">
                  <div className="challenge-header">
                    <h3>{challenge.title}</h3>
                    <span className={`difficulty ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p>{challenge.description}</p>
                  <div className="challenge-progress">
                    <div className="progress-info">
                      <span>Progress: {challenge.progress}%</span>
                      <span>{challenge.deadline}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="challenge-reward">
                    <Gift size={16} />
                    <span>{challenge.reward} points reward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="leaderboard-section">
            <div className="leaderboard-list">
              {leaderboard.map(user => (
                <div key={user.rank} className={`leaderboard-item ${user.name === 'You' ? 'current-user' : ''}`}>
                  <div className="rank">
                    <span className="rank-number">#{user.rank}</span>
                    <span className="rank-badge">{user.badge}</span>
                  </div>
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.points.toLocaleString()} points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="rewards-section">
            <div className="rewards-balance">
              <h3>Available Points: {userStats.totalPoints.toLocaleString()}</h3>
            </div>
            <div className="rewards-grid">
              {rewards.map(reward => (
                <div key={reward.id} className="reward-card">
                  <div className="reward-image">{reward.image}</div>
                  <h3>{reward.name}</h3>
                  <p>{reward.description}</p>
                  <div className="reward-cost">
                    <Star size={16} />
                    {reward.cost} points
                  </div>
                  <button 
                    className={`redeem-btn ${userStats.totalPoints >= reward.cost ? 'available' : 'disabled'}`}
                    disabled={userStats.totalPoints < reward.cost}
                  >
                    {userStats.totalPoints >= reward.cost ? 'Redeem' : 'Not Enough Points'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GamifiedRewards