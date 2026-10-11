// ============================================
// Student Model
// ============================================
// TODO: Implement Mongoose schema here
// ============================================

const mongoose = require('mongoose');

// Example schema structure (you will implement this):
/*
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      min: 1,
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Graduated'],
      default: 'Active',
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt
  }
);

module.exports = mongoose.model('Student', studentSchema);
*/

// Temporary empty export so the file is valid
module.exports = {};
