import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function verifyAuth(request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return false;
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload;
  } catch (err) {
    return false;
  }
}

export async function authMiddleware(request) {
  const isAuthenticated = await verifyAuth(request);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}
