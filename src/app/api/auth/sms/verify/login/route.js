import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp";
import UserModel from "@/models/User";
import { generateAccessToken } from "@/utils/auth-server";

export async function POST(req) {
  await connectToDB();
  const { phone, code } = await req.json();

  if (!phone || !code) {
    return Response.json({ message: "شماره یا کد وارد نشده" }, { status: 400 });
  }

  const otp = await OtpModel.findOne({ phone, code });
  if (!otp) return Response.json({ message: "کد اشتباه است" }, { status: 409 });
  if (otp.expTime < Date.now()) return Response.json({ message: "کد منقضی شده" }, { status: 410 });

  // حذف OTP پس از استفاده
  await OtpModel.deleteOne({ _id: otp._id });

  const user = await UserModel.findOne({ phone });
  if (!user) return Response.json({ message: "کاربری با این شماره پیدا نشد" }, { status: 404 });

  const token = generateAccessToken({ phone: user.phone });

  return Response.json(
    {
      message: "ورود موفق",
      _id: user._id,
      phone: user.phone,
      role: user.role,
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; path=/; httpOnly; maxAge=${60 * 60 * 24 * 15}`, // 15 روز
      },
    }
  );
}
95694