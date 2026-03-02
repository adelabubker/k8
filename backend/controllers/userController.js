// controllers/userController.js — User management (FullAdmin only)
const User = require('../models/User');

// ─── @route   GET /api/users ─────────────────────────────────────────────────
// ─── @access  FullAdmin
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .select('-password -token')
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   GET /api/users/:id ─────────────────────────────────────────────
// ─── @access  FullAdmin
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -token');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// ─── @route   DELETE /api/users/:id ─────────────────────────────────────────
// ─── @access  FullAdmin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Prevent fullAdmin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account.' });
    }

    // Prevent deleting other fullAdmins
    if (user.role === 'fullAdmin') {
      return res.status(403).json({ success: false, message: 'Cannot delete a Full Admin account.' });
    }

    await user.deleteOne();

    res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// ─── @route   PUT /api/users/:id/role ────────────────────────────────────────
// ─── @access  FullAdmin
const changeRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!role || !['user', 'admin', 'fullAdmin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be user, admin, or fullAdmin.' });
    }

    const user = await User.findById(req.params.id).select('-password -token');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Prevent changing own role
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot change your own role.' });
    }

    user.role = role;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}.`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUser, deleteUser, changeRole };