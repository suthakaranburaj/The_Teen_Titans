import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Tag } from "@/models/Tag";
import { Question } from "@/models/Question";

export const GET = asyncHandler(async (req) => {
  await dbConnect();

  const tags = await Tag.aggregate([
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "tags",
        as: "questions",
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        questionCount: { $size: "$questions" },
      },
    },
    { $sort: { questionCount: -1 } },
  ]);

  return send_response(true, tags, "Tags retrieved", StatusCodes.OK);
});
