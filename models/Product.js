const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    slug: { type: String, required: true, unique: true, lowercase: true },

    price: { type: Number, required: true },

    discountedPrice: { type: Number, default: null },
    discountPercent: { type: Number, default: null },

    // دسته‌بندی محصول
    category: {
      type: mongoose.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },

    // برند (ریلیشن واقعی)
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      default: null,
    },

    stock: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE"],
      default: "AVAILABLE",
    },

    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },

    score: { type: Number, default: 5 },

    tags: {
      type: [String],
      default: [],
    },

    thumbnail: {
      type: String,
      default: "/images/default-product.png",
    },

    gallery: {
      type: [String],
      default: [],
    },

    variants: [
      {
        name: String,
        price: Number,
        stock: Number,
        sku: String,
        image: String,
      },
    ],

    // ویژگی‌های داینامیک
    attributes: {
      type: Map,
      of: String,
      default: {},
    },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ProductComment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual برای قیمت نهایی
productSchema.virtual("finalPrice").get(function () {
  if (this.discountedPrice) return this.discountedPrice;
  if (this.discountPercent)
    return this.price - (this.price * this.discountPercent) / 100;
  return this.price;
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
