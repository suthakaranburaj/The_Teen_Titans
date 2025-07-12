import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Question } from "@/models/Question";
import { Tag } from "@/models/Tag";
// import { authenticateUser } from "@/lib/authenticate";

export const GET = asyncHandler(async (req) => {
  await dbConnect();

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const sort = url.searchParams.get("sort") || "-createdAt";
  const tag = url.searchParams.get("tag");
  const user = url.searchParams.get("user");

  const query = {};
  if (tag) query.tags = tag;
  if (user) query.user = user;

  const questions = await Question.find(query)
    .populate("user", "name")
    .populate("tags", "name slug")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Question.countDocuments(query);

  return send_response(
    true,
    { questions, total },
    "Questions retrieved",
    StatusCodes.OK
  );
});

export const POST = asyncHandler(async (req) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");
  console.log("Current User:", userId);

  const { title, description, tags } = await req.json();

  // Process tags - find or create
  const tagIds = [];
  for (const tagName of tags) {
    const slug = tagName.toLowerCase().replace(/\s+/g, "-");
    let tag = await Tag.findOne({ slug });
    if (!tag) {
      tag = await Tag.create({ name: tagName, slug });
    }
    tagIds.push(tag._id);
  }

  const question = await Question.create({
    title,
    description,
    tags: tagIds,
    user: userId,
  });

  return send_response(true, question, "Question created", StatusCodes.CREATED);
});
