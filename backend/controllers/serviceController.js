// controllers/serviceController.js — Services CRUD operations
const Service = require('../models/Service');

// ─── @route   GET /api/services ─────────────────────────────────────────────
// ─── @access  Public
const getAllServices = async (req, res, next) => {
  try {
    const { location, category, active, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (location) filter.location = location;
    if (category) filter.category = category;
    if (active !== undefined) filter.isActive = active === 'true';

    const skip = (page - 1) * limit;

    const total = await Service.countDocuments(filter);
    const services = await Service.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: services.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   GET /api/services/:id ─────────────────────────────────────────
// ─── @access  Public
const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).populate('createdBy', 'name email');

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// ─── @route   POST /api/services ────────────────────────────────────────────
// ─── @access  Admin + FullAdmin
const createService = async (req, res, next) => {
  try {
    const { title, description, category, location, icon } = req.body;

    const service = await Service.create({
      title,
      description,
      category: category || 'Workflow',
      location: location || 'services',
      icon: icon || 'zap',
      createdBy: req.user._id,
    });

    await service.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   PUT /api/services/:id ─────────────────────────────────────────
// ─── @access  Admin + FullAdmin
const updateService = async (req, res, next) => {
  try {
    const { title, description, category, location, icon, isActive } = req.body;

    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    // Update only provided fields
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (category !== undefined) service.category = category;
    if (location !== undefined) service.location = location;
    if (icon !== undefined) service.icon = icon;
    if (isActive !== undefined) service.isActive = isActive;

    await service.save();
    await service.populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @route   DELETE /api/services/:id ──────────────────────────────────────
// ─── @access  FullAdmin only
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    await service.deleteOne();

    res.status(200).json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllServices, getService, createService, updateService, deleteService };