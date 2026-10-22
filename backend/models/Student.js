const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    relation: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    primary: { type: Boolean, default: false },
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    studentCode: { type: String, unique: true, sparse: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, sparse: true },
    phone: { type: String, trim: true },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: '',
    },
    age: { type: Number, min: 1 },
    dateOfBirth: { type: Date },
    className: { type: String, trim: true },
    yearGroup: { type: String, trim: true },
    course: { type: String, trim: true },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Graduated', 'Pending'],
      default: 'Active',
    },
    enrollmentDate: { type: Date, default: Date.now },
    feeBalance: { type: Number, default: 0 },
    attendancePercent: { type: Number, default: 100 },
    academicAverage: { type: Number, default: 0 },
    guardians: [guardianSchema],
    address: { type: String, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

studentSchema.index({ name: 'text', email: 'text', studentCode: 'text' });

module.exports = mongoose.model('Student', studentSchema);