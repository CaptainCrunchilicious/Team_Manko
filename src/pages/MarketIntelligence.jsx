import { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, MapPin, Calendar, ShoppingCart } from 'lucide-react'

const MarketIntelligence = () => {
  const [selectedCrop, setSelectedCrop] = useState('tomatoes')
  const [selectedRegion, setSelectedRegion] = useState('midwest')

  const crops = [
    { id: 'tomatoes', name: 'Tomatoes', icon: '🍅' },
    { id: 'corn', name: 'Corn', icon: '🌽' },
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'soybeans', name: 'Soybeans', icon: '🫘' },
    { id: 'potatoes', name: 'Potatoes', icon: '🥔' },
    { id: 'apples', name: 'Apples', icon: '🍎' }
  ]

  const regions = [
    { id: 'midwest', name: 'Midwest' },
    { id: 'southeast', name: 'Southeast' },
    { id: 'southwest', name: 'Southwest' },
    { id: 'northeast', name: 'Northeast' },
    { id: 'west', name: 'West Coast' }
  ]

  const marketData = {
    tomatoes: {
      currentPrice: 2.45,
      change: 0.12,
      changePercent: 5.1,
      prediction: 'up',
      volume: '1,250 tons',
      demand: 'High',
      season: 'Peak Season'
    },
    corn: {
      currentPrice: 6.85,
      change: -0.23,
      changePercent: -3.2,
      prediction: 'down',
      volume: '15,400 tons',
      demand: 'Medium',
      season: 'Off Season'
    },
    wheat: {
      currentPrice: 8.12,
      change: 0.45,
      changePercent: 5.9,
      prediction: 'up',
      volume: '8,900 tons',
      demand: 'High',
      season: 'Harvest Season'
    }
  }

  const marketplaceListings = [
    {
      id: 1,
      seller: 'Green Valley Farms',
      crop: 'Organic Tomatoes',
      quantity: '500 lbs',
      price: '$2.80/lb',
      location: 'Iowa',
      rating: 4.8,
      distance: '25 miles'
    },
    {
      id: 2,
      seller: 'Sunrise Agriculture',
      crop: 'Fresh Corn',
      quantity: '2 tons',
      price: '$6.50/bushel',
      location: 'Illinois',
      rating: 4.6,
      distance: '45 miles'
    },
    {
      id: 3,
      seller: 'Heritage Grains Co.',
      crop: 'Winter Wheat',
      quantity: '10 tons',
      price: '$8.00/bushel',
      location: 'Nebraska',
      rating: 4.9,
      distance: '120 miles'
    }
  ]

  const currentData = marketData[selectedCrop] || marketData.tomatoes

  return (
    <div className="market-page">
      <div className="market-container">
        <div className="market-header">
          <TrendingUp className="header-icon" />
          <div>
            <h1>Market Intelligence</h1>
            <p>Real-time price predictions and marketplace access</p>
          </div>
        </div>

        <div className="market-filters">
          <div className="filter-group">
            <label>Select Crop:</label>
            <select 
              value={selectedCrop} 
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="filter-select"
            >
              {crops.map(crop => (
                <option key={crop.id} value={crop.id}>
                  {crop.icon} {crop.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Region:</label>
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select"
            >
              {regions.map(region => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="market-overview">
          <div className="price-card">
            <div className="price-header">
              <h3>Current Price</h3>
              <div className={`trend-indicator ${currentData.change >= 0 ? 'positive' : 'negative'}`}>
                {currentData.change >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                {currentData.changePercent >= 0 ? '+' : ''}{currentData.changePercent}%
              </div>
            </div>
            <div className="price-value">
              <DollarSign size={24} />
              {currentData.currentPrice}
              <span className="price-unit">/lb</span>
            </div>
            <div className="price-change">
              {currentData.change >= 0 ? '+' : ''}${currentData.change} from yesterday
            </div>
          </div>

          <div className="market-stats">
            <div className="stat-card">
              <h4>Trading Volume</h4>
              <p>{currentData.volume}</p>
            </div>
            <div className="stat-card">
              <h4>Market Demand</h4>
              <p className={`demand-${currentData.demand.toLowerCase()}`}>
                {currentData.demand}
              </p>
            </div>
            <div className="stat-card">
              <h4>Season Status</h4>
              <p>{currentData.season}</p>
            </div>
          </div>
        </div>

        <div className="prediction-section">
          <h2>Price Prediction</h2>
          <div className="prediction-card">
            <div className="prediction-chart">
              <div className="chart-placeholder">
                <div className="chart-line">
                  <div className="data-point current"></div>
                  <div className="data-point future"></div>
                  <div className="data-point future"></div>
                  <div className="data-point future"></div>
                </div>
              </div>
            </div>
            <div className="prediction-info">
              <h3>7-Day Forecast</h3>
              <div className={`prediction-trend ${currentData.prediction}`}>
                {currentData.prediction === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span>
                  {currentData.prediction === 'up' ? 'Upward' : 'Downward'} trend expected
                </span>
              </div>
              <p>
                Based on historical data, weather patterns, and market demand, 
                prices are expected to {currentData.prediction === 'up' ? 'increase' : 'decrease'} 
                by 3-8% over the next week.
              </p>
            </div>
          </div>
        </div>

        <div className="marketplace-section">
          <h2>Direct Marketplace</h2>
          <div className="marketplace-listings">
            {marketplaceListings.map(listing => (
              <div key={listing.id} className="listing-card">
                <div className="listing-header">
                  <h3>{listing.crop}</h3>
                  <div className="listing-price">{listing.price}</div>
                </div>
                <div className="listing-details">
                  <div className="detail">
                    <strong>Seller:</strong> {listing.seller}
                  </div>
                  <div className="detail">
                    <strong>Quantity:</strong> {listing.quantity}
                  </div>
                  <div className="detail">
                    <MapPin size={16} />
                    {listing.location} • {listing.distance}
                  </div>
                  <div className="detail">
                    <span className="rating">★ {listing.rating}</span>
                  </div>
                </div>
                <button className="contact-seller-btn">
                  <ShoppingCart size={16} />
                  Contact Seller
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="market-insights">
          <h2>Market Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <Calendar size={24} />
              <h3>Seasonal Trends</h3>
              <p>Peak harvest season typically sees 15-20% price drops due to increased supply.</p>
            </div>
            <div className="insight-card">
              <TrendingUp size={24} />
              <h3>Demand Forecast</h3>
              <p>Restaurant demand expected to increase by 12% next month based on booking trends.</p>
            </div>
            <div className="insight-card">
              <MapPin size={24} />
              <h3>Regional Analysis</h3>
              <p>Midwest prices are 8% below national average due to local oversupply.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketIntelligence