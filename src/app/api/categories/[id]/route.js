// app/api/categories/[id]/route.js   ← مسیر دقیقاً این باشه!

import connectToDB from "@/configs/db";
import ProductCategory from "@/models/ProductCategory";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// مطمئن شو این پوشه وجود داره
await mkdir(UPLOAD_DIR, { recursive: true });

// تابع آپلود امن
async function uploadThumbnail(file) {
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

// GET - دریافت یک دسته‌بندی
export async function GET(request, { params }) {
  try {
    await connectToDB();
    const { id } = await params; // حتماً await کن!

    if (!id) {
      return NextResponse.json({ error: "آیدی الزامی است" }, { status: 400 });
    }

    const category = await ProductCategory.findById(id)
      .populate("parent", "title slug")
      .lean();

    if (!category) {
      return NextResponse.json({ error: "دسته‌بندی یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("GET category error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// PUT - ویرایش دسته‌بندی
export async function PUT(request, { params }) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "آیدی الزامی است" }, { status: 400 });
    }

    const formData = await request.formData();

    const title = formData.get("title")?.toString().trim();
    const slug = formData.get("slug")?.toString().trim();
    const mainCategory = formData.get("mainCategory");
    const parent = formData.get("parent") || null;
    const thumbnailFile = formData.get("thumbnail");

    if (!title || !mainCategory) {
      return NextResponse.json({ error: "عنوان و بخش اصلی الزامی هستند" }, { status: 400 });
    }

    const updateData = {
      title,
      slug,
      mainCategory,
      parent: parent === "null" ? null : parent,
    };

    // آپلود تصویر جدید
    if (thumbnailFile && thumbnailFile.size > 0) {
      const newThumbnail = await uploadThumbnail(thumbnailFile);
      if (newThumbnail) updateData.thumbnail = newThumbnail;
    }

    const updated = await ProductCategory.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "دسته‌بندی یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: updated });
  } catch (error) {
    console.error("PUT category error:", error);
    return NextResponse.json({ error: error.message || "خطای سرور" }, { status: 500 });
  }
}

// DELETE - حذف دسته‌بندی
export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const { id } = await params; // حتماً await!

    if (!id) {
      return NextResponse.json({ error: "آیدی الزامی است" }, { status: 400 });
    }

    // اول چک کن وجود داره
    const category = await ProductCategory.findById(id);
    if (!category) {
      return NextResponse.json({ error: "دسته‌بندی یافت نشد" }, { status: 404 });
    }

    // اگه زیرمجموعه داره، نمی‌ذاریم حذف بشه (یا می‌تونی حذف کنی!)
    const hasChildren = await ProductCategory.countDocuments({ parent: id });
    if (hasChildren > 0) {
      return NextResponse.json(
        { error: "این دسته‌بندی دارای زیرمجموعه است. ابتدا آن‌ها را حذف کنید." },
        { status: 400 }
      );
    }

    await ProductCategory.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "دسته‌بندی با موفقیت حذف شد" });
  } catch (error) {
    console.error("DELETE category error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}