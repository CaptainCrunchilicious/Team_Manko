import { useState } from 'react'
import { Camera, Upload, Scan, AlertTriangle, CheckCircle, Leaf } from 'lucide-react'

const SmartCropScanner = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setScanResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleScan = async () => {
    if (!selectedImage) return

    setIsScanning(true)
    
    // Simulate Plant.id API call
    setTimeout(() => {
      const mockResults = [
        {
          disease: 'Tomato Late Blight',
          confidence: 92,
          severity: 'High',
          description: 'A serious fungal disease that affects tomato plants, causing dark spots on leaves and stems.',
          treatment: [
            'Remove affected leaves immediately',
            'Apply copper-based fungicide',
            'Improve air circulation around plants',
            'Avoid overhead watering'
          ],
          prevention: [
            'Plant resistant varieties',
            'Ensure proper spacing between plants',
            'Water at soil level, not on leaves',
            'Apply preventive fungicide sprays'
          ]
        },
        {
          disease: 'Healthy Plant',
          confidence: 85,
          severity: 'None',
          description: 'Your plant appears to be healthy with no visible signs of disease.',
          treatment: ['Continue current care routine'],
          prevention: ['Maintain regular watering and fertilization schedule']
        }
      ]

      // Randomly select a result for demo
      const result = mockResults[Math.floor(Math.random() * mockResults.length)]
      setScanResult(result)
      setIsScanning(false)
    }, 2000)
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