import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle } from 'lucide-react';
import './AdminLogin.css';

// Fixed admin credentials - Only 3 authorized admins
const AUTHORIZED_ADMINS = {
  'sanjan@solesphere.com': {
    password: 'sanjan@2025',
    name: 'Sanjan'
  },
  'shibi@solesphere.com': {
    password: 'shibi@2025',
    name: 'Shibi'
  },
  'samarth@solesphere.com': {
    password: 'samarth@2025',
    name: 'Samarth'
  }
};

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const username = formData.username.toLowerCase().trim();
    
    // Auto-append @solesphere.com if not present
    const fullUsername = username.includes('@') ? username : `${username}@solesphere.com`;
    const password = formData.password;
    
    // Check if username exists in authorized admins
    if (!AUTHORIZED_ADMINS[fullUsername]) {
      setError('Access denied. You are not an authorized admin.');
      return;
    }
    
    // Verify password
    if (AUTHORIZED_ADMINS[fullUsername].password !== password) {
      setError('Incorrect password. Please try again.');
      return;
    }
    
    // Successful authentication
    const adminData = {
      username: fullUsername,
      name: AUTHORIZED_ADMINS[fullUsername].name,
      isAdmin: true,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('adminToken', `admin-token-${username}-${Date.now()}`);
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('adminUser', JSON.stringify(adminData));
    
    // Success message
    alert(`Welcome back, ${AUTHORIZED_ADMINS[fullUsername].name}!`);
    navigate('/admin/dashboard');
  };


  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Admin Login</h1>
            <p>Authorized Personnel Only</p>
            {error && (
              <div className="error-message">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Admin Email</label>
              <div className="input-with-icon">
                <User size={20} />
                <input
                  type="text"
                  className="input"
                  placeholder="username@solesphere.com"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={20} />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary login-btn">
              Sign In
            </button>
          </form>


          <div className="signup-link">
            <p className="security-note">🔒 Only authorized administrators can access this panel</p>
          </div>
        </div>

        <div className="login-info">
          <div className="info-card">
            <h3>🔐 Secure Access</h3>
            <p>Admin panel is protected with enterprise-grade security</p>
          </div>
          <div className="info-card">
            <h3>📊 Dashboard</h3>
            <p>Manage products, orders, and view analytics</p>
          </div>
          <div className="info-card">
            <h3>⚡ Quick Actions</h3>
            <p>Add products, update prices, and manage inventory</p>
          </div>
        </div>
      </div>
    </div>
  );
}
