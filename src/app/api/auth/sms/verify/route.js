import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp";
import UserModel from "@/models/User";
import { generateAccessToken } from "@/utils/auth-server";
import { roles } from "@/utils/constants";

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const { phone, code } = body;

  if (!phone || !code) {
    return Response.json({ message: "شماره یا کد ارسال نشده است" }, { status: 400 });
  }

  if (!/^09\d{9}$/.test(phone)) {
    return Response.json({ message: "شماره موبایل معتبر نیست" }, { status: 400 });
  }

  if (!/^\d{5}$/.test(code)) {
    return Response.json({ message: "کد تأیید معتبر نیست (باید ۵ رقم عددی باشد)" }, { status: 400 });
  }

  const otp = await OtpModel.findOne({ phone, code });
  if (!otp) {
    return Response.json({ message: "کد اشتباه است" }, { status: 409 });
  }

  if (otp.expTime < Date.now()) {
    return Response.json({ message: "کد منقضی شده است" }, { status: 410 });
  }

  // حذف OTP پس از استفاده
  await OtpModel.deleteOne({ _id: otp._id });

  // بررسی کاربر موجود
  let user = await UserModel.findOne({ phone });
  if (!user) {
    const users = await UserModel.find({});
    user = await UserModel.create({
      phone,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });
  }

  const accessToken = generateAccessToken({ phone });

  return Response.json(
    {
      message: "کد صحیح است",
      user: {
        _id: user._id,
        phone: user.phone,
        role: user.role,
      },
    },
    {
      status: 200,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    }
  );
}
