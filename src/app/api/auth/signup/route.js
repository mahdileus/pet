import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, generateRefreshToken, hashPassword } from "@/utils/auth-server";
import { roles } from "@/utils/constants";
import { validateEmail, validatePhone, validatePassword } from "@/utils/auth-client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { name, phone, email, password } = body;

    // Validate Name
    if (!name || name.trim().length < 3) {
      return NextResponse.json({ message: "نام باید حداقل ۳ کاراکتر باشد." }, { status: 400 });
    }

    // Validate Phone
    if (!validatePhone(phone)) {
      return NextResponse.json({ message: "شماره موبایل معتبر نیست." }, { status: 400 });
    }

    // Validate Email (only if provided)
    if (email && !validateEmail(email)) {
      return NextResponse.json({ message: "ایمیل وارد شده معتبر نیست." }, { status: 400 });
    }

    // Validate Password
    if (!validatePassword(password)) {
      return NextResponse.json({
        message: "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد.",
      }, { status: 400 });
    }

    // بررسی وجود کاربر
    const existingUser = await UserModel.findOne({
      $or: [{ phone }, { email }],
    });
    if (existingUser) {
      return NextResponse.json({ message: "ایمیل یا شماره موبایل قبلاً ثبت شده است." }, { status: 422 });
    }

    const hashedPassword = await hashPassword(password);

    // تولید توکن‌ها
    const accessToken = generateAccessToken({ phone });
    const refreshToken = generateRefreshToken({ phone });

    // تعیین نقش کاربر
    const isFirstUser = (await UserModel.countDocuments({})) === 0;
    const role = isFirstUser ? roles.ADMIN : roles.USER;

    // ایجاد کاربر
    const user = await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      refreshToken,
    });

    // پاسخ با کوکی‌ها
    const response = NextResponse.json({ message: "ثبت‌نام با موفقیت انجام شد" }, { status: 201 });
    response.cookies.set("token", accessToken, { httpOnly: true, path: "/", maxAge: 60 * 15 });
    response.cookies.set("refreshToken", refreshToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 15 });

    return response;
  } catch (err) {
    console.log("Signup Error ->", err);
    return NextResponse.json({ message: "خطا در سرور", error: err.message }, { status: 500 });
  }
}
