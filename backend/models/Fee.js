const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    method: {
      type: String,
      enum: ['M-Pesa', 'Bank Transfer', 'Card', 'Cash', 'Other'],
      default: 'M-Pesa',
    },
    reference: { type: String, trim: true },
    status: {
      type: String,
      enum: ['Completed', 'Pending', 'Failed'],
      default: 'Completed',
    },
    paidAt: { type: Date, default: Date.now },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    term: { type: String, trim: true },
    description: { type: String, trim: true },
    amountInvoiced: { type: Number, required: true, min: 0 },
    amountPaid: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ['Unpaid', 'Partial', 'Paid', 'Overdue'],
      default: 'Unpaid',
    },
    payments: [paymentSchema],
  },
  { timestamps: true }
);

feeSchema.pre('save', function (next) {
  this.balance = Math.max(0, this.amountInvoiced - this.amountPaid);
  if (this.balance === 0) this.status = 'Paid';
  else if (this.amountPaid > 0) this.status = 'Partial';
  else this.status = 'Unpaid';
  next();
});

module.exports = mongoose.model('Fee', feeSchema);