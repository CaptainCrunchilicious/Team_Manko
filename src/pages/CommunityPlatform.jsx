import { useState } from 'react'
import { Users, MessageCircle, ThumbsUp, Share2, Plus, Search, Filter } from 'lucide-react'

const CommunityPlatform = () => {
  const [activeTab, setActiveTab] = useState('discussions')
  const [searchTerm, setSearchTerm] = useState('')

  const discussions = [
    {
      id: 1,
      title: 'Best practices for organic pest control?',
      author: 'Sarah Johnson',
      avatar: '👩‍🌾',
      category: 'Pest Control',
      replies: 23,
      likes: 45,
      timeAgo: '2 hours ago',
      preview: 'I\'ve been struggling with aphids on my tomato plants. Looking for organic solutions that won\'t harm beneficial insects...'
    },
    {
      id: 2,
      title: 'Soil pH testing - when and how often?',
      author: 'Mike Chen',
      avatar: '👨‍🌾',
      category: 'Soil Health',
      replies: 18,
      likes: 32,
      timeAgo: '5 hours ago',
      preview: 'New to farming and wondering about soil testing frequency. Should I test every season or just once a year?'
    },
    {
      id: 3,
      title: 'Drought-resistant crops for climate change',
      author: 'Emma Rodriguez',
      avatar: '👩‍🌾',
      category: 'Climate Adaptation',
      replies: 41,
      likes: 78,
      timeAgo: '1 day ago',
      preview: 'With changing weather patterns, I\'m looking to diversify with more drought-resistant varieties. What has worked for you?'
    },
    {
      id: 4,
      title: 'Equipment sharing program in Iowa',
      author: 'Tom Wilson',
      avatar: '👨‍🌾',
      category: 'Equipment',
      replies: 12,
      likes: 28,
      timeAgo: '2 days ago',
      preview: 'Starting a local equipment sharing cooperative. Who\'s interested in joining? We can split costs on expensive machinery...'
    }
  ]

  const experts = [
    {
      id: 1,
      name: 'Dr. Lisa Martinez',
      title: 'Soil Scientist',
      avatar: '👩‍🔬',
      expertise: ['Soil Health', 'Nutrient Management'],
      rating: 4.9,
      answers: 156
    },
    {
      id: 2,
      name: 'John Peterson',
      title: 'Organic Farming Specialist',
      avatar: '👨‍🌾',
      expertise: ['Organic Methods', 'Pest Control'],
      rating: 4.8,
      answers: 203
    },
    {
      id: 3,
      name: 'Maria Santos',
      title: 'Climate Adaptation Expert',
      avatar: '👩‍🌾',
      expertise: ['Climate Change', 'Water Management'],
      rating: 4.9,
      answers: 89
    }
  ]

  const categories = [
    'All Categories',
    'Pest Control',
    'Soil Health',
    'Climate Adaptation',
    'Equipment',
    'Crop Management',
    'Marketing',
    'Sustainability'
  ]

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.preview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="community-page">
      <div className="community-container">
        <div className="community-header">
          <Users className="header-icon" />
          <div>
            <h1>Community Platform</h1>
            <p>Connect with farmers, share knowledge, and learn together</p>
          </div>
          <button className="new-post-btn">
            <Plus size={20} />
            New Post
          </button>
        </div>

        <div className="community-tabs">
          <button 
            className={`tab ${activeTab === 'discussions' ? 'active' : ''}`}
            onClick={() => setActiveTab('discussions')}
          >
            <MessageCircle size={18} />
            Discussions
          </button>
          <button 
            className={`tab ${activeTab === 'experts' ? 'active' : ''}`}
            onClick={() => setActiveTab('experts')}
          >
            <Users size={18} />
            Experts
          </button>
        </div>

        {activeTab === 'discussions' && (
          <div className="discussions-section">
            <div className="search-filters">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="category-filter">
                <Filter size={18} />
                <select>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="discussions-list">
              {filteredDiscussions.map(discussion => (
                <div key={discussion.id} className="discussion-card">
                  <div className="discussion-header">
                    <div className="author-info">
                      <span className="avatar">{discussion.avatar}</span>
                      <div>
                        <h3>{discussion.title}</h3>
                        <p className="author">by {discussion.author} • {discussion.timeAgo}</p>
                      </div>
                    </div>
                    <span className="category-tag">{discussion.category}</span>
                  </div>
                  
                  <p className="discussion-preview">{discussion.preview}</p>
                  
                  <div className="discussion-stats">
                    <div className="stat">
                      <MessageCircle size={16} />
                      {discussion.replies} replies
                    </div>
                    <div className="stat">
                      <ThumbsUp size={16} />
                      {discussion.likes} likes
                    </div>
                    <button className="share-btn">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experts' && (
          <div className="experts-section">
            <div className="experts-intro">
              <h2>Agricultural Experts</h2>
              <p>Get advice from certified agricultural professionals and experienced farmers</p>
            </div>

            <div className="experts-grid">
              {experts.map(expert => (
                <div key={expert.id} className="expert-card">
                  <div className="expert-header">
                    <span className="expert-avatar">{expert.avatar}</span>
                    <div>
                      <h3>{expert.name}</h3>
                      <p className="expert-title">{expert.title}</p>
                    </div>
                  </div>

                  <div className="expert-expertise">
                    <h4>Expertise:</h4>
                    <div className="expertise-tags">
                      {expert.expertise.map(skill => (
                        <span key={skill} className="expertise-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="expert-stats">
                    <div className="stat">
                      <span className="rating">★ {expert.rating}</span>
                    </div>
                    <div className="stat">
                      {expert.answers} answers
                    </div>
                  </div>

                  <button className="ask-expert-btn">
                    Ask Question
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="community-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>2,847</h3>
              <p>Active Farmers</p>
            </div>
            <div className="stat-card">
              <h3>1,234</h3>
              <p>Discussions</p>
            </div>
            <div className="stat-card">
              <h3>5,678</h3>
              <p>Questions Answered</p>
            </div>
            <div className="stat-card">
              <h3>89%</h3>
              <p>Problem Resolution Rate</p>
            </div>
          </div>
        </div>

        <div className="community-guidelines">
          <h2>Community Guidelines</h2>
          <div className="guidelines-grid">
            <div className="guideline">
              <h4>Be Respectful</h4>
              <p>Treat all community members with respect and kindness</p>
            </div>
            <div className="guideline">
              <h4>Share Knowledge</h4>
              <p>Help others by sharing your farming experiences and insights</p>
            </div>
            <div className="guideline">
              <h4>Stay On Topic</h4>
              <p>Keep discussions focused on agriculture and farming topics</p>
            </div>
            <div className="guideline">
              <h4>Verify Information</h4>
              <p>Double-check facts before sharing advice that could impact crops</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPlatform