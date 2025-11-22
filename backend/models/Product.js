const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number
  },
  category: {
    type: String,
    required: true,
    enum: ['running', 'basketball', 'lifestyle', 'training', 'skateboarding', 'casual']
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  sizes: [{
    size: String,
    stock: Number
  }],
  colors: [{
    name: String,
    hex: String,
    images: [String]
  }],
  features: [String],
  gender: {
    type: String,
    enum: ['men', 'women', 'unisex', 'kids']
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isCustomizable: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewProduct: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  sku: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Index for search
productSchema.index({ name: 'text', brand: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
