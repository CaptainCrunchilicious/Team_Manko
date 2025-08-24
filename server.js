import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import multer from 'multer'
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('Loading environment from:', join(__dirname, '.env'))
dotenv.config({ path: join(__dirname, '.env') })
dotenv.config()

console.log('Environment loading debug:')
console.log('- Current working directory:', process.cwd())
console.log('- Script directory:', __dirname)
console.log('- GEMINI_API_KEY loaded:', !!process.env.GEMINI_API_KEY)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  const { message, context, conversationHistory = [] } = req.body

  console.log('Received request:', { message, context, historyLength: conversationHistory.length })

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('Gemini API Key is missing!')
    return res.status(500).json({
      error: 'Server configuration error',
      response:
        'I apologize, but the service is not properly configured. Please contact the administrator.',
    })
  }

  try {
    let conversationContext = `You are an expert agricultural advisor with deep knowledge of farming practices, crop management, pest control, soil health, weather planning, and sustainable agriculture. 

Provide practical, actionable advice tailored to the user's specific questions. Format your responses clearly with:
- Use **bold** for important points
- Use bullet points for lists
- Keep responses well-organized and easy to read
- Be concise but comprehensive
- Always consider regional variations when relevant

`

    if (conversationHistory.length > 0) {
      conversationContext += 'Previous conversation:\n'
      conversationHistory.forEach((msg) => {
        conversationContext += `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`
      })
      conversationContext += '\n'
    }

    conversationContext += `Current question: ${message}`

    console.log('Sending request to Gemini API...')

    const geminiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: conversationContext }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
          },
        }),
      }
    )

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
      response:
        "I apologize, but I'm experiencing technical difficulties. Please try again later.",
    })
  }
})

const upload = multer({ dest: 'uploads/' })

app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Missing Gemini API Key' })
    }

    const imageBuffer = fs.readFileSync(req.file.path)
    const base64Image = imageBuffer.toString('base64')

    const prompt = `
      You are an expert plant pathologist.
      Analyze the uploaded plant photo and return ONLY a valid JSON object with this exact structure:
      {
        "status": "Healthy" or "Diseased",
        "disease": "specific disease name or 'Healthy Plant'",
        "severity": "High", "Medium", "Low", or "None",
        "description": "detailed description of findings",
        "treatment": ["step 1", "step 2", "step 3"],
        "prevention": ["tip 1", "tip 2", "tip 3"],
        "confidence": 85
      }

      Ensure valid JSON format. No additional text outside the JSON object.
      If the plant appears healthy, use "Healthy Plant" for disease and "None" for severity.
      Always provide at least 2-3 items in treatment and prevention arrays.
    `

    const geminiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: req.file.mimetype,
                    data: base64Image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1000,
          },
        }),
      }
    )

    // Clean up uploaded file
    fs.unlinkSync(req.file.path)

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text()
      console.error('Gemini error:', errText)
      return res.status(500).json({ error: 'Gemini API failed', details: errText })
    }

    const geminiData = await geminiResponse.json()
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '{}'

    console.log('Raw Gemini response:', rawText)

    let analysis
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[0] : rawText
      analysis = JSON.parse(jsonString)
      
      if (!analysis.status) analysis.status = 'Unknown'
      if (!analysis.disease) analysis.disease = 'Analysis incomplete'
      if (!analysis.severity) analysis.severity = 'Medium'
      if (!analysis.description) analysis.description = 'Unable to analyze image'
      if (!Array.isArray(analysis.treatment)) analysis.treatment = ['Consult with local agricultural expert']
      if (!Array.isArray(analysis.prevention)) analysis.prevention = ['Follow good agricultural practices']
      if (!analysis.confidence) analysis.confidence = 75
      
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      analysis = {
        status: 'Unknown',
        disease: 'Analysis Error',
        severity: 'Medium',
        description: 'Unable to parse analysis results. Raw response: ' + rawText.substring(0, 200),
        treatment: ['Please try uploading a clearer image'],
        prevention: ['Ensure image is well-lit and focused on the plant'],
        confidence: 50
      }
    }

    res.json({ analysis })
  } catch (error) {
    console.error('Server error during scan:', error)
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }
    
    res.status(500).json({ 
      error: 'Server error during scan',
      analysis: {
        status: 'Error',
        disease: 'Server Error',
        severity: 'High',
        description: 'An error occurred while processing your image. Please try again.',
        treatment: ['Try uploading the image again', 'Ensure image is in JPG or PNG format'],
        prevention: ['Check your internet connection', 'Use a clear, focused image'],
        confidence: 0
      }
    })
  }
})

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    hasApiKey: !!process.env.GEMINI_API_KEY,
  })
})

// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log('Gemini API Key configured:', !!process.env.GEMINI_API_KEY)
})