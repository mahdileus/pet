// app/api/admin/brands/route.js
import connectToDB from "@/configs/db";
import Brand from "@/models/Brand";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// آپلود امن لوگو
async function uploadLogo(file) {
  if (!file || file.size === 0) return null;

  // چک نوع فایل
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("فقط JPG, PNG, WebP و SVG مجاز است");
  }

  // چک حجم (حداکثر 2MB)
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("حجم لوگو بیشتر از 2 مگابایت است");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name || ".png");
  const filename = `brand-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  
  const uploadDir = path.join(process.cwd(), "public", "uploads", "brands");
  await mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  return `/uploads/brands/${filename}`;
}



export async function POST(request) {
  try {
    await connectToDB();

    // اختیاری: احراز هویت ادمین
    // const admin = await authAdmin(request);
    // if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const website = formData.get("website")?.toString().trim() || null;
    const description = formData.get("description")?.toString().trim() || null;
    const logoFile = formData.get("logo");
    const slug = formData.get("slug")?.toString().trim();

    // اعتبارسنجی
    if (!name) {
      return NextResponse.json({ message: "نام برند الزامی است" }, { status: 400 });
    }
    // چک تکراری (نام یا اسلاگ)
    const duplicate = await Brand.findOne({
      $or: [{ name }, { slug }],
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "برند یا اسلاگ تکراری است" },
        { status: 409 }
      );
    }

    let logoPath = "/images/default-brand.png";

    if (logoFile && logoFile.size > 0) {
      try {
        logoPath = await uploadLogo(logoFile);
      } catch (uploadError) {
        return NextResponse.json({ message: uploadError.message }, { status: 400 });
      }
    }

    const brand = await Brand.create({
      name,
      slug,
      website,
      description,
      slug,
      logo: logoPath,
    });

    return NextResponse.json(
      { success: true, message: "برند با موفقیت ایجاد شد", data: brand },
      { status: 201 }
    );
  } catch (err) {
    console.error("Brand Create Error:", err);
    return NextResponse.json(
      { message: "خطای سرور", error: err.message },
      { status: 500 }
    );
  }
}

// GET - لیست همه برندها
export async function GET() {
  try {
    await connectToDB();
    const brands = await Brand.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, brands });
  } catch (err) {
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}