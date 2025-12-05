const mongoose = require("mongoose");

const userProductSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  order: { type: mongoose.Types.ObjectId, ref: "Order", required: true },
  quantity: { type: Number, default: 1 },
  pricePaid: { type: Number, required: true },
  purchasedAt: { type: Date, default: Date.now },
});

const UserProduct =
  mongoose.models.UserProduct || mongoose.model("UserProduct", userProductSchema);

module.exports = UserProduct;
