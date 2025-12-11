import connectToDB from "@/configs/db";
import Discount from "@/models/Discount";

// GET → دریافت یک کوپن
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const discount = await Discount.findById(params.id);

    if (!discount)
      return Response.json(
        { success: false, message: "Discount not found" },
        { status: 404 }
      );

    return Response.json({ success: true, data: discount });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

// PUT → آپدیت کوپن
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const body = await req.json();

    const updated = await Discount.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updated)
      return Response.json(
        { success: false, message: "Discount not found" },
        { status: 404 }
      );

    return Response.json({ success: true, data: updated });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 400 });
  }
}

// DELETE → حذف کوپن
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const deleted = await Discount.findByIdAndDelete(params.id);

    if (!deleted)
      return Response.json(
        { success: false, message: "Discount not found" },
        { status: 404 }
      );

    return Response.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
