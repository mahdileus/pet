import { NextResponse } from "next/server";
import Department from "@/models/Department";
import connectToDB from "@/configs/db";

export async function GET() {
  try {
    await connectToDB();
    const list = await Department.find();
    return NextResponse.json({ ok: true, list });
  } catch (err) {
    return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ ok: false, message: "عنوان الزامی است" }, { status: 400 });
    }

    const created = await Department.create({ title });

    return NextResponse.json({ ok: true, department: created });
  } catch (err) {
    return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
  }
}
