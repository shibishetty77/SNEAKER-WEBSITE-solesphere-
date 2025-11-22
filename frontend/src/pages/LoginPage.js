import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    // Clear form when switching modes
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!isLogin && !formData.name) {
      alert('Please enter your full name');
      return;
    }
    
    // TODO: Implement actual API call
    const userData = {
      id: Date.now(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      phone: formData.phone,
    };
    
    const token = 'dummy-jwt-token-' + Date.now();
    login(userData, token);
    
    alert(isLogin ? 'Login successful!' : 'Account created successfully!');
    navigate('/');
  };

  const handleGoogleLogin = () => {
    alert('Google login will be integrated with Firebase/OAuth');
  };

  const handleAppleLogin = () => {
    alert('Apple login will be integrated with Apple Sign In');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-side-image">
          <div className="image-content">
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop"
              alt="Sneakers"
            />
            <div className="image-overlay">
              <h2>Your Next Pair Awaits.</h2>
              <p>Step into the future of footwear.</p>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-header">
            <h1 className="brand-title">SoleSphere</h1>
            <p className="brand-subtitle">
              {isLogin ? 'Welcome back! Sign in to your account.' : 'Join SoleSphere and discover premium sneakers.'}
            </p>
            <div className="login-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span>Exclusive Access</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🚚</span>
                <span>Fast Shipping</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🔒</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>

          <div className="tab-switcher">
            <button 
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => switchMode(true)}
            >
              Log In
            </button>
            <button 
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => switchMode(false)}
            >
              Create Account
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            )}

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input password-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {isLogin && (
                <a href="#" className="forgot-password">Forgot password?</a>
              )}
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>
            )}

            <button type="submit" className="btn btn-primary login-btn">
              {isLogin ? 'Log In' : 'Create Account'}
            </button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login-buttons">
            <button className="social-btn google-btn" onClick={handleGoogleLogin}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button className="social-btn apple-btn" onClick={handleAppleLogin}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <div className="terms-text">
            <p>By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
