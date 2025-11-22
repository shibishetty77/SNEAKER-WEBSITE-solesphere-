import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useUserTracking } from '../context/UserTrackingContext';
import { useReviews } from '../context/ReviewContext';
import './StorePage.css';

export default function StorePage() {
  const { products } = useProducts();
  const { getAverageRating, getReviewsByProduct } = useReviews();
  const { updateCurrentPage } = useUserTracking();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    price: 'all',
    gender: '',
  });

  // Get search query from URL params and track page
  useEffect(() => {
    updateCurrentPage('/store');
    
    const params = new URLSearchParams(location.search);
    const urlSearch = params.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [location, updateCurrentPage]);

  // Filter products based on search query and selected filters
  const filteredProducts = products.filter(product => {
    let matches = true;
    
    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(query);
      const brandMatch = product.brand.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      const descriptionMatch = product.description?.toLowerCase().includes(query) || false;
      matches = matches && (nameMatch || brandMatch || categoryMatch || descriptionMatch);
    }
    
    // Category filter
    if (filters.category !== '') {
      matches = matches && product.category === filters.category;
    }
    
    // Brand filter
    if (filters.brand !== '') {
      matches = matches && product.brand === filters.brand;
    }
    
    // Gender filter
    if (filters.gender !== '') {
      matches = matches && (product.gender === filters.gender || product.gender === 'unisex');
    }
    
    // Price filter
    if (filters.price !== 'all') {
      const priceRange = filters.price.split('-');
      if (priceRange.length === 2) {
        const minPrice = parseInt(priceRange[0]);
        const maxPrice = parseInt(priceRange[1]);
        matches = matches && product.price >= minPrice && product.price <= maxPrice;
      } else {
        matches = matches && product.price <= parseInt(priceRange[0]);
      }
    }
    
    return matches;
  });

  // Reset all filters and search
  const handleReset = () => {
    setSearchQuery('');
    setFilters({
      category: '',
      brand: '',
      price: 'all',
      gender: '',
    });
  };

  return (
    <div className="store-page page">
      <div className="container">
        <div className="store-header">
          <h1>Sneaker Store</h1>
          <p>Discover your perfect pair from our curated collection</p>
          {searchQuery && (
            <div className="active-search">
              <p>Searching for: <strong>"{searchQuery}"</strong></p>
              <button className="btn btn-secondary" onClick={() => setSearchQuery('')}>
                Clear Search
              </button>
            </div>
          )}
        </div>

        <div className="store-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>
                <Search size={20} />
                Filters
              </h3>
            </div>

            <div className="filter-group">
              <h4>Category</h4>
              <select
                className="filter-select"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                <option value="running">Running</option>
                <option value="basketball">Basketball</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="casual">Casual</option>
                <option value="training">Training</option>
                <option value="walking">Walking</option>
              </select>
            </div>

            <div className="filter-group">
              <h4>Brand</h4>
              <select
                className="filter-select"
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
              >
                <option value="">All Brands</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="New Balance">New Balance</option>
                <option value="Converse">Converse</option>
                <option value="Puma">Puma</option>
                <option value="Vans">Vans</option>
                <option value="Asics">Asics</option>
                <option value="Reebok">Reebok</option>
              </select>
            </div>

            <div className="filter-group">
              <h4>Gender</h4>
              <select
                className="filter-select"
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              >
                <option value="">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>
              <select
                className="filter-select"
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
              >
                <option value="all">All Prices</option>
                <option value="0-10000">Under ₹10,000</option>
                <option value="10000-15000">₹10,000 - ₹15,000</option>
                <option value="15000-20000">₹15,000 - ₹20,000</option>
                <option value="20000-99999">₹20,000+</option>
              </select>
            </div>

            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '20px' }}
              onClick={handleReset}
            >
              Reset Filters
            </button>
          </aside>

          {/* Products Section */}
          <div className="products-section">
            <div className="products-toolbar">
              <div className="results-count">
                <span>{filteredProducts.length} Products</span>
              </div>
              <div className="view-controls">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={20} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
              {filteredProducts.length === 0 ? (
                <div className="no-results">
                  <Search size={64} className="no-results-icon" />
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filters</p>
                  <button className="btn btn-primary" onClick={handleReset}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="product-card card"
                  >
                    {product.isNew && <span className="badge">New</span>}
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <p className="product-brand">{product.brand}</p>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                      {(() => {
                        const reviews = getReviewsByProduct(product.id);
                        const avgRating = reviews.length > 0 ? parseFloat(getAverageRating(product.id)) : product.rating;
                        return (
                          <>
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.round(avgRating) ? 'star filled' : 'star'}>
                                ★
                              </span>
                            ))}
                            <span>({avgRating.toFixed(1)})</span>
                          </>
                        );
                      })()}
                    </div>
                      <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                      <button className="btn btn-primary quick-add-btn">Quick Add</button>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
