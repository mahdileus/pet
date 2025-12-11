import connectToDB from "@/configs/db";
import ArticleComment from "@/models/ArticleComment";
import { authUser } from "@/utils/auth-server";

export async function GET(req, { params }) {
  await connectToDB();
  const comment = await ArticleComment.findById(params.id)
    .populate("user", "name image")
    .populate("replies");
  return Response.json(comment);
}

// DELETE /api/article-comments/:id
export async function DELETE(req, { params }) {
  await connectToDB();
  await ArticleComment.findByIdAndDelete(params.id);
  return Response.json({ message: "Comment deleted" });
}

// PATCH برای approve یا reply
export async function PATCH(req, { params }) {
  try {
    await connectToDB();
    const body = await req.json();

    // تأیید کامنت
    if (body.approve !== undefined) {
      const updated = await ArticleComment.findByIdAndUpdate(
        params.id,
        { isApproved: body.approve },
        { new: true }
      );
      return Response.json(updated);
    }

    // ریپلای
    if (body.reply) {
      const reply = await ArticleComment.create({
        user: body.user,
        article: body.article,
        content: body.reply,
      });

      await ArticleComment.findByIdAndUpdate(params.id, {
        $push: { replies: reply._id },
      });

      return Response.json(reply);
    }

    return Response.json({ message: "Invalid action" }, { status: 400 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
