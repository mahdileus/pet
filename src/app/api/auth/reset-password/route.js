import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { hashPassword } from "@/utils/auth-server";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await connectToDB();
  const { phone, code, newPassword } = await req.json();

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ message: "رمز عبور باید حداقل 8 کاراکتر باشد" }, { status: 400 });
  }

  const user = await UserModel.findOne({ phone });
  if (!user) return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 404 });

  const hashed = await hashPassword(newPassword);
  user.password = hashed;
  await user.save();

  return NextResponse.json({ message: "رمز عبور با موفقیت تغییر یافت" }, { status: 200 });
}
