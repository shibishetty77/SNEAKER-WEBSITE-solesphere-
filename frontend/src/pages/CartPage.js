import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = (id, size, change) => {
    updateQuantity(id, size, change);
  };

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={80} />
            <h2>Your cart is empty</h2>
            <p>Add some sneakers to get started!</p>
            <Link to="/store" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items-section">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  
                  <div className="item-details">
                    <div className="item-header">
                      <div>
                        <p className="item-brand">{item.brand}</p>
                        <h3 className="item-name">{item.name}</h3>
                        {item.isCustom && <span className="custom-badge">Custom Design</span>}
                      </div>
                      <button className="remove-btn" onClick={() => handleRemoveItem(item.id, item.size)}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="item-specs">
                      <span>Size: {item.size}</span>
                      <span>•</span>
                      <span>Color: {item.color}</span>
                    </div>
                    
                    <div className="item-footer">
                      <div className="quantity-controls">
                        <button onClick={() => handleUpdateQuantity(item.id, item.size, -1)}>
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, item.size, 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="item-pricing">
                        <span className="item-price">₹{item.price.toLocaleString('en-IN')}</span>
                        {item.quantity > 1 && (
                          <span className="item-total">
                            Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/store" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="order-summary-sticky">
              <div className="order-summary card">
                <h2>Order Summary</h2>
                
                <div className="summary-row">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'free-shipping' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                
                {shipping > 0 && (
                  <div className="shipping-notice">
                    Add ₹{(5000 - subtotal).toLocaleString('en-IN')} more for FREE shipping!
                  </div>
                )}
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                
                <button className="btn btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
                
                <div className="payment-methods">
                  <p>We accept:</p>
                  <div className="payment-icons">
                    <span>💳 Card</span>
                    <span>📱 UPI</span>
                    <span>💰 COD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
