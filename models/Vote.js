import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: false,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: false,
  },
  value: { type: Number, enum: [1, -1], required: true },
  createdAt: { type: Date, default: Date.now },
});

// Custom validation to ensure at least one of answer/question is present
VoteSchema.pre("validate", function (next) {
  if (!this.answer && !this.question) {
    this.invalidate("answer", "Either answer or question must be provided.");
  }
  next();
});

export const Vote = mongoose.models.Vote || mongoose.model("Vote", VoteSchema);
