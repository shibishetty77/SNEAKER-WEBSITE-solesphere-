import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, Truck, Shield, RotateCw, Star, ThumbsUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useReviews } from '../context/ReviewContext';
import { useProducts } from '../context/ProductContext';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { orders } = useOrders();
  const { getProductById } = useProducts();
  const { addReview, getReviewsByProduct, getUserReviewForProduct, markHelpful, getAverageRating, getRatingDistribution } = useReviews();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Check if user has purchased this product
  const userPurchasedProduct = user && orders.some(order => 
    order.items?.some(item => parseInt(item.id) === parseInt(id))
  );

  // Get actual product data from context
  const productData = getProductById(id);

  // Get existing review from this user
  const userExistingReview = user && getUserReviewForProduct(id, user.email);

  // Get all reviews for this product
  const productReviews = getReviewsByProduct(id);
  const averageRating = getAverageRating(id);
  const ratingDistribution = getRatingDistribution(id);
  
  // Use review-based rating if available, otherwise use product's default rating
  const displayRating = productReviews.length > 0 ? parseFloat(averageRating) : (productData?.rating || 0);
  
  if (!productData) {
    return (
      <div className="product-detail-page page">
        <div className="container">
          <h2>Product not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/store')}>
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  // Create product object with all necessary fields
  const product = {
    ...productData,
    description: `Experience unparalleled comfort and style with the ${productData.name}. Featuring cutting-edge cushioning technology and a sleek design, these sneakers are perfect for both athletic performance and everyday wear.`,
    images: [
      productData.image,
      productData.image,
      productData.image,
      productData.image,
    ],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    colors: ['Black/White', 'Navy/Gold', 'Red/White'],
    features: [
      'Premium materials and construction',
      'Advanced cushioning technology',
      'Durable rubber outsole',
      'Padded collar for comfort',
      'Breathable design',
    ],
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      navigate('/login');
      return;
    }
    if (!userPurchasedProduct) {
      alert('You can only review products you have purchased');
      return;
    }
    if (userExistingReview) {
      alert('You have already reviewed this product');
      return;
    }

    addReview({
      productId: parseInt(id),
      productName: product.name,
      userName: user.name,
      userEmail: user.email,
      rating: reviewRating,
      review: reviewText,
    });

    setShowReviewForm(false);
    setReviewRating(5);
    setReviewText('');
    alert('Thank you for your review!');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
      color: 'Black/White',
    });
    alert('Added to cart!');
  };

  return (
    <div className="product-detail-page page">
      <div className="container">
        <div className="product-layout">
          {/* Left - Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="product-details">
            <div className="product-header">
              <div>
                <p className="brand-name">{product.brand}</p>
                <h1 className="product-title">{product.name}</h1>
                <div className="rating-section">
                  <div className="rating-stars">
                    {'★'.repeat(Math.floor(displayRating))}
                    {'☆'.repeat(5 - Math.floor(displayRating))}
                  </div>
                  <span className="rating-text">
                    {displayRating.toFixed(1)} ({productReviews.length} {productReviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
              <div className="quick-actions">
                <button className="icon-btn">
                  <Heart size={24} />
                </button>
                <button className="icon-btn">
                  <Share2 size={24} />
                </button>
              </div>
            </div>

            <div className="price-section">
              <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <span className="discount">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            {/* Size Selection */}
            <div className="size-section">
              <div className="section-header-inline">
                <h3>Select Size</h3>
                <a href="#" className="size-guide-link">Size Guide</a>
              </div>
              <div className="size-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-section">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="action-buttons">
              <button className="btn btn-primary add-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/cart')}>
                View Cart
              </button>
            </div>

            {/* Features */}
            <div className="features-section">
              <h3>Key Features</h3>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="benefits-section">
              <div className="benefit-item">
                <Truck size={24} />
                <div>
                  <h4>Free Shipping</h4>
                  <p>On orders over ₹5,000</p>
                </div>
              </div>
              <div className="benefit-item">
                <RotateCw size={24} />
                <div>
                  <h4>30-Day Returns</h4>
                  <p>Hassle-free returns</p>
                </div>
              </div>
              <div className="benefit-item">
                <Shield size={24} />
                <div>
                  <h4>Authenticity Guaranteed</h4>
                  <p>100% genuine products</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
              <div className="reviews-header">
                <h2>Customer Reviews</h2>
                {productReviews.length > 0 && (
                  <div className="rating-summary">
                    <div className="average-rating">
                      <span className="rating-number">{averageRating}</span>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            size={20} 
                            fill={star <= Math.round(averageRating) ? '#FFA500' : 'none'}
                            color="#FFA500"
                          />
                        ))}
                      </div>
                      <p>{productReviews.length} reviews</p>
                    </div>
                    <div className="rating-distribution">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="rating-bar">
                          <span>{rating} ★</span>
                          <div className="bar">
                            <div 
                              className="bar-fill" 
                              style={{ 
                                width: `${productReviews.length > 0 ? (ratingDistribution[rating] / productReviews.length) * 100 : 0}%` 
                              }}
                            />
                          </div>
                          <span>{ratingDistribution[rating]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Write Review Button/Form */}
              {user && userPurchasedProduct && !userExistingReview && (
                <div className="write-review-section">
                  {!showReviewForm ? (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowReviewForm(true)}
                    >
                      Write a Review
                    </button>
                  ) : (
                    <form className="review-form" onSubmit={handleSubmitReview}>
                      <h3>Write Your Review</h3>
                      <div className="form-group">
                        <label>Rating *</label>
                        <div className="star-rating-input">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={32}
                              fill={star <= reviewRating ? '#FFA500' : 'none'}
                              color="#FFA500"
                              onClick={() => setReviewRating(star)}
                              style={{ cursor: 'pointer' }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Your Review *</label>
                        <textarea
                          className="input"
                          rows="6"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your thoughts about this product..."
                          required
                        />
                      </div>
                      <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                          Submit Review
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setShowReviewForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Message for non-buyers */}
              {user && !userPurchasedProduct && (
                <div className="purchase-required">
                  <p>Purchase this product to leave a review</p>
                </div>
              )}

              {/* User's existing review */}
              {userExistingReview && (
                <div className="user-review-badge">
                  <p>✓ You have already reviewed this product</p>
                </div>
              )}

              {/* Reviews List */}
              <div className="reviews-list">
                {productReviews.length === 0 ? (
                  <div className="no-reviews">
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                ) : (
                  productReviews.map(review => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="avatar">{review.userName.charAt(0).toUpperCase()}</div>
                          <div>
                            <h4>{review.userName}</h4>
                            <div className="review-stars">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star 
                                  key={star} 
                                  size={16} 
                                  fill={star <= review.rating ? '#FFA500' : 'none'}
                                  color="#FFA500"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="review-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="review-text">{review.review}</p>
                      <div className="review-footer">
                        <button 
                          className="helpful-btn"
                          onClick={() => markHelpful(review.id)}
                        >
                          <ThumbsUp size={16} />
                          Helpful ({review.helpful})
                        </button>
                        <span className="verified-purchase">✓ Verified Purchase</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
