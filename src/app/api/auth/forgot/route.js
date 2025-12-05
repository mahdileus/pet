import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import OtpModel from "@/models/Otp";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const { phone } = await req.json();

    // اعتبارسنجی شماره موبایل
    if (!phone || !/^09\d{9}$/.test(phone)) {
      return NextResponse.json(
        { message: "شماره موبایل معتبر نیست" },
        { status: 400 }
      );
    }

    // بررسی وجود کاربر
    const user = await UserModel.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { message: "کاربری با این شماره یافت نشد" },
        { status: 404 }
      );
    }

    // تولید OTP و زمان انقضا
    const code = Math.floor(10000 + Math.random() * 89999); // ۵ رقمی
    const expTime = Date.now() + 300_000; // ۵ دقیقه

    // ذخیره OTP در دیتابیس
    await OtpModel.create({ phone, code, expTime });

    // ارسال OTP با fetch به IPPanel
    const response = await fetch("http://ippanel.com/api/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        op: "pattern",
        user: process.env.IPPANEL_USER,
        pass: process.env.IPPANEL_PASS,
        fromNum: "3000505",
        toNum: phone,
        patternCode: "zcrh775wl9h9gx6",
        inputData: [{ "verification-code": code }],
      }),
    });

    if (!response.ok) {
      console.error("Error sending OTP:", await response.text());
      return NextResponse.json(
        { message: "خطا در ارسال کد به کاربر" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "کد تغییر رمز ارسال شد" },
      { status: 201 }
    );

  } catch (err) {
    console.error("Error in forgot-password OTP:", err);
    return NextResponse.json(
      { message: "خطا در سرور", error: err.message },
      { status: 500 }
    );
  }
}
