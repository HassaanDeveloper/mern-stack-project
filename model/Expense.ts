import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
}

const ExpenseSchema: Schema<IExpense> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Expense title is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Food', 'Travel', 'Entertainment', 'Shopping', 'Bills', 'Other'],
      default: 'Other',
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite error in development
const Expense =
  (mongoose.models.Expense as mongoose.Model<IExpense>) ||
  mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;
