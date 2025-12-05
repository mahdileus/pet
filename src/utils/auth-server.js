import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";

// --- Password ---
const hashPassword = async (password) => {
  return await hash(password, 12);
};

const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

// --- Tokens ---
const generateAccessToken = (data) => {
  // Access Token کوتاه (مثلاً 1 ساعت)
  return sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "1h",
  });
};

const verifyAccessToken = (token) => {
  try {
    return verify(token, process.env.AccessTokenSecretKey);
  } catch (err) {
    return false;
  }
};

const generateRefreshToken = (data) => {
  // Refresh Token طولانی (مثلاً 15 روز)
  return sign({ ...data }, process.env.RefreshTokenSecretKey, {
    expiresIn: "15d",
  });
};

const verifyRefreshToken = (token) => {
  try {
    return verify(token, process.env.RefreshTokenSecretKey);
  } catch (err) {
    return false;
  }
};

// --- Auth helpers ---
const authUser = async () => {
  await connectToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) return null;

  const tokenPayload = verifyAccessToken(token.value);
  if (!tokenPayload) return null;

  const user = await UserModel.findOne({ phone: tokenPayload.phone });
  return user || null;
};

const authAdmin = async () => {
  await connectToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) return null;

  const tokenPayload = verifyAccessToken(token.value);
  if (!tokenPayload) return null;

  const user = await UserModel.findOne({ phone: tokenPayload.phone });
  if (!user || user.role !== "ADMIN") return null;

  return user;
};

// --- Refresh token flow ---
const refreshAccessToken = async () => {
  await connectToDB();
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");
  if (!refreshToken) return null;

  const payload = verifyRefreshToken(refreshToken.value);
  if (!payload) return null;

  const user = await UserModel.findOne({ phone: payload.phone });
  if (!user) return null;

  const newAccessToken = generateAccessToken({ phone: user.phone });
  return { accessToken: newAccessToken, user };
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  authUser,
  authAdmin,
  refreshAccessToken,
};
