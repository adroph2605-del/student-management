const express = require('express');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Fee = require('../models/Fee');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/dashboard/stats  (faculty / admin)
router.get('/stats', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments({ status: 'Active' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAtt = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
    });
    const present = todayAtt.filter(
      (a) => a.status === 'Present' || a.status === 'Late'
    ).length;
    const attendanceToday =
      todayAtt.length > 0
        ? Math.round((present / todayAtt.length) * 1000) / 10
        : 0;

    const students = await Student.find(
      { status: 'Active' },
      'academicAverage feeBalance'
    );
    const academicAverage =
      students.length > 0
        ? Math.round(
            (students.reduce((s, x) => s + (x.academicAverage || 0), 0) /
              students.length) *
              10
          ) / 10
        : 0;
    const unpaidBalance = students.reduce((s, x) => s + (x.feeBalance || 0), 0);

    const fees = await Fee.find({});
    const totalInvoiced = fees.reduce((s, f) => s + f.amountInvoiced, 0);
    const collected = fees.reduce((s, f) => s + f.amountPaid, 0);
    const feeCollection = totalInvoiced
      ? Math.round((collected / totalInvoiced) * 1000) / 10
      : 0;

    res.json({
      success: true,
      data: {
        totalStudents,
        attendanceToday,
        academicAverage,
        feeCollection,
        unpaidBalance,
        studentsNeedingAttention: await Student.countDocuments({
          $or: [
            { feeBalance: { $gt: 100000 } },
            { attendancePercent: { $lt: 85 } },
          ],
        }),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/dashboard/admin
router.get('/admin', protect, authorize('admin'), async (req, res, next) => {
  try {
    const [activeUsers, totalStudents, fees] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Student.countDocuments(),
      Fee.find({}),
    ]);

    const collected = fees.reduce((s, f) => s + f.amountPaid, 0);

    res.json({
      success: true,
      data: {
        registeredUniversities: 1,
        totalCampuses: 1,
        activeUsers,
        totalStudents,
        systemRevenue: collected,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;