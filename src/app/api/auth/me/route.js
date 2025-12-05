import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyAccessToken, refreshAccessToken } from "@/utils/auth-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { validateEmail } from "@/utils/auth-client";


export async function GET() {
  await connectToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, data: null, message: "توکن یافت نشد!" },
      { status: 401 }
    );
  }

  try {
    let tokenPayload = verifyAccessToken(token.value);
    let user;

    if (!tokenPayload) {
      // Access Token منقضی یا نامعتبر
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        return NextResponse.json(
          { success: false, data: null, message: "توکن منقضی شده است" },
          { status: 403 }
        );
      }
      tokenPayload = verifyAccessToken(refreshed.accessToken);
      user = refreshed.user;
    } else {
      user = await UserModel.findOne(
        { phone: tokenPayload.phone },
        "-password -refreshTokens -__v"
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, data: null, message: "کاربر یافت نشد!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        role: user.role,
        phone: user.phone,
        name: user.name,
        addresses: user.addresses || [],
      },
    });
  } catch (err) {
    console.error("GET /auth/me error ->", err);
    return NextResponse.json(
      { success: false, data: null, message: "خطای سرور" },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  await connectToDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "توکن یافت نشد!" },
      { status: 401 }
    );
  }

  try {
    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return NextResponse.json(
        { success: false, message: "توکن نامعتبر یا منقضی شده" },
        { status: 403 }
      );
    }

    const user = await UserModel.findOne({ phone: tokenPayload.phone });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربر یافت نشد!" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { name, email, nationalCode, password, avatar } = body;

    const updateData = {};

    if (name && name.trim().length >= 3) updateData.name = name.trim();
    if (email && validateEmail(email)) updateData.email = email.trim();
    if (nationalCode) updateData.nationalCode = nationalCode.trim();
    if (avatar) updateData.avatar = avatar;

    if (password && password.length >= 8) {
      updateData.password = await hashPassword(password);
    }

    // به‌روزرسانی کاربر
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $set: updateData },
      { new: true, select: "-password -refreshTokens -__v" }
    );

    return NextResponse.json({
      success: true,
      message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد",
      data: updatedUser,
    });
  } catch (err) {
    console.error("PUT /auth/me error ->", err);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}

