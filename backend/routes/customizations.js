const express = require('express');
const router = express.Router();
const Customization = require('../models/Customization');
const { authMiddleware } = require('../middleware/auth');

// @route   POST /api/customizations
// @desc    Create new customization
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const customization = new Customization({
      user: req.user._id,
      ...req.body
    });

    await customization.save();
    res.status(201).json(customization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/customizations
// @desc    Get user customizations
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const customizations = await Customization.find({ user: req.user._id })
      .populate('product', 'name images brand')
      .sort('-createdAt');
    
    res.json(customizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/customizations/public
// @desc    Get public customizations
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const customizations = await Customization.find({ isPublic: true })
      .populate('product', 'name images brand')
      .populate('user', 'name')
      .sort('-createdAt')
      .limit(20);
    
    res.json(customizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/customizations/:id
// @desc    Get customization by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const customization = await Customization.findById(req.params.id)
      .populate('product', 'name images brand price');

    if (!customization) {
      return res.status(404).json({ message: 'Customization not found' });
    }

    res.json(customization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/customizations/:id
// @desc    Update customization
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const customization = await Customization.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!customization) {
      return res.status(404).json({ message: 'Customization not found' });
    }

    Object.assign(customization, req.body);
    await customization.save();

    res.json(customization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/customizations/:id
// @desc    Delete customization
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const customization = await Customization.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!customization) {
      return res.status(404).json({ message: 'Customization not found' });
    }

    res.json({ message: 'Customization deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/customizations/:id/like
// @desc    Like/Unlike customization
// @access  Private
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const customization = await Customization.findById(req.params.id);

    if (!customization) {
      return res.status(404).json({ message: 'Customization not found' });
    }

    const likeIndex = customization.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      customization.likes.splice(likeIndex, 1);
    } else {
      customization.likes.push(req.user._id);
    }

    await customization.save();
    res.json({ likes: customization.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
