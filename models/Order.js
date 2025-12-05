const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },

    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 },
        thumbnail: String,
      },
    ],

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    payment: {
      gateway: { type: String },
      authority: { type: String },
      refId: { type: String },
      paidAt: { type: Date },
    },

    // Snapshot آدرس (برای اینکه بعداً تغییر نکند)
    shipping: {
      address: { type: String, required: true },
      city: { type: String },
      postalCode: { type: String },
      phone: { type: String },
      deliveryMethod: { type: String },
      trackingNumber: { type: String }, // کد پیگیری
    },

    coupon: {
      code: { type: String },
      discount: { type: Number },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
module.exports = Order;
