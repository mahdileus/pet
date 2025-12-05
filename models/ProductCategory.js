const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    // دسته اصلی: آنلاین‌شاپ یا دراگ‌استور
    mainCategory: {
      type: String,
      enum: ["onlineshop", "drugstore"],
      required: true,
    },

    // دسته بندی والد (برای دسته‌های تو در تو)
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "ProductCategory",
      default: null,
    },

    thumbnail: { type: String, default: "/images/default-category.png" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", categorySchema);
