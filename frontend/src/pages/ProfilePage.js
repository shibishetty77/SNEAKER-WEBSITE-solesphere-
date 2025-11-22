import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Package, Heart, LogOut, Edit, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page page">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar card">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>

            <nav className="profile-nav">
              <button 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={20} />
                Profile
              </button>
              <button 
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={20} />
                Orders
              </button>
              <button 
                className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={20} />
                Wishlist
              </button>
              <button className="nav-item logout" onClick={handleLogout}>
                <LogOut size={20} />
                Logout
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="profile-content">
            {activeTab === 'profile' && (
              <>
                <div className="profile-header card">
                  <h1>My Profile</h1>
                  <button className="btn btn-secondary" onClick={() => setIsEditing(!isEditing)}>
                    <Edit size={18} />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="profile-details card">
              {isEditing ? (
                <form onSubmit={handleSave} className="edit-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      className="input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="input"
                      rows="3"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              ) : (
                <div className="info-grid">
                  <div className="info-item">
                    <User size={20} />
                    <div>
                      <span className="label">Full Name</span>
                      <p>{user.name}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <Mail size={20} />
                    <div>
                      <span className="label">Email</span>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <Phone size={20} />
                    <div>
                      <span className="label">Phone</span>
                      <p>{user.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <MapPin size={20} />
                    <div>
                      <span className="label">Address</span>
                      <p>{user.address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <>
                <div className="profile-header card">
                  <h1>My Orders</h1>
                  <p>{orders.length} total orders</p>
                </div>

                <div className="orders-list">
                  {orders.length === 0 ? (
                    <div className="empty-state card">
                      <Package size={48} />
                      <h3>No orders yet</h3>
                      <p>Start shopping to see your orders here</p>
                      <button className="btn btn-primary" onClick={() => navigate('/store')}>
                        Browse Products
                      </button>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="order-card card">
                        <div className="order-header">
                          <div>
                            <h3>Order #{order.id}</h3>
                            <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`order-status status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-items">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="order-item">
                              <img src={item.image} alt={item.name} />
                              <div>
                                <p className="item-name">{item.name}</p>
                                <p className="item-details">Size: {item.size} × {item.quantity}</p>
                              </div>
                              <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
                            </div>
                          ))}
                        </div>
                        <div className="order-footer">
                          <div className="order-info">
                            <p><strong>Payment:</strong> {order.paymentMethod?.toUpperCase()}</p>
                            <p><strong>Delivery:</strong> {order.shippingInfo?.address || 'Standard'}</p>
                          </div>
                          <div className="order-total">
                            <strong>Total: ₹{order.amount.toLocaleString('en-IN')}</strong>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === 'wishlist' && (
              <>
                <div className="profile-header card">
                  <h1>My Wishlist</h1>
                  <p>{wishlistItems.length} saved items</p>
                </div>

                <div className="wishlist-grid">
                  {wishlistItems.length === 0 ? (
                    <div className="empty-state card">
                      <Heart size={48} />
                      <h3>Your wishlist is empty</h3>
                      <p>Save your favorite products to buy them later</p>
                      <button className="btn btn-primary" onClick={() => navigate('/store')}>
                        Browse Products
                      </button>
                    </div>
                  ) : (
                    wishlistItems.map((item) => (
                      <div key={item.id} className="wishlist-card card">
                        <img src={item.image} alt={item.name} />
                        <div className="wishlist-info">
                          <h3>{item.name}</h3>
                          <p className="brand">{item.brand}</p>
                          <p className="price">₹{item.price.toLocaleString('en-IN')}</p>
                          <div className="wishlist-actions">
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                addToCart(item, '9'); // Default size
                                removeFromWishlist(item.id);
                              }}
                            >
                              <ShoppingBag size={16} />
                              Add to Cart
                            </button>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
