import { useState } from 'react'
import { Send, Bot, User, Loader } from 'lucide-react'

const AIFarmingChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI farming advisor. How can I help you today? You can ask me about crop management, pest control, soil health, weather planning, and more!'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sampleQuestions = [
    'What\'s the best time to plant tomatoes?',
    'How do I deal with aphids on my crops?',
    'What are signs of nitrogen deficiency?',
    'How often should I water my vegetables?'
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response (replace with actual OpenAI API call)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateResponse(inputMessage)
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateResponse = (question) => {
    // Mock responses - replace with actual OpenAI integration
    const responses = {
      'tomato': 'For tomatoes, the best planting time is 2-3 weeks after the last frost date in your area. Soil temperature should be at least 60°F (16°C). Start seeds indoors 6-8 weeks before transplanting outdoors.',
      'aphid': 'To control aphids: 1) Use insecticidal soap spray, 2) Introduce beneficial insects like ladybugs, 3) Plant companion plants like marigolds, 4) Use neem oil as organic treatment.',
      'nitrogen': 'Signs of nitrogen deficiency include: yellowing of older leaves first, stunted growth, pale green coloration, and reduced fruit/flower production. Apply nitrogen-rich fertilizer or compost.',
      'water': 'Most vegetables need 1-1.5 inches of water per week. Water deeply but less frequently to encourage deep root growth. Check soil moisture 2 inches deep before watering.'
    }

    for (const [key, response] of Object.entries(responses)) {
      if (question.toLowerCase().includes(key)) {
        return response
      }
    }

    return 'That\'s a great question! Based on agricultural best practices, I recommend consulting with local extension services for region-specific advice. In general, consider factors like your local climate, soil conditions, and crop variety when making farming decisions.'
  }

  const handleSampleQuestion = (question) => {
    setInputMessage(question)
  }

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <Bot className="header-icon" />
          <div>
            <h1>AI Farming Advisor</h1>
            <p>Get expert agricultural advice powered by AI</p>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content">
                <Loader className="loading-spinner" size={16} />
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="sample-questions">
          <h3>Try asking:</h3>
          <div className="sample-grid">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                className="sample-question"
                onClick={() => handleSampleQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about farming..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIFarmingChatbot