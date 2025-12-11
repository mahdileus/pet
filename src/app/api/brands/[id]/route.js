// app/api/admin/brands/[id]/route.js
import connectToDB from "@/configs/db";
import Brand from "@/models/Brand";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const { id } = await params;

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return NextResponse.json({ message: "برند یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "برند حذف شد" });
  } catch (err) {
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDB();
    const { id } = await params;
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const website = formData.get("website")?.toString().trim() || null;
    const logoFile = formData.get("logo");
    const slug = formData.get("slug")?.toString().trim();

    if (!name) {
      return NextResponse.json({ message: "نام برند الزامی است" }, { status: 400 });
    }

    const updateData = { name, website };
    if (logoFile && logoFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "brands");
      await mkdir(uploadDir, { recursive: true });

      const buffer = Buffer.from(await logoFile.arrayBuffer());
      const filename = `brand-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${path.extname(logoFile.name || ".png")}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);

      updateData.logo = `/uploads/brands/${filename}`;
    }

    const updated = await Brand.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "برند یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Brand Update Error:", err);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}