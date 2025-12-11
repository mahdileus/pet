import connectToDB from "@/configs/db";
import ProductComment from "@/models/ProductComment";
import { authUser } from "@/utils/auth-server";

export async function POST(req) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const comment = await ProductComment.create({
      product: body.product,
      user: user._id,
      text: body.text,
      rating: body.rating || 5,
    });

    return Response.json(comment, { status: 201 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();

    const comments = await ProductComment.find({})
      .populate("user", "name image")
      .populate("product", "title")
      .lean();

    return Response.json(comments);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
