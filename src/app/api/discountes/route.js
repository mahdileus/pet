import connectToDB from "@/configs/db";
import Discount from "@/models/Discount";

// GET → دریافت تمام تخفیف‌ها
export async function GET() {
  try {
    await connectToDB();
    const discounts = await Discount.find({}).sort({ createdAt: -1 });
    return Response.json({ success: true, data: discounts });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

// POST → ایجاد کوپن جدید
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    const newDiscount = await Discount.create(body);

    return Response.json(
      { success: true, data: newDiscount },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 400 });
  }
}
