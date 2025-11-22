import React from 'react';
import './Logo.css';

export default function Logo({ size = 'medium', showText = true }) {
  const sizes = {
    small: { width: 32, fontSize: 16 },
    medium: { width: 40, fontSize: 20 },
    large: { width: 60, fontSize: 28 },
  };

  const { width, fontSize } = sizes[size] || sizes.medium;

  return (
    <div className="logo-container" style={{ gap: showText ? '12px' : '0' }}>
      <svg 
        className="logo-icon" 
        width={width} 
        height={width} 
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="1" />
            <stop offset="100%" stopColor="#764ba2" stopOpacity="1" />
          </linearGradient>
        </defs>
        
        {/* Circle background */}
        <circle cx="50" cy="50" r="48" fill="url(#logoGrad)"/>
        
        {/* Sneaker sole shape */}
        <path 
          d="M 30 40 Q 25 45 25 50 L 25 65 Q 25 70 30 70 L 70 70 Q 75 70 75 65 L 75 50 Q 75 45 70 40 Z" 
          fill="white" 
          opacity="0.9"
        />
        
        {/* Sneaker upper */}
        <path 
          d="M 35 35 Q 30 30 35 25 L 65 25 Q 70 30 65 35 L 60 40 L 40 40 Z" 
          fill="white" 
          opacity="0.95"
        />
        
        {/* Detail lines on sole */}
        <line x1="30" y1="55" x2="70" y2="55" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.6"/>
        <line x1="30" y1="62" x2="70" y2="62" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.6"/>
        
        {/* Letter S */}
        <text 
          x="50" 
          y="58" 
          fontFamily="Arial, sans-serif" 
          fontSize="28" 
          fontWeight="bold" 
          fill="url(#logoGrad)" 
          textAnchor="middle"
        >
          S
        </text>
      </svg>
      {showText && (
        <span className="logo-text" style={{ fontSize: `${fontSize}px` }}>
          SoleSphere
        </span>
      )}
    </div>
  );
}
