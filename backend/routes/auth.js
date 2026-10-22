const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const { protect } = require('../middleware/auth');

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const sendAuth = (user, res, status = 200) => {
  const token = signToken(user._id);
  res.status(status).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      orgName: user.orgName,
      studentId: user.studentId,
      studentRef: user.studentRef,
    },
  });
};

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { role, name, email, password, orgName, studentId, studentName } = req.body;

    if (!role || !['admin', 'faculty', 'student'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Valid role is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password min 6 characters' });
    }

    const userPayload = { role, password };

    if (role === 'admin') {
      if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
      userPayload.name = name || 'System Admin';
      userPayload.email = email;
    }

    if (role === 'faculty') {
      if (!orgName || !email) {
        return res.status(400).json({ success: false, message: 'Organisation name and email required' });
      }
      userPayload.name = orgName;
      userPayload.email = email;
      userPayload.orgName = orgName;
    }

    if (role === 'student') {
      if (!studentName || !studentId) {
        return res.status(400).json({ success: false, message: 'Student name and Student ID required' });
      }
      userPayload.name = studentName;
      userPayload.email = email || `${studentId.toLowerCase()}@student.edutrack.local`;
      userPayload.studentId = studentId;

      let student = await Student.findOne({ studentCode: studentId });
      if (!student) {
        student = await Student.create({
          studentCode: studentId,
          name: studentName,
          email: email || undefined,
          status: 'Active',
        });
      }
      userPayload.studentRef = student._id;
    }

    const exists = await User.findOne({ email: userPayload.email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create(userPayload);
    if (role === 'student' && user.studentRef) {
      await Student.findByIdAndUpdate(user.studentRef, { user: user._id });
    }

    sendAuth(user, res, 201);
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { role, email, password, studentId, orgEmail } = req.body;

    let query = {};
    if (role === 'student') {
      if (!studentId || !password) {
        return res.status(400).json({ success: false, message: 'Student ID and password required' });
      }
      query = { studentId, role: 'student' };
    } else if (role === 'faculty') {
      if (!orgEmail || !password) {
        return res.status(400).json({ success: false, message: 'Organisation email and password required' });
      }
      query = { email: orgEmail, role: 'faculty' };
    } else {
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
      }
      query = { email, role: role || 'admin' };
    }

    const user = await User.findOne(query).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is inactive' });
    }

    sendAuth(user, res);
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      orgName: req.user.orgName,
      studentId: req.user.studentId,
      studentRef: req.user.studentRef,
    },
  });
});

module.exports = router;