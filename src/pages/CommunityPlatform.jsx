import { useState, useEffect } from 'react'
import { Users, MessageCircle, ThumbsUp, Share2, Plus, Search, Filter, X } from 'lucide-react'

const CommunityPlatform = () => {
  const [activeTab, setActiveTab] = useState('discussions')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [replyInputs, setReplyInputs] = useState({})
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    preview: "",
    category: "General"
  })

  const defaultDiscussions = [
    {
      id: 1,
      title: 'Best practices for organic pest control?',
      author: 'Rama Sharma',
      avatar: '👩‍🌾',
      category: 'Pest Control',
      likes: 45,
      timeAgo: '2 hours ago',
      preview: 'I\'ve been struggling with aphids on my tomato plants...',
      replies: [
        { id: 1, author: "Anita", text: "Try neem oil, works wonders!" },
        { id: 2, author: "Vikram", text: "Ladybugs are natural predators of aphids." }
      ]
    },
    {
      id: 2,
      title: 'Soil pH testing - when and how often?',
      author: 'Arjun Kesari',
      avatar: '👨‍🌾',
      category: 'Soil Health',
      likes: 32,
      timeAgo: '5 hours ago',
      preview: 'New to farming and wondering about soil testing frequency...',
      replies: []
    },
    {
      id: 3,
      title: 'Drought-resistant crops for climate change',
      author: 'Manish Verma',
      avatar: '👩‍🌾',
      category: 'Climate Adaptation',
      likes: 78,
      timeAgo: '1 day ago',
      preview: 'With changing weather patterns, I\'m looking to diversify...',
      replies: []
    }
  ]

  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem('discussions')
    return saved ? JSON.parse(saved) : defaultDiscussions
  })

  useEffect(() => {
    localStorage.setItem('discussions', JSON.stringify(discussions))
  }, [discussions])

  const experts = [
    {
      id: 1,
      name: 'Dr. Lisa Dehari',
      title: 'Soil Scientist',
      avatar: '👩‍🔬',
      expertise: ['Soil Health', 'Nutrient Management'],
      rating: 4.9,
      answers: 156
    },
    {
      id: 2,
      name: 'Mayank Godse',
      title: 'Organic Farming Specialist',
      avatar: '👨‍🌾',
      expertise: ['Organic Methods', 'Pest Control'],
      rating: 4.8,
      answers: 203
    },
    {
      id: 3,
      name: 'Anish Ramakant',
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
    'Sustainability',
    'General'
  ]

  // 🔹 Filter discussions
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All Categories' || discussion.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 🔹 Submit new post
  const handleSubmitNewPost = (e) => {
    e.preventDefault()
    if (newPost.title && newPost.preview) {
      const post = {
        id: discussions.length + 1,
        title: newPost.title,
        author: "You",
        avatar: "👨‍💻",
        category: newPost.category,
        likes: 0,
        timeAgo: "just now",
        preview: newPost.preview,
        replies: []
      }
      setDiscussions([post, ...discussions])
      setShowNewPostForm(false)
      setNewPost({ title: "", preview: "", category: "General" })
      setSelectedCategory("All Categories")
    }
  }

  const handleAskExpert = (expertName) => {
    const question = prompt(`Ask ${expertName} your question:`)
    if (question) {
      alert(`✅ Your question has been sent to ${expertName}: "${question}"`)
    }
  }

  const handleReply = (discussionId) => {
    const text = replyInputs[discussionId]
    if (text && text.trim() !== "") {
      const updated = discussions.map(d => {
        if (d.id === discussionId) {
          return {
            ...d,
            replies: [...d.replies, { id: d.replies.length + 1, author: "You", text }]
          }
        }
        return d
      })
      setDiscussions(updated)
      setReplyInputs({ ...replyInputs, [discussionId]: "" })
    }
  }

  return (
    <div className="community-page">
      <div className="community-container">
        {/* HEADER */}
        <div className="community-header">
          <Users className="header-icon" />
          <div>
            <h1>Community Platform</h1>
            <p>Connect with farmers, share knowledge, and learn together</p>
          </div>
          <button className="new-post-btn" onClick={() => setShowNewPostForm(true)}>
            <Plus size={20} />
            New Post
          </button>
        </div>

        {/* 🔹 New Post Modal */}
        {showNewPostForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Create New Post</h2>
                <button className="close-btn" onClick={() => setShowNewPostForm(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmitNewPost} className="new-post-form">
                <input
                  type="text"
                  placeholder="Post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Write your content..."
                  value={newPost.preview}
                  onChange={(e) => setNewPost({ ...newPost, preview: e.target.value })}
                  required
                />
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                >
                  {categories.filter(cat => cat !== "All Categories").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button type="submit" className="submit-post-btn">Publish</button>
              </form>
            </div>
          </div>
        )}

        {/* TABS */}
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

        {/* DISCUSSIONS */}
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
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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
                      {discussion.replies.length} replies
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

                  <div className="replies-section">
                    {discussion.replies.map(r => (
                      <div key={r.id} className="reply">
                        <strong>{r.author}:</strong> {r.text}
                      </div>
                    ))}
                    <div className="reply-input">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyInputs[discussion.id] || ""}
                        onChange={(e) =>
                          setReplyInputs({ ...replyInputs, [discussion.id]: e.target.value })
                        }
                      />
                      <button onClick={() => handleReply(discussion.id)}>Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERTS */}
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

                  <button className="ask-expert-btn" onClick={() => handleAskExpert(expert.name)}>
                    Ask Question
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMMUNITY STATS */}
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
      </div>
    </div>
  )
}

export default CommunityPlatform
