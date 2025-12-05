import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();
  const { phone, code } = await req.json();

  const otp = await OtpModel.findOne({ phone, code });
  if (!otp) {
    return NextResponse.json({ message: "کد اشتباه است" }, { status: 409 });
  }
  if (otp.expTime < Date.now()) {
    return NextResponse.json({ message: "کد منقضی شده است" }, { status: 410 });
  }

  return NextResponse.json({ message: "کد معتبر است" }, { status: 200 });
}
