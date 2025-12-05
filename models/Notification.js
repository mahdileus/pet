const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    type: { 
      type: String, 
      enum: ["order", "ticket", "discount", "general"], 
      default: "general" 
    },
    message: { 
      type: String, 
      required: true 
    },
    isRead: { 
      type: Boolean, 
      default: false 
    },
    link: { 
      type: String, 
      default: null // می‌تونه لینک به سفارش یا تیکت باشه
    },
  },
  { timestamps: true }
);

const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

module.exports = Notification;
