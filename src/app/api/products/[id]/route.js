// src/app/api/admin/products/[id]/route.js   (یا اگه عمومیه: /api/products/[id]/route.js)

import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import Product from "@/models/Product";
import Category from "@/models/ProductCategory";
import Brand from "@/models/Brand";
import { authAdmin } from "@/utils/auth-server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import slugify from "slugify";
import mongoose from "mongoose";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// تابع آپلود امن
async function uploadFile(file) {
  if (!file || file.size === 0) return null;
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error("نوع فایل مجاز نیست");
  if (file.size > MAX_SIZE) throw new Error("حجم فایل بیش از حد مجاز است");

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${randomUUID()}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

// حذف فایل قدیمی (اختیاری)
async function deleteOldFile(url) {
  if (!url || url.startsWith("/images/default")) return;
  const filePath = path.join(process.cwd(), "public", url);
  try {
    await unlink(filePath);
  } catch (err) {
    console.warn("Failed to delete old file:", url);
  }
}

// ===================== PUT - ویرایش محصول =====================
export async function PUT(request, { params }) {
  try {
    await connectToDB();
    const isAdmin = await authAdmin(request);
    if (!isAdmin) return NextResponse.json({ error: "دسترسی ممنوع" }, { status: 403 });

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 422 });
    }

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });

    const formData = await request.formData();

    const title = formData.get("title")?.toString().trim();
    if (title) product.title = title;

    // slug
    if (formData.get("slug")) {
      let newSlug = slugify(formData.get("slug").toString(), { lower: true, strict: true });
      const slugExists = await Product.findOne({ slug: newSlug, _id: { $ne: id } });
      if (slugExists) {
        newSlug = `${newSlug}-${randomUUID().slice(0, 6)}`;
      }
      product.slug = newSlug;
    }

    // قیمت و تخفیف
    if (formData.get("price")) product.price = Number(formData.get("price"));
    if (formData.has("discountedPrice")) {
      const dp = formData.get("discountedPrice");
      product.discountedPrice = dp ? Number(dp) : null;
    }
    if (formData.has("discountPercent")) {
      const dp = formData.get("discountPercent");
      product.discountPercent = dp ? Number(dp) : null;
    }

    // روابط
    if (formData.get("category")) {
      const cat = await Category.findById(formData.get("category"));
      if (!cat) return NextResponse.json({ error: "دسته‌بندی نامعتبر" }, { status: 422 });
      product.category = formData.get("category");
    }
    if (formData.has("brand")) {
      const brandId = formData.get("brand");
      if (brandId && mongoose.Types.ObjectId.isValid(brandId)) {
        const brand = await Brand.findById(brandId);
        if (!brand) return NextResponse.json({ error: "برند نامعتبر" }, { status: 422 });
        product.brand = brandId;
      } else {
        product.brand = null;
      }
    }

    // موجودی و وضعیت
    if (formData.get("stock")) product.stock = Number(formData.get("stock"));

    // توضیحات
    if (formData.get("shortDescription")) product.shortDescription = formData.get("shortDescription");
    if (formData.get("longDescription")) product.longDescription = formData.get("longDescription");

    // آرایه‌ها و آبجکت‌ها
    if (formData.get("badges")) product.badges = JSON.parse(formData.get("badges"));
    if (formData.get("tags")) product.tags = JSON.parse(formData.get("tags"));
    if (formData.get("variants")) product.variants = JSON.parse(formData.get("variants"));
    if (formData.get("attributes")) product.attributes = JSON.parse(formData.get("attributes"));

    // آپلود تصاویر
    const thumbnailFile = formData.get("thumbnail");
    if (thumbnailFile && thumbnailFile.size > 0) {
      const newThumb = await uploadFile(thumbnailFile);
      if (product.thumbnail) await deleteOldFile(product.thumbnail);
      product.thumbnail = newThumb;
    }

    const galleryFiles = formData.getAll("gallery");
    if (galleryFiles.length > 0 && galleryFiles[0].size > 0) {
      const newGallery = await Promise.all(galleryFiles.map(uploadFile));
      product.gallery = [...product.gallery, ...newGallery.filter(Boolean)];
    }

    await product.save();

    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت بروزرسانی شد",
      product,
    });
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: error.message || "خطای سرور" }, { status: 500 });
  }
}

// ===================== GET - دریافت تک محصول =====================
export async function GET(request, { params }) {
  try {
    await connectToDB();

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 422 });
    }

    const product = await Product.findById(id)
      .populate("category", "title slug ancestors")
      .populate("brand", "name slug logo")
      .populate({
        path: "comments",
        select: "user rating comment createdAt",
        populate: { path: "user", select: "name avatar" },
        options: { limit: 20, sort: { createdAt: -1 } }
      })
      .lean();

    if (!product) {
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// ===================== DELETE - حذف محصول =====================
export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const isAdmin = await authAdmin(request);
    if (!isAdmin) return NextResponse.json({ error: "دسترسی ممنوع" }, { status: 403 });

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 422 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    }

    // حذف تصاویر (اختیاری)
    if (product.thumbnail) await deleteOldFile(product.thumbnail);
    for (const img of product.gallery) await deleteOldFile(img);

    return NextResponse.json({ success: true, message: "محصول با موفقیت حذف شد" });
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}