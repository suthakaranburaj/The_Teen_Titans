import { send_response } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { StatusCodes } from "@/utils/statusCode";
import dbConnect from "@/lib/mongodb";
import { Notification } from "@/models/Notification";

export const GET = asyncHandler(async (req) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");

  const notifications = await Notification.find({
    recipient: userId,
    isRead: false,
  })
    .populate("sourceUser", "name")
    .populate("question", "title")
    .sort("-createdAt");

  return send_response(
    true,
    notifications,
    "Notifications retrieved",
    StatusCodes.OK
  );
});

export const PUT = asyncHandler(async (req, { params }) => {
  await dbConnect();
  const userId = req.headers.get("x-user-id");
  const { id } = params;

  const notification = await Notification.findById(id);
  if (!notification) {
    return send_response(
      false,
      null,
      "Notification not found",
      StatusCodes.NOT_FOUND
    );
  }

  if (notification.recipient.toString() !== userId.toString()) {
    return send_response(false, null, "Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  notification.isRead = true;
  await notification.save();

  return send_response(
    true,
    notification,
    "Notification marked as read",
    StatusCodes.OK
  );
});
