import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const cartCount = getCartCount();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/store?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <Logo size="medium" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/store" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Store</NavLink>
            <NavLink to="/resell" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Resell Portal</NavLink>
          </div>

          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearch}>
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search sneakers..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Right Actions */}
          <div className="nav-actions">
            {isAuthenticated ? (
              <div className="profile-dropdown">
                <button className="icon-btn profile-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                  <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                </button>
                {showProfileMenu && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <p className="user-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                      <User size={18} />
                      Profile
                    </Link>
                    <button className="dropdown-item logout" onClick={() => { logout(); setShowProfileMenu(false); navigate('/'); }}>
                      <LogIn size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="icon-btn login-btn">
                <LogIn size={22} />
              </Link>
            )}
            <Link to="/cart" className="icon-btn cart-btn">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <button 
              className="icon-btn mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/store" className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} onClick={() => setIsMenuOpen(false)}>
              Store
            </NavLink>
            <NavLink to="/resell" className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} onClick={() => setIsMenuOpen(false)}>
              Resell Portal
            </NavLink>
            {isAuthenticated ? (
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} onClick={() => setIsMenuOpen(false)}>
                Profile
              </NavLink>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} onClick={() => setIsMenuOpen(false)}>
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
