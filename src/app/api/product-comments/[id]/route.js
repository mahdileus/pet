import connectToDB from "@/configs/db";
import ProductComment from "@/models/ProductComment";

export async function GET(req, { params }) {
  await connectToDB();
  const comment = await ProductComment.findById(params.id)
    .populate("user", "name image")
    .populate("product", "title");
  return Response.json(comment);
}

export async function DELETE(req, { params }) {
  await connectToDB();
  await ProductComment.findByIdAndDelete(params.id);
  return Response.json({ message: "Comment deleted" });
}

// تأیید کامنت
export async function PATCH(req, { params }) {
  try {
    await connectToDB();
    const { approved } = await req.json();

    const updated = await ProductComment.findByIdAndUpdate(
      params.id,
      { approved },
      { new: true }
    );

    return Response.json(updated);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
