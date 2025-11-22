import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, ArrowRight, Star, Heart, Eye } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { useUserTracking } from '../context/UserTrackingContext';
import './HomePage.css';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { updateCurrentPage } = useUserTracking();

  useEffect(() => {
    // Track page visit
    updateCurrentPage('/');
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateCurrentPage]);

  const features = [
    {
      icon: <Sparkles size={24} />,
      title: 'PREMIUM QUALITY',
      description: 'Authentic sneakers from top brands',
      color: 'emerald'
    },
    {
      icon: <Zap size={24} />,
      title: 'FAST SHIPPING',
      description: 'Express delivery worldwide',
      color: 'cyan'
    },
    {
      icon: <Shield size={24} />,
      title: 'SECURE PURCHASE',
      description: '100% secure transactions',
      color: 'purple'
    }
  ];

  return (
    <div className="home-page page">
      {/* Interactive Cursor */}
      <div 
        className="interactive-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="floating-elements">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="floating-shape shape-4"></div>
          </div>
          
          <div className="container">
            <div className="hero-content">
              <div className="premium-badge interactive-badge">
                <Star size={16} className="badge-icon" />
                <span>PREMIUM COLLECTION</span>
                <div className="badge-glow"></div>
              </div>
              
              <h1 className="hero-title">
                <span 
                  className="brand-name interactive-title"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  SOLESPHERE
                </span>
                <span className="tagline">WHERE STYLE MEETS EXCELLENCE</span>
              </h1>
              
              <p className="hero-description">
                Discover curated luxury footwear from the world's most iconic brands.
                <br />
                Each pair tells a story of craftsmanship, innovation, and timeless design.
              </p>

              <div className="cta-buttons">
                <Link to="/store" className="cta-primary">
                  <span>Explore Collection</span>
                  <ArrowRight size={20} />
                  <div className="button-glow"></div>
                </Link>
                <button className="cta-secondary">
                  <Heart size={20} />
                  <span>Add to Wishlist</span>
                </button>
              </div>
              
              <div className="features-row">
                {features.map((feature, index) => (
                  <div key={index} className={`feature-item feature-${feature.color}`}>
                    <div className="feature-icon">
                      {feature.icon}
                      <div className="icon-ripple"></div>
                    </div>
                    <div className="feature-text">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Premium Brands</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
    </div>
  );
}
