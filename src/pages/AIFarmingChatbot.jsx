import { useState } from 'react'
import { Send, Bot, User, Loader } from 'lucide-react'

// Component to format markdown-like text
const FormattedMessage = ({ content }) => {
  if (!content) return null;
  
  // Convert markdown-style formatting to HTML
  let formattedContent = content
    // Handle bold text **text** or ***text***
    .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Handle line breaks
    .replace(/\n/g, '<br />');

  return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
};

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

    try {
      // Fixed: Use the correct server URL (port 3001, not 5173)
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: 'farming_advisor',
          conversationHistory: messages.slice(-6) // Send last 6 messages for context
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response || 'Sorry, I encountered an error. Please try again.'
      }
      
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error:', error)
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I\'m having trouble connecting to the server. Make sure the server is running on port 3001.'
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
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
                <FormattedMessage content={message.content} />
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