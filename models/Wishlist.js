import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// جلوگیری از تکراری شدن یک محصول در لیست کاربر
wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", wishlistSchema);
