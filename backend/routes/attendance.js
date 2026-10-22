const express = require('express');
const Attendance = require('../models/Attendance');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/attendance?date=&studentId=
router.get('/', protect, async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.date) {
      const d = new Date(req.query.date);
      const nextDay = new Date(d);
      nextDay.setDate(nextDay.getDate() + 1);
      filter.date = { $gte: d, $lt: nextDay };
    }
    if (req.query.studentId) filter.student = req.query.studentId;
    if (req.user.role === 'student' && req.user.studentRef) {
      filter.student = req.user.studentRef;
    }

    const records = await Attendance.find(filter)
      .populate('student', 'name studentCode className')
      .sort({ date: -1 });

    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
});

// POST /api/attendance
router.post('/', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const { student, date, status, className, notes } = req.body;
    if (!student || !date || !status) {
      return res.status(400).json({ success: false, message: 'student, date, status required' });
    }

    const record = await Attendance.findOneAndUpdate(
      { student, date: new Date(date) },
      { status, className, notes, markedBy: req.user._id },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

// POST /api/attendance/bulk
router.post('/bulk', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const { date, records } = req.body;
    if (!date || !Array.isArray(records)) {
      return res.status(400).json({ success: false, message: 'date and records[] required' });
    }

    const ops = records.map((r) => ({
      updateOne: {
        filter: { student: r.student, date: new Date(date) },
        update: {
          $set: {
            status: r.status,
            className: r.className,
            markedBy: req.user._id,
          },
        },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(ops);
    res.status(201).json({ success: true, message: `${records.length} attendance records saved` });
  } catch (err) {
    next(err);
  }
});

// GET /api/attendance/student/:studentId/summary
router.get('/student/:studentId/summary', protect, async (req, res, next) => {
  try {
    if (
      req.user.role === 'student' &&
      String(req.user.studentRef) !== String(req.params.studentId)
    ) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const records = await Attendance.find({ student: req.params.studentId })
      .sort({ date: -1 })
      .limit(30);
    const total = records.length || 1;
    const present = records.filter((r) => r.status === 'Present' || r.status === 'Late').length;

    res.json({
      success: true,
      percent: Math.round((present / total) * 1000) / 10,
      data: records,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;