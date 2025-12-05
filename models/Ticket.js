import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "answered", "closed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    replies: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
