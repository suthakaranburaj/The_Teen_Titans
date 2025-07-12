import { send_response } from "@/utils/apiResponse";
import { User } from "@/models/User";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { verifyToken } from "@/utils/verifyToken";

export const POST = asyncHandler(async (req) => {
  await dbConnect();
  const user_req = await verifyToken(req);
  const email = user_req?.email;
  console.log(email);
  if (!email) {
    return send_response(
      false,
      null,
      "Email is Missing!",
      StatusCodes.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return send_response(false, null, "User not found", StatusCodes.NOT_FOUND);
  }

  return send_response(
    true,
    {
      user: user,
    },
    "User Details fetched Successfully",
    StatusCodes.OK
  );
});
