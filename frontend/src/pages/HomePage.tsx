import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, ArrowRight, Star, Heart, Eye } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { useUserTracking } from '../context/UserTrackingContext';
import './HomePage.css';

interface MousePosition {
  x: number;
  y: number;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const HomePage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { updateCurrentPage } = useUserTracking();

  useEffect(() => {
    // Track page visit
    updateCurrentPage('/');
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateCurrentPage]);

  const features: Feature[] = [
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
      description: 'Safe and encrypted transactions',
      color: 'purple'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Premium Brands' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="home-page">
      {/* Interactive Cursor */}
      <div 
        className="interactive-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          opacity: isHovered ? 1 : 0.7
        }}
      />

      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="premium-badge">
            <Star size={16} />
            <span>Premium Collection</span>
          </div>
          
          <h1 className="hero-title">
            Step Into The Future Of
            <span className="gradient-text"> Footwear</span>
          </h1>
          
          <p className="hero-description">
            Discover the world's most exclusive sneaker collection. From limited editions 
            to everyday essentials, find your perfect pair at SoleSphere.
          </p>

          <div className="cta-buttons">
            <Link 
              to="/store" 
              className="cta-primary"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>Explore Collection</span>
              <ArrowRight size={20} />
            </Link>
            
            <button 
              className="cta-secondary"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Heart size={20} />
              <span>Add to Wishlist</span>
            </button>
          </div>

          {/* Stats */}
          <div className="stats-section">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${feature.color}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />
    </div>
  );
};

export default HomePage;
