// middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";
import { send_response } from "./utils/apiResponse";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const verification = await verifyToken(request);

  if (!verification?.verified) {
    return new NextResponse(
      JSON.stringify({ success: false, message: verification.message }),
      { status: 401 }
    );
  }

  const response = NextResponse.next();

  // Pass user info (like user ID) via custom headers
  response.headers.set("x-user-id", verification.user._id.toString());
  response.headers.set("x-user-email", verification.user.email); // optional

  return response;
}

export const config = {
  matcher: ["/api/:path*"]
};
