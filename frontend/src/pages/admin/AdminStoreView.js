import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Grid, List } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import './AdminStoreView.css';

export default function AdminStoreView() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  // Get unique brands and categories
  const brands = ['all', ...new Set(products.map(p => p.brand))];
  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="admin-store-view">
      {/* Header */}
      <div className="store-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <div className="header-content">
          <h1>Store Preview</h1>
          <p className="admin-badge">👤 Admin View - Read Only</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="store-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <Filter size={18} />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand === 'all' ? 'All Brands' : brand}
                </option>
              ))}
            </select>
          </div>

          <div className="view-toggle">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Count */}
      <div className="product-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products Grid/List */}
      <div className={`products-container ${viewMode}`}>
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found matching your criteria</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.isNew && <span className="new-badge">NEW</span>}
                {product.stock < 20 && <span className="low-stock-badge">Low Stock</span>}
              </div>
              <div className="product-info">
                <p className="product-brand">{product.brand}</p>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta">
                  <span className="category">{product.category}</span>
                  <span className="rating">★ {product.rating}</span>
                </div>
                <div className="product-footer">
                  <div className="price-section">
                    <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <span className={`stock-indicator ${product.stock < 20 ? 'low' : 'good'}`}>
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
