import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  content: { type: String, required: true }, // HTML content
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  voteCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Answer || mongoose.model("Answer", AnswerSchema);
