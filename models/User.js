const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "کاربر سایت" },

    phone: {
      type: String,
      required: true,
      unique: true,
    },
    idCard: {
      type: String,
      required: false,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true, // ایمیل اختیاری + یونیک انحصاری
    },
    // در مدل User
    addresses: [
      { type: mongoose.Types.ObjectId, ref: "Address" }
    ],

    password: {
      type: String,
      select: false,
    },

    avatar: {
      type: String,
      default: "/images/default-avatar.png",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN", "MODERATOR"],
      default: "USER",
    },

    purchasedItems: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
        refreshTokens: [
      {
        token: { type: String },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date },
      },
    ],

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ProductComment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
