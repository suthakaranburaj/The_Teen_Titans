import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Vote } from "@/models/Vote";
import { Question } from "@/models/Question";
import { Answer } from "@/models/Answer";
import { Notification } from "@/models/Notification";


export const POST = asyncHandler(async (req) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");
  const { value, questionId, answerId } = await req.json();

  if (![1, -1].includes(value)) {
    return send_response(
      false,
      null,
      "Invalid vote value",
      StatusCodes.BAD_REQUEST
    );
  }

  const target = {};
  let ownerId;
  let votedOn = "";

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
    ownerId = question.user.toString();
    votedOn = "question";
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
    ownerId = answer.user.toString();
    votedOn = "answer";
  } else {
    return send_response(
      false,
      null,
      "Missing vote target",
      StatusCodes.BAD_REQUEST
    );
  }

  let vote = await Vote.findOne({ user: userId, ...target });

  if (vote) {
    if (vote.value === value) {
      await vote.deleteOne();
      await updateVoteCount(target, -value);
      return send_response(true, null, "Vote removed", StatusCodes.OK);
    } else {
      const valueChange = value - vote.value;
      vote.value = value;
      await vote.save();
      await updateVoteCount(target, valueChange);
      // No notification on update to prevent spam
      return send_response(true, vote, "Vote updated", StatusCodes.OK);
    }
  }

  vote = await Vote.create({
    user: userId,
    value,
    ...target,
  });

  await updateVoteCount(target, value);

  // 🛎️ Create notification if voter and owner are different
  if (userId !== ownerId) {
    await Notification.create({
      recipient: ownerId,
      sourceUser: userId,
      question: questionId || null,
      type: "vote",
      message: `Your ${votedOn} received a ${
        value === 1 ? "upvote" : "downvote"
      }`,
    });
  }

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
