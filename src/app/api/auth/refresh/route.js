import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from "@/utils/auth-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("token");
    const refreshToken = cookieStore.get("refreshToken");

    let user = null;

    // بررسی access token
    if (accessToken) {
        try {
            const payload = verifyAccessToken(accessToken.value);
            user = await UserModel.findOne({ phone: payload.phone }, "-password -refreshTokens -__v");
            if (user) {
                return NextResponse.json({ success: true, data: user, message: "دسترسی معتبر" });
            }
        } catch (err) {
            // اگر منقضی شده یا نامعتبر، ادامه می‌دهیم به refresh token
            console.log("Access token error ->", err.message);
        }
    }

    // بررسی refresh token
    if (!refreshToken) {
        return NextResponse.json({ success: false, data: null, message: "توکن یافت نشد یا منقضی شد" }, { status: 401 });
    }

    try {
        const payload = verifyRefreshToken(refreshToken.value);
        user = await UserModel.findOne({ phone: payload.phone }, "-password -refreshTokens -__v");
        if (!user) return NextResponse.json({ success: false, data: null, message: "کاربر یافت نشد" }, { status: 404 });

        // ایجاد access token جدید
        const newAccessToken = generateAccessToken({ phone: user.phone });

        const response = NextResponse.json({ success: true, data: { ...user.toObject(), accessToken: newAccessToken }, message: "توکن تازه ایجاد شد" });
        response.cookies.set("token", newAccessToken, { httpOnly: true, path: "/", maxAge: 60 * 60, sameSite: "strict", secure: process.env.NODE_ENV === "production" });

        return response;
    } catch (err) {
        console.log("Refresh token error ->", err.message);
        return NextResponse.json({ success: false, data: null, message: "توکن منقضی یا نامعتبر است" }, { status: 403 });
    }
}
