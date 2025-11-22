const mongoose = require('mongoose');

const resellSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  images: [{
    url: String,
    alt: String
  }],
  size: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'like_new', 'good', 'fair', 'poor']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: Number,
  negotiable: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'pending', 'removed'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  shippingOptions: [{
    method: String,
    cost: Number,
    duration: String
  }],
  authenticity: {
    verified: Boolean,
    certificate: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resell', resellSchema);
