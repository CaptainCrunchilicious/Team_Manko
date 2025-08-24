import { useState } from 'react'
import { Camera, Upload, Scan, AlertTriangle, CheckCircle, Leaf } from 'lucide-react'

const SmartCropScanner = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setScanResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleScan = async () => {
    if (!selectedFile) return

    setIsScanning(true)
    setError(null)
    
    try {
      // Create FormData to send the image file
      const formData = new FormData()
      formData.append('image', selectedFile)

      // Call your existing /api/scan endpoint
      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Transform the API response to match your component's expected format
      const analysis = data.analysis
      
      const transformedResult = {
        disease: analysis.status === 'Healthy' ? 'Healthy Plant' : (analysis.disease || 'Unknown Disease'),
        confidence: 85, // You might want to add confidence to your Gemini prompt
        severity: analysis.severity || (analysis.status === 'Healthy' ? 'None' : 'Medium'),
        description: analysis.description || analysis.notes || 'Analysis completed',
        treatment: typeof analysis.treatment === 'string' ? 
          analysis.treatment.split('\n').filter(t => t.trim()) : 
          (Array.isArray(analysis.treatment) ? analysis.treatment : ['Follow recommended care practices']),
        prevention: typeof analysis.prevention === 'string' ? 
          analysis.prevention.split('\n').filter(p => p.trim()) : 
          (Array.isArray(analysis.prevention) ? analysis.prevention : ['Maintain good plant hygiene'])
      }

      setScanResult(transformedResult)
      
    } catch (error) {
      console.error('Scan error:', error)
      setError(`Failed to scan image: ${error.message}`)
    } finally {
      setIsScanning(false)
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-orange-500'
      default: return 'text-green-500'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return <AlertTriangle className="text-red-500" size={20} />
      case 'medium': return <AlertTriangle className="text-yellow-500" size={20} />
      case 'low': return <AlertTriangle className="text-orange-500" size={20} />
      default: return <CheckCircle className="text-green-500" size={20} />
    }
  }

  return (
    <div className="scanner-page">
      <div className="scanner-container">
        <div className="scanner-header">
          <Scan className="header-icon" />
          <div>
            <h1>Smart Crop Scanner</h1>
            <p>Upload a photo to detect plant diseases and get treatment recommendations</p>
          </div>
        </div>

        <div className="scanner-content">
          <div className="upload-section">
            <div className="upload-area">
              {selectedImage ? (
                <div className="image-preview">
                  <img src={selectedImage} alt="Selected crop" />
                  <button 
                    className="change-image-btn"
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <Camera size={48} />
                  <h3>Upload Crop Image</h3>
                  <p>Take a clear photo of your plant showing any problem areas</p>
                  <button 
                    className="upload-btn"
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    <Upload size={20} />
                    Choose Image
                  </button>
                </div>
              )}
              
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>

            {selectedImage && (
              <button 
                className="scan-btn"
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <div className="loading-spinner"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan size={20} />
                    Scan for Diseases
                  </>
                )}
              </button>
            )}

            {error && (
              <div className="error-message">
                <AlertTriangle size={20} />
                <p>{error}</p>
              </div>
            )}
          </div>

          {scanResult && (
            <div className="results-section">
              <div className="result-header">
                <h2>Scan Results</h2>
                <div className="confidence-badge">
                  {scanResult.confidence}% confidence
                </div>
              </div>

              <div className="result-card">
                <div className="result-title">
                  {getSeverityIcon(scanResult.severity)}
                  <h3>{scanResult.disease}</h3>
                  <span className={`severity ${getSeverityColor(scanResult.severity)}`}>
                    {scanResult.severity !== 'None' ? `${scanResult.severity} Severity` : 'Healthy'}
                  </span>
                </div>

                <p className="result-description">{scanResult.description}</p>

                <div className="treatment-section">
                  <h4>
                    <Leaf size={18} />
                    {scanResult.severity !== 'None' ? 'Treatment Plan' : 'Care Instructions'}
                  </h4>
                  <ul>
                    {scanResult.treatment.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="prevention-section">
                  <h4>
                    <CheckCircle size={18} />
                    Prevention Tips
                  </h4>
                  <ul>
                    {scanResult.prevention.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="scanner-tips">
          <h3>Tips for Better Results</h3>
          <div className="tips-grid">
            <div className="tip">
              <Camera size={24} />
              <p>Take clear, well-lit photos</p>
            </div>
            <div className="tip">
              <Leaf size={24} />
              <p>Focus on affected areas</p>
            </div>
            <div className="tip">
              <Scan size={24} />
              <p>Include multiple angles if possible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartCropScanner