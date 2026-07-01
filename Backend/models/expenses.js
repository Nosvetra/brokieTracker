import mongoose from "mongoose";

const splitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    percentage: { type: Number, default: null },
    settled: { type: Boolean, default: false },
  },
  { _id: false },
);

const expenseSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    splitType: {
      type: String,
      enum: ["equal", "exact", "percentage"],
      required: true,
    },
    category: {
      type: String,
      enum: ["food", "travel", "stay", "entertainment", "other"],
      default: "other",
    },
    date: { type: Date, default: Date.now },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    splits: [splitSchema],
  },
  { timestamps: true },
);

expenseSchema.index({ groupId: 1, createdAt: -1 });
expenseSchema.index({ "splits.userId": 1 });

export default mongoose.model("Expense", expenseSchema);
