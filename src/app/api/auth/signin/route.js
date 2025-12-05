import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/auth-server";

import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/auth-client";

import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB(); // ✅ حتماً await

    const body = await req.json();
    const { phoneOrEmail, password } = body;

    const isValidEmail = validateEmail(phoneOrEmail);
    const isValidPhone = validatePhone(phoneOrEmail);
    const isValidPassword = validatePassword(password);

    if (!isValidPassword || (!isValidEmail && !isValidPhone)) {
      return NextResponse.json(
        { message: "ایمیل یا شماره موبایل یا رمزعبور نامعتبر است" },
        { status: 419 }
      );
    }

    // پیدا کردن کاربر با ایمیل یا تلفن + password
    const user = await UserModel.findOne({
      $or: [{ email: phoneOrEmail }, { phone: phoneOrEmail }],
    }).select("+password");

    if (!user) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 422 });
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPasswordWithHash) {
      return NextResponse.json(
        { message: "رمز عبور نادرست است" },
        { status: 401 }
      );
    }

    // تولید توکن‌ها
    const accessToken = generateAccessToken({ phone: user.phone });
    const refreshToken = generateRefreshToken({ phone: user.phone });

    // ذخیره refresh token در DB
    await UserModel.findByIdAndUpdate(user._id, {
      $set: { refreshToken },
    });

    // پاسخ با کوکی‌های httpOnly
    const response = NextResponse.json(
      { message: "ورود با موفقیت انجام شد" },
      { status: 200 }
    );

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15, // 15 دقیقه
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 15, // 15 روز
    });

    return response;
  } catch (err) {
    console.log("Signin Error ->", err);
    return NextResponse.json(
      { message: "خطا در سرور", error: err.message },
      { status: 500 }
    );
  }
}
