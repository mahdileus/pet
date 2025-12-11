import connectToDB from "@/configs/db";
import Ticket from "@/models/Ticket";
import { authUser } from "@/utils/auth-server";

export async function POST(req) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, body: text, department, priority } = body;

    if (!title || !text || !department) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    const ticket = await Ticket.create({
      title,
      body: text,
      department,
      priority: priority || "medium",
      user: user._id,
    });

    return Response.json({ ticket }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tickets = await Ticket.find({ user: user._id })
      .populate("department", "name")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ tickets }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
