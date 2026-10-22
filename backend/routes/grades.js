const express = require('express');
const Grade = require('../models/Grade');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/grades?studentId=
router.get('/', protect, async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.studentId) filter.student = req.query.studentId;
    if (req.user.role === 'student' && req.user.studentRef) {
      filter.student = req.user.studentRef;
    }

    const grades = await Grade.find(filter)
      .populate('student', 'name studentCode className')
      .sort({ subject: 1 });

    res.json({ success: true, data: grades });
  } catch (err) {
    next(err);
  }
});

// POST /api/grades
router.post('/', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const { student, subject, score, grade, teacher, comment, term } = req.body;
    if (!student || !subject || score === undefined) {
      return res.status(400).json({ success: false, message: 'student, subject, score required' });
    }

    const letter =
      grade ||
      (score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F');

    const record = await Grade.create({
      student,
      subject,
      score,
      grade: letter,
      teacher,
      comment,
      term,
      recordedBy: req.user._id,
    });

    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

// PUT /api/grades/:id
router.put('/:id', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const record = await Grade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      return res.status(404).json({ success: false, message: 'Grade not found' });
    }
    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/grades/:id
router.delete('/:id', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const record = await Grade.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Grade not found' });
    }
    res.json({ success: true, message: 'Grade deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;