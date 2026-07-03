const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    default: 'My Custom Design'
  },
  colors: {
    upper: String,
    sole: String,
    laces: String,
    accent: String,
    swoosh: String
  },
  text: {
    content: String,
    font: String,
    color: String,
    position: String
  },
  materials: {
    type: Map,
    of: String
  },
  preview: {
    type: String // URL to preview image
  },
  price: {
    type: Number,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for efficient queries
customizationSchema.index({ user: 1, createdAt: -1 });
customizationSchema.index({ isPublic: 1, createdAt: -1 });

module.exports = mongoose.model('Customization', customizationSchema);
