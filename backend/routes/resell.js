const express = require('express');
const router = express.Router();
const Resell = require('../models/Resell');
const { authMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/resell
// @desc    Get all resell listings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      condition, 
      minPrice, 
      maxPrice, 
      size,
      page = 1,
      limit = 12
    } = req.query;

    let query = { status: 'active' };

    if (condition) query.condition = condition;
    if (size) query.size = size;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const listings = await Resell.find(query)
      .populate('product', 'name brand images')
      .populate('seller', 'name')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Resell.countDocuments(query);

    res.json({
      listings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/resell
// @desc    Create resell listing
// @access  Private
router.post('/', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const listingData = JSON.parse(req.body.data);
    
    if (req.files) {
      listingData.images = req.files.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        alt: `${listingData.title} - Image ${index + 1}`
      }));
    }

    const listing = new Resell({
      seller: req.user._id,
      ...listingData
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/resell/:id
// @desc    Get resell listing by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const listing = await Resell.findById(req.params.id)
      .populate('product', 'name brand images')
      .populate('seller', 'name email');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Increment views
    listing.views += 1;
    await listing.save();

    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/resell/:id
// @desc    Update resell listing
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Resell.findOne({
      _id: req.params.id,
      seller: req.user._id
    });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found or unauthorized' });
    }

    Object.assign(listing, req.body);
    await listing.save();

    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/resell/:id
// @desc    Delete resell listing
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Resell.findOneAndDelete({
      _id: req.params.id,
      seller: req.user._id
    });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found or unauthorized' });
    }

    res.json({ message: 'Listing deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
