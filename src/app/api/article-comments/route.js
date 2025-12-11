import connectToDB from "@/configs/db";
import ArticleComment from "@/models/ArticleComment";
import { authUser } from "@/utils/auth-server";

// POST /api/article-comments
export async function POST(req) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const comment = await ArticleComment.create({
      user: user._id,
      article: body.article,
      content: body.content,
    });

    return Response.json(comment, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// GET /api/article-comments
export async function GET() {
  try {
    await connectToDB();
    const comments = await ArticleComment.find({})
      .populate("user", "name image")
      .populate("article", "title")
      .lean();

    return Response.json(comments);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
