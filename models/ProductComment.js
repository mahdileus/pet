const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: { type: String, required: true },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ProductComment ||
  mongoose.model("ProductComment", commentSchema);
