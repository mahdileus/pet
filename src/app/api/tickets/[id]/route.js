import connectToDB from "@/configs/db";
import Ticket from "@/models/Ticket";
import { authUser } from "@/utils/auth-server";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const ticket = await Ticket.findOne({ _id: params.id, user: user._id })
      .populate("user", "name email")
      .populate("department", "name")
      .populate("replies.user", "name email")
      .lean();

    if (!ticket) return Response.json({ message: "Ticket not found" }, { status: 404 });

    return Response.json({ ticket });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
export async function PATCH(req, { params }) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const { message } = await req.json();
    if (!message) {
      return Response.json({ message: "Message is required" }, { status: 400 });
    }

    const ticket = await Ticket.findById(params.id);
    if (!ticket) {
      return Response.json({ message: "Ticket not found" }, { status: 404 });
    }

    ticket.replies.push({
      user: user._id,
      message,
    });

    ticket.status = "answered";
    await ticket.save();

    return Response.json({ ticket });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user || user.role !== "admin") {
      return Response.json({ message: "Admin only" }, { status: 403 });
    }

    const { status } = await req.json();

    const ticket = await Ticket.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    return Response.json({ ticket });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
