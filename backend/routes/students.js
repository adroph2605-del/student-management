const express = require('express');
const Student = require('../models/Student');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/students
router.get('/', protect, async (req, res, next) => {
  try {
    const { search, status, yearGroup, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status && status !== 'All') filter.status = status;
    if (yearGroup && yearGroup !== 'All') filter.yearGroup = yearGroup;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { studentCode: new RegExp(search, 'i') },
      ];
    }
    if (req.user.role === 'student' && req.user.studentRef) {
      filter._id = req.user.studentRef;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Student.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Student.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1,
      data: items,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/students/:id
router.get('/:id', protect, async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    if (
      req.user.role === 'student' &&
      String(req.user.studentRef) !== String(student._id)
    ) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
});

// POST /api/students
router.post('/', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const body = { ...req.body, createdBy: req.user._id };
    if (body.class && !body.className) body.className = body.class;
    const student = await Student.create(body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
});

// PUT /api/students/:id
router.put('/:id', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.class && !body.className) body.className = body.class;
    const student = await Student.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/students/:id
router.delete('/:id', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;