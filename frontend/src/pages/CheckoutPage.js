import React, { useState } from 'react';
import { CreditCard, Truck, Shield, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useResell } from '../context/ResellContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const { buyListing } = useResell();
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const subtotal = getCartTotal();
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + gst + shipping;

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order = createOrder({
      customer: shippingInfo.fullName,
      product: cartItems.map(item => item.name).join(', '),
      amount: total,
      items: cartItems,
      shippingInfo,
      paymentMethod,
    });

    // Mark resell items as sold after successful order
    cartItems.forEach(item => {
      if (item.isResell) {
        buyListing(item.id);
      }
    });

    clearCart();
    alert(`Order placed successfully! Order ID: ${order.id}`);
    navigate('/');
  };

  return (
    <div className="checkout-page page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order</p>
        </div>

        <div className="checkout-layout">
          {/* Left - Forms */}
          <div className="checkout-forms">
            {/* Shipping Information */}
            <div className="checkout-section card">
              <div className="section-header">
                <Truck size={24} />
                <h2>Shipping Information</h2>
              </div>
              <form className="checkout-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="Raj Kumar"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Complete Address *</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="Flat/House No., Building, Street, Area"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="Mumbai"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <select 
                      className="input"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      required
                    >
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>PIN Code *</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="400001"
                      maxLength="6"
                      value={shippingInfo.pincode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      className="input" 
                      placeholder="+91 98765 43210"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Information */}
            <div className="checkout-section card">
              <div className="section-header">
                <CreditCard size={24} />
                <h2>Payment Method</h2>
              </div>
              
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <Smartphone size={20} />
                    <span>UPI (Google Pay, PhonePe, Paytm)</span>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <CreditCard size={20} />
                    <span>Credit/Debit Card</span>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <Shield size={20} />
                    <span>Net Banking</span>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <Truck size={20} />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'credit_card' && (
                <form className="checkout-form" style={{ marginTop: '24px' }}>
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input type="text" className="input" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input type="text" className="input" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input type="text" className="input" placeholder="123" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input type="text" className="input" placeholder="John Doe" />
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="order-summary-section">
            <div className="order-summary card">
              <h2>Order Summary</h2>
              
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.brand}</p>
                      <p className="item-specs">Size: {item.size} {item.color && `| Color: ${item.color}`}</p>
                    </div>
                    <div className="item-price">
                      <span>₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="quantity">Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>₹{shipping.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
                Place Order - ₹{total.toLocaleString('en-IN')}
              </button>

              <div className="security-badges">
                <div className="security-item">
                  <Shield size={20} />
                  <span>Secure Payment</span>
                </div>
                <div className="security-item">
                  <Shield size={20} />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
