import mongoose, { Types } from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
}, {
  timestamps: true
});

const walletSchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'users',
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  transactions: [transactionSchema],
}, {
  timestamps: true
});

const walletModel = mongoose.model('wallets', walletSchema);
export default walletModel;
