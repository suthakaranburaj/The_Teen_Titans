import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Answer } from "@/models/Answer";

export const PUT = asyncHandler(async (req, { params }) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");
  const { id } = params;

  const answer = await Answer.findById(id);
  if (!answer) {
    return send_response(
      false,
      null,
      "Answer not found",
      StatusCodes.NOT_FOUND
    );
  }

  if (answer.user.toString() !== userId.toString()) {
    return send_response(false, null, "Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  const { content } = await req.json();
  answer.content = content || answer.content;
  await answer.save();

  return send_response(true, answer, "Answer updated", StatusCodes.OK);
});

export const DELETE = asyncHandler(async (req, { params }) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");
  const { id } = params;

  const answer = await Answer.findById(id);
  if (!answer) {
    return send_response(
      false,
      null,
      "Answer not found",
      StatusCodes.NOT_FOUND
    );
  }

  if (answer.user.toString() !== userId.toString()) {
    return send_response(false, null, "Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  // Remove from question's answers
  await Question.findByIdAndUpdate(answer.question, {
    $pull: { answers: answer._id },
  });

  // Delete related votes
  await Vote.deleteMany({ answer: id });

  await answer.deleteOne();

  return send_response(true, null, "Answer deleted", StatusCodes.OK);
});
