import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Users, TrendingUp, Plus, Edit, Trash2, LogOut, Activity, Eye, Clock, MapPin, ExternalLink, X, Monitor } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { useUserTracking } from '../../context/UserTrackingContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { products, deleteProduct, updateProduct } = useProducts();
  const { orders, updateOrderStatus, getRecentOrders } = useOrders();
  const { getActiveSessions, realtimeStats } = useUserTracking();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showStorePreview, setShowStorePreview] = useState(false);
  const [previewPage, setPreviewPage] = useState('/');
  const recentOrders = getRecentOrders(5);
  
  // Get logged-in admin info
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const adminName = adminUser.name || 'Admin';

  // Get real-time customer data
  const liveCustomers = getActiveSessions();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('adminUser');
      navigate('/admin/login');
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const stats = [
    { label: 'Total Products', value: products.length.toString(), icon: <Package size={32} />, color: '#667eea' },
    { label: 'Total Orders', value: orders.length.toString(), icon: <ShoppingBag size={32} />, color: '#10B981' },
    { label: 'Customers', value: '1,234', icon: <Users size={32} />, color: '#F59E0B' },
    { label: 'Revenue', value: '₹' + totalRevenue.toLocaleString('en-IN'), icon: <TrendingUp size={32} />, color: '#EF4444' },
  ];

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleEditProduct = (product) => {
    const newPrice = prompt(`Edit price for ${product.name}:`, product.price);
    if (newPrice && !isNaN(newPrice)) {
      updateProduct(product.id, { price: parseInt(newPrice) });
    }
  };

  const handleViewStore = () => {
    setShowStorePreview(true);
  };

  const handleClosePreview = () => {
    setShowStorePreview(false);
  };

  const handleOpenInNewTab = () => {
    window.open(previewPage, '_blank');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar" id="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Activity size={20} />
            Live Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <Users size={20} />
            Live Customers
          </button>
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} />
            Products
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} />
            Orders
          </button>
          <button className="nav-item" onClick={handleViewStore}>
            <Monitor size={20} />
            Store Preview
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h1>Admin Dashboard</h1>
            <p className="admin-welcome">Welcome back, <strong>{adminName}</strong>!</p>
          </div>
          <div className="header-actions">
            {/* Add any additional actions here */}
          </div>
        </header>

        {/* Real-time Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="content-section">
            <div className="section-header">
              <h2>🔴 Live Dashboard</h2>
              <div className="live-indicator">
                <div className="pulse-dot"></div>
                <span>Live Updates</span>
              </div>
            </div>

            {/* Real-time Stats */}
            <div className="realtime-stats-grid">
              <div className="realtime-stat-card">
                <div className="stat-icon" style={{ color: '#10B981' }}>
                  <Activity size={32} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Active Users</p>
                  <h3 className="stat-value">{realtimeStats.activeUsers}</h3>
                  <span className="stat-change">{realtimeStats.activeUsers > 0 ? 'Live now' : 'No active users'}</span>
                </div>
              </div>
              
              <div className="realtime-stat-card">
                <div className="stat-icon" style={{ color: '#667eea' }}>
                  <Eye size={32} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Page Views</p>
                  <h3 className="stat-value">{realtimeStats.pageViews}</h3>
                  <span className="stat-change">Total session views</span>
                </div>
              </div>
              
              <div className="realtime-stat-card">
                <div className="stat-icon" style={{ color: '#F59E0B' }}>
                  <ShoppingBag size={32} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Cart Additions</p>
                  <h3 className="stat-value">{realtimeStats.cartAdditions}</h3>
                  <span className="stat-change">Active session adds</span>
                </div>
              </div>
              
              <div className="realtime-stat-card">
                <div className="stat-icon" style={{ color: '#EF4444' }}>
                  <TrendingUp size={32} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Conversions</p>
                  <h3 className="stat-value">{realtimeStats.conversions}</h3>
                  <span className="stat-change">Completed purchases</span>
                </div>
              </div>
            </div>

            {/* Traditional Stats Cards */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
                  <div className="stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">{stat.label}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Customers Tab */}
        {activeTab === 'customers' && (
          <div className="content-section">
            <div className="section-header">
              <h2>👥 Live Customer Activity</h2>
              <div className="live-indicator">
                <div className="pulse-dot"></div>
                <span>{liveCustomers.length} Active Users</span>
              </div>
            </div>

            <div className="customers-grid">
              {liveCustomers.map((customer) => (
                <div key={customer.id} className={`customer-card ${customer.isActive ? 'active' : 'inactive'}`}>
                  <div className="customer-header">
                    <div className="customer-avatar">
                      {customer.userName.charAt(0)}
                    </div>
                    <div className="customer-info">
                      <h4>{customer.userName}</h4>
                      <div className="customer-meta">
                        <MapPin size={14} />
                        <span>{customer.location}</span>
                      </div>
                    </div>
                    <div className={`status-dot ${customer.isActive ? 'active' : 'inactive'}`}></div>
                  </div>
                  
                  <div className="customer-activity">
                    <div className="activity-item">
                      <Eye size={16} />
                      <span>Viewing: {customer.currentPage}</span>
                    </div>
                    <div className="activity-item">
                      <Package size={16} />
                      <span>Device: {customer.device}</span>
                    </div>
                    <div className="activity-item">
                      <Clock size={16} />
                      <span>Session: {customer.sessionDuration}min</span>
                    </div>
                    <div className="activity-item">
                      <Activity size={16} />
                      <span>Last activity: {new Date(customer.lastActivity).toLocaleTimeString()}</span>
                    </div>
                    <div className="activity-item">
                      <ShoppingBag size={16} />
                      <span>Cart adds: {customer.cartAdditions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Product Management</h2>
              <Link to="/admin/products/add" className="btn btn-primary">
                <Plus size={20} />
                Add New Product
              </Link>
            </div>

            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.name} className="product-thumb" />
                      </td>
                      <td className="product-name">{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td className="price">₹{product.price.toLocaleString('en-IN')}</td>
                      <td>
                        <span className={`stock-badge ${product.stock < 20 ? 'low' : ''}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-icon edit" 
                            title="Edit"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="btn-icon delete"
                            title="Delete"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
            </div>

            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td className="price">₹{order.amount.toLocaleString('en-IN')}</td>
                      <td>
                        <select 
                        className={`status-select ${order.status.toLowerCase()}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      </td>
                      <td>
                        <button className="btn btn-secondary btn-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Store Preview Modal */}
      {showStorePreview && (
        <div className="store-preview-modal">
          <div className="preview-overlay" onClick={handleClosePreview}></div>
          <div className="preview-container">
            <div className="preview-header">
              <div className="preview-title">
                <Monitor size={20} />
                <h3>Store Preview</h3>
              </div>
              <div className="preview-controls">
                <select 
                  value={previewPage} 
                  onChange={(e) => setPreviewPage(e.target.value)}
                  className="page-selector"
                >
                  <option value="/">Home Page</option>
                  <option value="/store">Store</option>
                  <option value="/resell">Resell Portal</option>
                  <option value="/login">Login Page</option>
                </select>
                <button className="preview-btn" onClick={handleOpenInNewTab} title="Open in new tab">
                  <ExternalLink size={16} />
                </button>
                <button className="preview-btn close-btn" onClick={handleClosePreview} title="Close preview">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="preview-content">
              <iframe
                src={`http://localhost:3000${previewPage}`}
                title="Store Preview"
                className="store-iframe"
                frameBorder="0"
              />
            </div>
            <div className="preview-footer">
              <span className="preview-url">http://localhost:3000{previewPage}</span>
              <div className="preview-actions">
                <button className="btn btn-secondary" onClick={handleClosePreview}>
                  Close Preview
                </button>
                <button className="btn btn-primary" onClick={handleOpenInNewTab}>
                  <ExternalLink size={16} />
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
