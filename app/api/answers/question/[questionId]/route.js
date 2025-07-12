import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Answer } from "@/models/Answer";

export const GET = asyncHandler(async (req, { params, url }) => {
  await dbConnect();
  console.log('foiehwio')

  const { questionId } = params;
  console.log('questionId', questionId);
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
  const contentFilter = searchParams.get("content") || "";

  const query = {
    question: questionId,
    ...(contentFilter && { content: { $regex: contentFilter, $options: "i" } }),
  };

  const answers = await Answer.find(query)
    .populate("user", "name email avatar") // optional user details
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Answer.countDocuments(query);

  return send_response(
    true,
    { answers, total, page, limit },
    "Answers fetched",
    StatusCodes.OK
  );
});
