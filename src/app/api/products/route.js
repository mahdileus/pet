// src/app/api/admin/products/route.js   (یا اگر عمومیه: /api/products/route.js)
import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import Product from "@/models/Product";
import Category from "@/models/ProductCategory";
import Brand from "@/models/Brand";
import { authAdmin } from "@/utils/auth-server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import slugify from "slugify";

// تنظیمات آپلود
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// تابع آپلود امن
async function uploadFile(file) {
  if (!file || !ALLOWED_TYPES.includes(file.type)) {
    throw new Error("نوع فایل مجاز نیست");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("حجم فایل بیشتر از 5 مگابایت است");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${randomUUID()}${path.extname(file.name)}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

// ===================== POST - ایجاد محصول (فقط ادمین) =====================
export async function POST(request) {
  try {
    await connectToDB();
    const isAdmin = await authAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "دسترسی ممنوع" }, { status: 403 });
    }

    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const price = Number(formData.get("price"));
    const category = formData.get("category");

    if (!title || !price || !category) {
      return NextResponse.json(
        { error: "عنوان، قیمت و دسته‌بندی الزامی هستند" },
        { status: 422 }
      );
    }

    // اعتبارسنجی دسته‌بندی
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return NextResponse.json({ error: "دسته‌بندی نامعتبر" }, { status: 422 });
    }

    // اعتبارسنجی برند
    const brandId = formData.get("brand");
    if (brandId) {
      const brandExists = await Brand.findById(brandId);
      if (!brandExists) return NextResponse.json({ error: "برند نامعتبر" }, { status: 422 });
    }

    // آپلود تصاویر
    let thumbnail = "/images/default-product.png";
    const thumbnailFile = formData.get("thumbnail");
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnail = await uploadFile(thumbnailFile);
    }

    const gallery = [];
    const galleryFiles = formData.getAll("gallery");
    for (const file of galleryFiles) {
      if (file && file.size > 0) {
        gallery.push(await uploadFile(file));
      }
    }

    // slug
    const rawSlug = formData.get("slug")?.toString() || title;
    let slug = slugify(rawSlug, { lower: true, strict: true });
    
    // چک تکراری بودن slug
    let slugExists = await Product.findOne({ slug });
    if (slugExists) {
      slug = `${slug}-${randomUUID().slice(0, 8)}`;
    }

    // ساخت محصول
    const product = await Product.create({
      title,
      slug,
      sku: formData.get("sku") || undefined,
      price,
      discountedPrice: formData.get("discountedPrice")
        ? Number(formData.get("discountedPrice"))
        : null,
      discountPercent: formData.get("discountPercent")
        ? Number(formData.get("discountPercent"))
        : null,
      category,
      brand: brandId || null,
      stock: Number(formData.get("stock") || 0),
      shortDescription: formData.get("shortDescription") || "",
      longDescription: formData.get("longDescription") || "",
      thumbnail,
      gallery,
      badges: formData.get("badges") ? JSON.parse(formData.get("badges")) : [],
      variants: formData.get("variants") ? JSON.parse(formData.get("variants")) : [],
      attributes: formData.get("attributes") ? JSON.parse(formData.get("attributes")) : {},
      tags: formData.get("tags") ? JSON.parse(formData.get("tags")) : [],
      seo: {
        title: formData.get("seoTitle") || `${title} | خرید آنلاین`,
        description: formData.get("seoDescription") || formData.get("shortDescription"),
      },
    });

    return NextResponse.json(
      { success: true, message: "محصول با موفقیت ایجاد شد", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json(
      { error: error.message || "خطای سرور" },
      { status: 500 }
    );
  }
}

// ===================== GET - لیست محصولات (عمومی + فیلتر پیشرفته) =====================
export async function GET(request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 20)));

    const filter = { publishStatus: "published" }; // فقط منتشر شده‌ها

    // فیلترها
    if (searchParams.get("category")) filter.category = searchParams.get("category");
    if (searchParams.get("brand")) filter.brand = searchParams.get("brand");
    if (searchParams.get("tag")) filter.tags = searchParams.get("tag");
    if (searchParams.get("inStock")) filter.status = "in_stock";

    // جستجو
    if (searchParams.get("q")) {
      const q = searchParams.get("q");
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { shortDescription: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ];
    }

    // فیلتر قیمت (با در نظر گرفتن finalPrice)
    if (searchParams.get("min") || searchParams.get("max")) {
      filter["$expr"] = {};
      if (searchParams.get("min")) {
        filter["$expr"]["$gte"] = ["$finalPrice", Number(searchParams.get("min"))];
      }
      if (searchParams.get("max")) {
        filter["$expr"]["$lte"] = ["$finalPrice", Number(searchParams.get("max"))];
      }
    }

    const sort = {};
    const sortBy = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;

    switch (sortBy) {
      case "price": sort["finalPrice"] = order; break;
      case "sold": sort.totalSold = -1; break;
      case "rating": sort["rating.average"] = -1; break;
      case "newest": sort.createdAt = -1; break;
      default: sort.createdAt = -1;
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "title slug ancestors")
        .populate("brand", "name slug logo")
        .select("-longDescription -comments -__v")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}