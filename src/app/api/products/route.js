import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { writeFile } from "fs/promises";
import fs from "fs";
import slugify from "slugify";
import path from "path";

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();

    // دریافت فیلدهای اصلی محصول
    const title = formData.get("title");
    const slug = slugify(formData.get("slug"), { lower: true, strict: true });
    const price = +formData.get("price");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const discountPercent = formData.get("discountPercent");
    const category = formData.get("category");
    const score = +formData.get("score") || 5;
    const tags = JSON.parse(formData.get("tags") || "[]");

    // مسیر فیزیکی ذخیره فایل در public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ذخیره تامنیل محصول
    const thumbnail = formData.get("thumbnail");
    if (!thumbnail || typeof thumbnail.arrayBuffer !== "function") {
      throw new Error("Thumbnail نامعتبر است یا ارسال نشده");
    }

    const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
    const thumbnailName = `${Date.now()}-${thumbnail.name}`;
    const thumbnailPath = path.join(uploadDir, thumbnailName);
    await writeFile(thumbnailPath, thumbnailBuffer);

    // ساخت محصول در دیتابیس
    const newProduct = await ProductModel.create({
      title,
      slug,
      price,
      category,
      discountPercent,
      shortDescription,
      longDescription,
      score,
      tags,
      thumbnail: `/uploads/${thumbnailName}`, // مسیر URL برای کلاینت
    });

    return Response.json(
      { message: "محصول با موفقیت ایجاد شد", data: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "خطا در ایجاد محصول", message: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  const products = await ProductModel.find({}, "-__v").populate("comments");
  return Response.json(products);
}
