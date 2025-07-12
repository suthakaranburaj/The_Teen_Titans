import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Answer } from "@/models/Answer";
import { Question } from "@/models/Question";
import { Notification } from "@/models/Notification";

export const POST = asyncHandler(async (req) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");

  const { content, questionId } = await req.json();

  const answer = await Answer.create({
    content,
    question: questionId,
    user: userId,
  });

  // Add to question's answers array
  await Question.findByIdAndUpdate(questionId, {
    $push: { answers: answer._id },
  });

  // Create notification
  const question = await Question.findById(questionId);
  if (question.user.toString() !== userId.toString()) {
    await Notification.create({
      recipient: question.user,
      type: "answer",
      question: questionId,
      sourceUser: userId,
    });
  }

  return send_response(true, answer, "Answer created", StatusCodes.CREATED);
});
