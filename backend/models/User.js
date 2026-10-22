const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // haitoki kwa default kwenye queries
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      required: true,
    },
    // Faculty
    orgName: {
      type: String,
      trim: true,
    },
    // Student login
    studentId: {
      type: String,
      trim: true,
    },
    studentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password kabla ya save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Linganisha password wakati wa login
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);