import React, { useState } from 'react';
import { Save, Share2, RotateCcw, ShoppingCart } from 'lucide-react';
import './CustomizationPage.css';

const colorOptions = {
  upper: [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#1e3a8a' },
    { name: 'Red', hex: '#dc2626' },
    { name: 'Green', hex: '#16a34a' },
    { name: 'Purple', hex: '#9333ea' },
    { name: 'Gray', hex: '#6b7280' },
  ],
  sole: [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'Gum', hex: '#c19a6b' },
    { name: 'Ice Blue', hex: '#a0d2eb' },
    { name: 'Translucent', hex: '#f0f0f0' },
  ],
  swoosh: [
    { name: 'Orange', hex: '#FF6B00' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'Red', hex: '#dc2626' },
    { name: 'Blue', hex: '#3b82f6' },
  ],
  laces: [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'Red', hex: '#dc2626' },
    { name: 'Blue', hex: '#3b82f6' },
  ],
  accent: [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Red', hex: '#dc2626' },
    { name: 'Blue', hex: '#3b82f6' },
  ],
};

export default function CustomizationPage() {
  const [colors, setColors] = useState({
    upper: '#333333',
    sole: '#FFFFFF',
    swoosh: '#FF6B00',
    laces: '#FFFFFF',
    accent: '#222222',
  });

  const [activeSection, setActiveSection] = useState('upper');
  const [customizationName, setCustomizationName] = useState('My Custom Design');
  const [basePrice] = useState(12499);

  const handleColorChange = (section, color) => {
    setColors({ ...colors, [section]: color });
  };

  const handleReset = () => {
    setColors({
      upper: '#333333',
      sole: '#FFFFFF',
      swoosh: '#FF6B00',
      laces: '#FFFFFF',
      accent: '#222222',
    });
  };

  const handleSave = () => {
    const customization = {
      name: customizationName,
      colors,
      price: basePrice + 30, // Custom price
      timestamp: new Date().toISOString(),
    };
    console.log('Saving customization:', customization);
    alert('Customization saved! (Check console for details)');
  };

  const handleAddToCart = () => {
    const item = {
      name: customizationName,
      colors,
      price: basePrice + 30,
      type: 'custom',
    };
    console.log('Adding to cart:', item);
    alert('Added to cart! (Check console for details)');
  };

  return (
    <div className="customization-page page">
      <div className="container">
        <div className="customization-header">
          <h1>Customize Your Sneaker</h1>
          <p>Design your dream shoe with our 3D customization studio</p>
        </div>

        <div className="customization-layout">
          {/* Left Side - 3D Model */}
          <div className="model-section">
            <div className="model-container">
              <div className="shoe-preview-2d">
                <svg viewBox="0 0 500 300" className="shoe-svg">
                  {/* Sole */}
                  <ellipse cx="250" cy="250" rx="180" ry="40" fill={colors.sole} stroke="#000" strokeWidth="2" />
                  
                  {/* Upper body */}
                  <path
                    d="M 100 200 Q 100 150 150 130 L 300 130 Q 350 140 370 180 L 370 220 Q 360 240 320 245 L 130 245 Q 110 240 100 220 Z"
                    fill={colors.upper}
                    stroke="#000"
                    strokeWidth="2"
                  />
                  
                  {/* Toe cap */}
                  <path
                    d="M 300 130 Q 350 140 370 180 L 370 220 Q 365 235 340 240 L 340 190 Q 335 145 300 130 Z"
                    fill={colors.accent}
                    stroke="#000"
                    strokeWidth="2"
                  />
                  
                  {/* Swoosh/Logo */}
                  <path
                    d="M 150 170 Q 200 160 280 180"
                    stroke={colors.swoosh}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Laces */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <g key={i}>
                      <line
                        x1={170 + i * 25}
                        y1="140"
                        x2={180 + i * 25}
                        y2="155"
                        stroke={colors.laces}
                        strokeWidth="3"
                      />
                      <circle cx={170 + i * 25} cy="140" r="4" fill={colors.laces} />
                    </g>
                  ))}
                  
                  {/* Heel */}
                  <path
                    d="M 100 200 Q 100 170 110 160 L 130 160 L 130 220 Q 120 230 110 230 Q 100 220 100 200 Z"
                    fill={colors.accent}
                    stroke="#000"
                    strokeWidth="2"
                  />
                </svg>
                <p className="preview-hint">Live 2D Preview - Changes reflect instantly</p>
              </div>
            </div>
            
            <div className="model-info">
              <div className="price-display">
                <span className="price-label">Custom Price:</span>
                <span className="price">₹{(basePrice + 2500).toLocaleString('en-IN')}</span>
              </div>
              <p className="info-text">
                <span>Select colors to see live preview updates</span>
              </p>
            </div>
          </div>

          {/* Right Side - Customization Options */}
          <div className="options-section">
            <div className="options-header">
              <input
                type="text"
                className="input design-name-input"
                value={customizationName}
                onChange={(e) => setCustomizationName(e.target.value)}
                placeholder="Design Name"
              />
            </div>

            <div className="color-sections">
              {/* Section Tabs */}
              <div className="section-tabs">
                {Object.keys(colorOptions).map((section) => (
                  <button
                    key={section}
                    className={`section-tab ${activeSection === section ? 'active' : ''}`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>

              {/* Color Options */}
              <div className="color-options">
                <h3>Choose {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Color</h3>
                <div className="color-grid">
                  {colorOptions[activeSection].map((color) => (
                    <div
                      key={color.hex}
                      className={`color-option ${colors[activeSection] === color.hex ? 'selected' : ''}`}
                      onClick={() => handleColorChange(activeSection, color.hex)}
                      title={color.name}
                    >
                      <div
                        className="color-swatch"
                        style={{
                          backgroundColor: color.hex,
                          border: color.hex === '#FFFFFF' ? '2px solid #ddd' : 'none',
                        }}
                      />
                      <span className="color-name">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Color Picker */}
              <div className="custom-color-picker">
                <label>Or pick a custom color:</label>
                <input
                  type="color"
                  value={colors[activeSection]}
                  onChange={(e) => handleColorChange(activeSection, e.target.value)}
                  className="color-input"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={handleReset}>
                <RotateCcw size={20} />
                Reset
              </button>
              <button className="btn btn-secondary" onClick={handleSave}>
                <Save size={20} />
                Save Design
              </button>
              <button className="btn btn-secondary">
                <Share2 size={20} />
                Share
              </button>
            </div>

            <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              <span>₹{(basePrice + 2500).toLocaleString('en-IN')}</span>
            </button>

            {/* Color Summary */}
            <div className="color-summary">
              <h4>Your Design:</h4>
              <div className="summary-items">
                {Object.entries(colors).map(([part, color]) => (
                  <div key={part} className="summary-item">
                    <span className="part-name">{part}:</span>
                    <div className="summary-color">
                      <div
                        className="summary-swatch"
                        style={{ backgroundColor: color }}
                      />
                      <span className="color-code">{color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
