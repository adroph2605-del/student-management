const express = require('express');
const Fee = require('../models/Fee');
const Student = require('../models/Student');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/fees?studentId=
router.get('/', protect, async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.studentId) filter.student = req.query.studentId;
    if (req.user.role === 'student' && req.user.studentRef) {
      filter.student = req.user.studentRef;
    }

    const fees = await Fee.find(filter)
      .populate('student', 'name studentCode className feeBalance')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: fees });
  } catch (err) {
    next(err);
  }
});

// GET /api/fees/summary
router.get('/summary', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const fees = await Fee.find({});
    const totalInvoiced = fees.reduce((s, f) => s + f.amountInvoiced, 0);
    const collected = fees.reduce((s, f) => s + f.amountPaid, 0);
    const outstanding = fees.reduce((s, f) => s + f.balance, 0);

    res.json({
      success: true,
      data: {
        totalInvoiced,
        collected,
        outstanding,
        collectionRate: totalInvoiced
          ? Math.round((collected / totalInvoiced) * 1000) / 10
          : 0,
      },
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/fees
router.post('/', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const { student, term, description, amountInvoiced, dueDate } = req.body;
    if (!student || amountInvoiced === undefined) {
      return res.status(400).json({
        success: false,
        message: 'student and amountInvoiced required',
      });
    }

    const fee = await Fee.create({
      student,
      term,
      description,
      amountInvoiced,
      amountPaid: 0,
      balance: amountInvoiced,
      dueDate,
      status: 'Unpaid',
    });

    await Student.findByIdAndUpdate(student, {
      $inc: { feeBalance: amountInvoiced },
    });

    res.status(201).json({ success: true, data: fee });
  } catch (err) {
    next(err);
  }
});

// POST /api/fees/:id/pay
router.post('/:id/pay', protect, authorize('admin', 'faculty'), async (req, res, next) => {
  try {
    const { amount, method, reference, status } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount required' });
    }

    const fee = await Fee.findById(req.params.id);
    if (!fee) {
      return res.status(404).json({ success: false, message: 'Fee record not found' });
    }

    fee.payments.push({
      amount,
      method: method || 'M-Pesa',
      reference,
      status: status || 'Completed',
      recordedBy: req.user._id,
    });

    if ((status || 'Completed') === 'Completed') {
      fee.amountPaid += amount;
      await Student.findByIdAndUpdate(fee.student, {
        $inc: { feeBalance: -amount },
      });
    }

    await fee.save();
    res.json({ success: true, data: fee });
  } catch (err) {
    next(err);
  }
});

module.exports = router;