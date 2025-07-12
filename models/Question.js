import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // HTML content
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
  voteCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);