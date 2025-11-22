import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, IndianRupee, CheckCircle, ShoppingBag, X, Image as ImageIcon } from 'lucide-react';
import { useResell } from '../context/ResellContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './ResellPortalPage.css';

export default function ResellPortalPage() {
  const [activeTab, setActiveTab] = useState('browse');
  const navigate = useNavigate();
  const { listings, buyListing, getAvailableListings, addListing } = useResell();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const availableListings = getAvailableListings();
  
  // Form state for selling
  const [sellForm, setSellForm] = useState({
    title: '',
    size: '',
    condition: '',
    price: '',
    originalPrice: '',
    description: '',
    brand: '',
    category: ''
  });
  
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    
    // Validate file count
    if (uploadedImages.length + fileArray.length > 5) {
      alert('You can upload maximum 5 images');
      return;
    }
    
    // Validate each file
    const validFiles = fileArray.filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return false;
      }
      
      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB`);
        return false;
      }
      
      return true;
    });
    
    // Convert files to preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, {
          file,
          preview: reader.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleImageUpload(e.target.files);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files);
    }
  };
  
  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleSellFormSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to list your sneakers');
      navigate('/login');
      return;
    }
    
    // Validate form
    if (!sellForm.title || !sellForm.size || !sellForm.condition || !sellForm.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate images
    if (uploadedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    
    // Create new listing
    const newListing = {
      name: sellForm.title,
      brand: sellForm.brand || 'Nike',
      category: sellForm.category || 'sneakers',
      size: sellForm.size,
      condition: sellForm.condition,
      price: parseInt(sellForm.price),
      originalPrice: sellForm.originalPrice ? parseInt(sellForm.originalPrice) : parseInt(sellForm.price),
      description: sellForm.description,
      seller: user.name,
      sellerEmail: user.email,
      image: uploadedImages[0]?.preview || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      images: uploadedImages.map(img => img.preview),
      verified: false,
      isSold: false,
      listedAt: new Date().toISOString()
    };
    
    addListing(newListing);
    
    // Reset form
    setSellForm({
      title: '',
      size: '',
      condition: '',
      price: '',
      originalPrice: '',
      description: '',
      brand: '',
      category: ''
    });
    setUploadedImages([]);
    
    // Show success and switch to browse tab
    alert('Your sneaker listing has been submitted! It will appear after verification.');
    setActiveTab('browse');
  };

  const handleBuyListing = (listing) => {
    // Convert resell listing to cart item format
    const cartItem = {
      id: listing.id,
      name: listing.name,
      brand: listing.brand,
      price: listing.price,
      image: listing.image,
      category: 'resell',
      isResell: true, // Mark as resell item
    };
    
    // Add to cart with the listing size
    addToCart(cartItem, listing.size);
    
    // Don't mark as sold yet - only when checkout is completed
    
    // Show success message
    alert(`${listing.name} added to cart!`);
  };

  const oldResellListings = [
    {
      id: 1,
      title: 'Nike Air Jordan 1 Retro High OG',
      seller: 'SneakerHead123',
      condition: 'Like New',
      size: '10',
      price: 24999,
      originalPrice: 16999,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
      verified: true,
    },
    {
      id: 2,
      title: 'Adidas Yeezy Boost 350 V2',
      seller: 'KicksCollector',
      condition: 'New',
      size: '9.5',
      price: 27499,
      originalPrice: 18499,
      image: 'https://images.unsplash.com/photo-1580906853149-f82f7601d205?w=400&h=400&fit=crop',
      verified: true,
    },
    {
      id: 3,
      title: 'Nike SB Dunk Low Pro',
      seller: 'StreetStyle',
      condition: 'Good',
      size: '11',
      price: 15799,
      originalPrice: 10799,
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
      verified: false,
    },
    {
      id: 4,
      title: 'New Balance 550',
      seller: 'VintageKicks',
      condition: 'Like New',
      size: '10.5',
      price: 13299,
      originalPrice: 9999,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
      verified: true,
    },
  ];

  return (
    <div className="resell-portal-page page">
      <div className="container">
        <div className="resell-header">
          <h1>Resell Portal</h1>
          <p>Buy authenticated pre-owned sneakers or sell your collection</p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Listings
          </button>
          <button
            className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell Your Sneakers
          </button>
        </div>

        {/* Browse Listings Tab */}
        {activeTab === 'browse' && (
          <div className="browse-section">
            <div className="listings-toolbar">
              <div className="filters">
                <select className="filter-select">
                  <option>All Conditions</option>
                  <option>New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
                <select className="filter-select">
                  <option>All Sizes</option>
                  {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map(size => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
                <select className="filter-select">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Popularity</option>
                </select>
              </div>
            </div>

            <div className="listings-grid grid grid-4">
              {availableListings.map((listing) => (
                <div key={listing.id} className="listing-card card">
                  <div className="verified-badge">
                    <CheckCircle size={16} />
                    Verified
                  </div>
                  <div className="listing-image">
                    <img src={listing.image} alt={listing.name} />
                  </div>
                  <div className="listing-info">
                    <h3 className="listing-title">{listing.name}</h3>
                    <p className="seller-name">by {listing.seller}</p>
                    <div className="listing-meta">
                      <span className="condition">{listing.condition}</span>
                      <span className="size">Size {listing.size}</span>
                    </div>
                    <div className="listing-pricing">
                      <span className="resell-price">₹{listing.price.toLocaleString('en-IN')}</span>
                      <span className="retail-price">Retail: ₹{listing.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button 
                      className="btn btn-primary buy-btn"
                      onClick={() => handleBuyListing(listing)}
                      disabled={listing.soldOut}
                    >
                      <ShoppingBag size={18} />
                      {listing.soldOut ? 'SOLD OUT' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sell Your Sneakers Tab */}
        {activeTab === 'sell' && (
          <div className="sell-section">
            <div className="sell-form-container">
              <h2>List Your Sneakers</h2>
              <form className="sell-form" onSubmit={handleSellFormSubmit}>
                <div className="form-group">
                  <label>Sneaker Title *</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="e.g., Nike Air Jordan 1 Retro High" 
                    value={sellForm.title}
                    onChange={(e) => setSellForm({...sellForm, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Brand *</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="e.g., Nike, Adidas" 
                      value={sellForm.brand}
                      onChange={(e) => setSellForm({...sellForm, brand: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Category *</label>
                    <select 
                      className="input"
                      value={sellForm.category}
                      onChange={(e) => setSellForm({...sellForm, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="sneakers">Sneakers</option>
                      <option value="running">Running</option>
                      <option value="basketball">Basketball</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="training">Training</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Size *</label>
                    <select 
                      className="input"
                      value={sellForm.size}
                      onChange={(e) => setSellForm({...sellForm, size: e.target.value})}
                      required
                    >
                      <option value="">Select Size</option>
                      {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Condition *</label>
                    <select 
                      className="input"
                      value={sellForm.condition}
                      onChange={(e) => setSellForm({...sellForm, condition: e.target.value})}
                      required
                    >
                      <option value="">Select Condition</option>
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Your Price (₹) *</label>
                    <input 
                      type="number" 
                      className="input" 
                      placeholder="12999" 
                      value={sellForm.price}
                      onChange={(e) => setSellForm({...sellForm, price: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Original Retail Price (₹)</label>
                    <input 
                      type="number" 
                      className="input" 
                      placeholder="9999"
                      value={sellForm.originalPrice}
                      onChange={(e) => setSellForm({...sellForm, originalPrice: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea 
                    className="input" 
                    rows="4" 
                    placeholder="Describe the condition, any flaws, or special details..."
                    value={sellForm.description}
                    onChange={(e) => setSellForm({...sellForm, description: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Upload Photos (Max 5) * ({uploadedImages.length}/5)</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />
                  <div 
                    className={`upload-area ${isDragging ? 'dragging' : ''}`}
                    onClick={handleUploadAreaClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload size={48} />
                    <p>Drag and drop or click to upload</p>
                    <span className="upload-hint">Supported: JPG, PNG (Max 5MB each)</span>
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div className="uploaded-images-preview">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="image-preview-item">
                          <img src={image.preview} alt={`Upload ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                          >
                            <X size={16} />
                          </button>
                          <div className="image-name">{image.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <IndianRupee size={20} />
                  List for Sale
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
