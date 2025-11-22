import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import './AddProduct.css';

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'running',
    price: '',
    originalPrice: '',
    description: '',
    stock: '',
    gender: 'unisex',
    sizes: [],
    features: [''],
  });

  const [images, setImages] = useState([]);

  const categories = ['Running', 'Basketball', 'Lifestyle', 'Training', 'Casual', 'Skateboarding'];
  const availableSizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Adding product:', formData, images);
    alert('Product added successfully! (This would call the API in production)');
    navigate('/admin/dashboard');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    if (formData.sizes.includes(size)) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter(s => s !== size)
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size]
      });
    }
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="add-product-page">
      <div className="container">
        <div className="page-header">
          <Link to="/admin/dashboard" className="back-btn">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1>Add New Product</h1>
        </div>

        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Air Max Vision Pro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Brand *</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., Nike"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    className="input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="12999"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Original Price (₹)</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="16999"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="50"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    className="input"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  className="input"
                  rows="5"
                  placeholder="Describe the product features, materials, and benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="form-section">
              <h3>Product Images</h3>
              <div className="image-upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="image-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload" className="upload-label">
                  <Upload size={48} />
                  <p>Click to upload images</p>
                  <span>PNG, JPG up to 5MB (Max 5 images)</span>
                </label>
              </div>

              {images.length > 0 && (
                <div className="image-preview-grid">
                  {images.map((img, index) => (
                    <div key={index} className="image-preview">
                      <img src={img} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <h3 style={{ marginTop: '32px' }}>Available Sizes</h3>
              <div className="sizes-grid">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`size-toggle ${formData.sizes.includes(size) ? 'selected' : ''}`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <h3 style={{ marginTop: '32px' }}>Product Features</h3>
              <div className="features-list">
                {formData.features.map((feature, index) => (
                  <div key={index} className="feature-input-group">
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g., Breathable mesh upper"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        className="btn-icon delete"
                        onClick={() => removeFeature(index)}
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={addFeature}>
                  <Plus size={18} />
                  Add Feature
                </button>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
