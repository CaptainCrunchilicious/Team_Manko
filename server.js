import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Try multiple ways to load .env
console.log('Loading environment from:', join(__dirname, '.env'))
dotenv.config({ path: join(__dirname, '.env') })

// Also try loading from current working directory
dotenv.config()

// Debug environment loading
console.log('Environment loading debug:')
console.log('- Current working directory:', process.cwd())
console.log('- Script directory:', __dirname)
console.log('- GEMINI_API_KEY loaded:', !!process.env.GEMINI_API_KEY)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// AI Farming Chatbot API endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context, conversationHistory = [] } = req.body

  console.log('Received request:', { message, context, historyLength: conversationHistory.length })

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  // Check if API key exists
  if (!process.env.GEMINI_API_KEY) {
    console.error('Gemini API Key is missing!')
    return res.status(500).json({ 
      error: 'Server configuration error',
      response: 'I apologize, but the service is not properly configured. Please contact the administrator.'
    })
  }

  try {
    // Build conversation context for Gemini
    let conversationContext = `You are an expert agricultural advisor with deep knowledge of farming practices, crop management, pest control, soil health, weather planning, and sustainable agriculture. 

Provide practical, actionable advice tailored to the user's specific questions. Format your responses clearly with:
- Use **bold** for important points
- Use bullet points for lists
- Keep responses well-organized and easy to read
- Be concise but comprehensive
- Always consider regional variations when relevant

`;
    
    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationContext += "Previous conversation:\n"
      conversationHistory.forEach(msg => {
        conversationContext += `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`
      })
      conversationContext += "\n"
    }
    
    conversationContext += `Current question: ${message}`

    console.log('Sending request to Gemini API...')

    // Updated Gemini API call with correct format
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: conversationContext
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        }
      })
    })

    console.log('Gemini API response status:', geminiResponse.status)

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API error response:', errorText)
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorText}`)
    }

    const geminiData = await geminiResponse.json()
    console.log('Gemini API response received')
    
    if (geminiData.error) {
      console.error('Gemini API returned error:', geminiData.error)
      throw new Error(geminiData.error.message)
    }

    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      console.error('No candidates in Gemini response')
      throw new Error('No response generated')
    }

    const response = geminiData.candidates[0].content.parts[0].text
    console.log('Successfully generated response')

    res.json({ response })

  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      error: 'Failed to get response',
      response: 'I apologize, but I\'m experiencing technical difficulties. Please try again later.'
    })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    hasApiKey: !!process.env.GEMINI_API_KEY
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log('Gemini API Key configured:', !!process.env.GEMINI_API_KEY)
})