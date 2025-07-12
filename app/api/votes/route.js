import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Vote } from "@/models/Vote";
import { Question } from "@/models/Question";
import { Answer } from "@/models/Answer";

export const POST = asyncHandler(async (req) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");

  const { value, questionId, answerId } = await req.json();
  console.log("fweoifjeo", value, questionId, answerId);
  if (![1, -1].includes(value)) {
    return send_response(
      false,
      null,
      "Invalid vote value",
      StatusCodes.BAD_REQUEST
    );
  }

  // Determine vote target
  const target = {};
  if (questionId) {
    target.question = questionId;
    const question = await Question.findById(questionId);
    if (!question) {
      return send_response(
        false,
        null,
        "Question not found",
        StatusCodes.NOT_FOUND
      );
    }
  } else if (answerId) {
    target.answer = answerId;
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return send_response(
        false,
        null,
        "Answer not found",
        StatusCodes.NOT_FOUND
      );
    }
  } else {
    return send_response(
      false,
      null,
      "Missing vote target",
      StatusCodes.BAD_REQUEST
    );
  }

  // Check existing vote
  let vote = await Vote.findOne({ user: userId, ...target });

  if (vote) {
    if (vote.value === value) {
      // Remove vote if same value
      await vote.deleteOne();
      await updateVoteCount(target, -value);
      return send_response(true, null, "Vote removed", StatusCodes.OK);
    } else {
      // Update vote if different value
      const valueChange = value - vote.value;
      vote.value = value;
      await vote.save();
      await updateVoteCount(target, valueChange);
      return send_response(true, vote, "Vote updated", StatusCodes.OK);
    }
  }

  // Create new vote
  vote = await Vote.create({
    user: userId,
    value,
    ...target,
  });

  await updateVoteCount(target, value);

  return send_response(true, vote, "Vote created", StatusCodes.CREATED);
});

async function updateVoteCount(target, valueChange) {
  if (target.question) {
    await Question.findByIdAndUpdate(target.question, {
      $inc: { voteCount: valueChange },
    });
  } else if (target.answer) {
    await Answer.findByIdAndUpdate(target.answer, {
      $inc: { voteCount: valueChange },
    });
  }
}
