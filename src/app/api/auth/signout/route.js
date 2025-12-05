import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "خروج با موفقیت انجام شد",
  });

  // حذف کوکی‌ها
  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  response.cookies.set("refreshToken", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
