const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    subject: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    grade: { type: String, trim: true },
    teacher: { type: String, trim: true },
    comment: { type: String, trim: true },
    term: { type: String, trim: true },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

gradeSchema.index({ student: 1, subject: 1, term: 1 });

module.exports = mongoose.model('Grade', gradeSchema);