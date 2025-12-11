// src/app/api/admin/categories/route.js

import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import ProductCategory from "@/models/ProductCategory";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import slugify from "slugify";

// تنظیمات آپلود امن
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

// تابع آپلود امن
async function uploadImage(file) {
  if (!file || file.size === 0) return null;

  // چک نوع و حجم
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("فقط فرمت‌های JPG, PNG, WebP, AVIF مجاز است");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("حجم تصویر بیشتر از ۲ مگابایت است");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

// ===================== GET - همه دسته‌بندی‌ها =====================
export async function GET() {
  try {
    await connectToDB();

    const categories = await ProductCategory.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    // ساخت ساختار درختی (اختیاری، خیلی باحاله)
    const buildTree = (items, parentId = null) => {
      return items
        .filter(item => (parentId === null ? !item.parent : item.parent?.toString() === parentId))
        .map(item => ({
          ...item,
          children: buildTree(items, item._id.toString()),
        }));
    };

    const tree = buildTree(categories);

    return NextResponse.json({
      success: true,
      categories,
      tree, // برای مگامنو خیلی خوبه
    });
  } catch (error) {
    console.error("Category GET error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// ===================== POST - ایجاد دسته‌بندی جدید =====================
export async function POST(request) {
  try {
    await connectToDB();
    const formData = await request.formData();

    const title = formData.get("title")?.toString().trim();
    const slug = formData.get("slug")?.toString().trim();
    const mainCategory = formData.get("mainCategory");
    const parentId = formData.get("parent") || null;
    const thumbnailFile = formData.get("thumbnail");

    // اعتبارسنجی
    if (!title || !mainCategory) {
      return NextResponse.json(
        { error: "عنوان و بخش اصلی (mainCategory) الزامی هستند" },
        { status: 400 }
      );
    }

    if (!["onlineshop", "drugstore", "blog"].includes(mainCategory)) {
      return NextResponse.json(
        { error: "بخش اصلی نامعتبر است" },
        { status: 400 }
      );
    }


    // اعتبارسنجی parent
    if (parentId) {
      const parent = await ProductCategory.findById(parentId);
      if (!parent) {
        return NextResponse.json({ error: "دسته‌بندی والد یافت نشد" }, { status: 400 });
      }
      if (parent.parent && parent.parent.toString() === parentId) {
        return NextResponse.json({ error: "نمی‌تونی زیرمجموعه خودش باشه!" }, { status: 400 });
      }
    }

    // آپلود تصویر
    let thumbnail = "/images/default-category.png";
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnail = await uploadImage(thumbnailFile);
    }

    // ایجاد دسته‌بندی
    const category = await ProductCategory.create({
      title,
      slug,
      mainCategory,
      parent: parentId || null,
      thumbnail,
      isActive: true,
      showInMenu: true,
      order: 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "دسته‌بندی با موفقیت ایجاد شد",
        category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Category POST error:", error);
    return NextResponse.json(
      { error: error.message || "خطای سرور" },
      { status: 500 }
    );
  }
}