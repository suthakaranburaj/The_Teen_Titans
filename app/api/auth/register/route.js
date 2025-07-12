import { send_response } from "@/utils/apiResponse";
import { User } from "@/models/User";
import { generateAccessAndRefreshTokens } from "@/lib/generateAccessAndRefreshToken";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";

export const POST = asyncHandler(async (req) => {
  await dbConnect();
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password || !name) {
    return send_response(false, null,"All Fields are required!",StatusCodes.BAD_REQUEST)
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return send_response(
      false,
      null,
      "User with email already exists",
      StatusCodes.CONFLICT
    );
  }

  const user = await User.create({ name, email, password });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  //  const data = { user: createdUser, accessToken, refreshToken };
   const data = { user: createdUser, accessToken,refreshToken };
  return send_response(true, data, "User registered Successfully", StatusCodes.CREATED);
});
