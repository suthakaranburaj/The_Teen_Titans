import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Question } from "@/models/Question";
import { Answer } from "@/models/Answer";
// import { authenticateUser } from "@/lib/authenticate";

export const GET = asyncHandler(async (req, { params }) => {
  await dbConnect();
  const { id } = params;

  const question = await Question.findById(id)
    .populate("user", "name")
    .populate("tags", "name slug");

  if (!question) {
    return send_response(
      false,
      null,
      "Question not found",
      StatusCodes.NOT_FOUND
    );
  }

  const answers = await Answer.find({ question: id }).populate("user", "name");

  const fullData = {
    ...question.toObject(),
    answers,
  };

  return send_response(true, fullData, "Question retrieved", StatusCodes.OK);
});


export const PUT = asyncHandler(async (req, { params }) => {
  await dbConnect();
  const currentUser = req.user;
  const { id } = params;

  const question = await Question.findById(id);
  if (!question) {
    return send_response(
      false,
      null,
      "Question not found",
      StatusCodes.NOT_FOUND
    );
  }

  if (question.user.toString() !== currentUser._id.toString()) {
    return send_response(false, null, "Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  const { title, description } = await req.json();
  question.title = title || question.title;
  question.description = description || question.description;
  await question.save();

  return send_response(true, question, "Question updated", StatusCodes.OK);
});

export const DELETE = asyncHandler(async (req, { params }) => {
  await dbConnect();
  const currentUser = await authenticateUser(req);
  const { id } = params;

  const question = await Question.findById(id);
  if (!question) {
    return send_response(
      false,
      null,
      "Question not found",
      StatusCodes.NOT_FOUND
    );
  }

  if (question.user.toString() !== currentUser._id.toString()) {
    return send_response(false, null, "Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  // Delete related answers and votes
  await Answer.deleteMany({ question: id });
  await Vote.deleteMany({ question: id });

  await question.deleteOne();

  return send_response(true, null, "Question deleted", StatusCodes.OK);
});
