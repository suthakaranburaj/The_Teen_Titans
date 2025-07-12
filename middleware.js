// middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";
import { send_response } from "./utils/apiResponse";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const verification = await verifyToken(request); // 👉 wait for token verification

  if (!verification?.verified) {
    return send_response(false, null, verification?.message, 401);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"]
};
