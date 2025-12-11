// models/Product.js
import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // مثلاً "قرمز - L" یا "128GB"
    sku: { type: String, unique: true, sparse: true },
    price: { type: Number }, // قیمت اختصاصی واریانت (اختیاری)
    stock: { type: Number, default: 0 },
    image: { type: String }, // عکس اختصاصی واریانت
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    // اسلاگ فقط دستی — هیچ تولید خودکاری نداره!
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/g, "اسلاگ فقط حروف کوچک، عدد و خط تیره قبول می‌کند"],
    },

    sku: { type: String, unique: true, sparse: true },

    // قیمت و تخفیف
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    discountPercent: { type: Number, min: 0, max: 99 },

    // روابط
    category: {
      type: mongoose.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
      index: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      index: true,
    },

    // موجودی و وضعیت
    stock: { type: Number, default: 0 },
    totalSold: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["in_stock", "out_of_stock", "on_backorder"],
      default: "out_of_stock",
    },

    publishStatus: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
      lowercase: true,
    },

    // امتیاز
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },

    // توضیحات
    shortDescription: { type: String, required: true, maxlength: 500 },
    longDescription: { type: String, required: true },

    // تصاویر
    thumbnail: { type: String, default: "/images/default-product.png" },
    gallery: [{ type: String }],

    // بج‌ها
    badges: {
      type: [String],
      enum: ["bestseller", "new", "special_offer", "limited", "hot"],
      default: [],
    },

    // واریانت‌ها
    variants: [variantSchema],

    // ویژگی‌ها (رنگ، سایز، جنس و ...)
    attributes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // تگ‌ها
    tags: [{ type: String, index: true }],

    // نظرات
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ProductComment",
      },
    ],

    // سئو
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },

    // آیا محصول متغیر داره؟
    isVariable: { type: Boolean, default: false },

    // محدوده قیمت (برای محصول متغیر)
    priceRange: {
      min: Number,
      max: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: قیمت نهایی
productSchema.virtual("finalPrice").get(function () {
  if (this.discountedPrice !== null && this.discountedPrice !== undefined) {
    return this.discountedPrice;
  }
  if (this.discountPercent > 0) {
    return Math.round(this.price * (1 - this.discountPercent / 100));
  }
  return this.price;
});

// Virtual: آیا تخفیف داره؟
productSchema.virtual("hasDiscount").get(function () {
  return (
    this.discountPercent > 0 ||
    (this.discountedPrice !== null && this.discountedPrice < this.price)
  );
});

// ایندکس‌های بهینه (بدون تکراری)
productSchema.index({ publishStatus: 1, status: 1 });
productSchema.index({ category: 1, publishStatus: 1 });
productSchema.index({ "rating.average": -1 });
productSchema.index({ totalSold: -1 });

// آپدیت خودکار وضعیت موجودی و قیمت
productSchema.pre("save", function (next) {
  // جمع موجودی کل (پایه + واریانت‌ها)
  const totalStock =
    this.stock +
    (this.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0);

  this.status = totalStock > 0 ? "in_stock" : "out_of_stock";

  // تشخیص محصول متغیر
  this.isVariable = this.variants && this.variants.length > 0;

  // محدوده قیمت برای محصول متغیر
  if (this.isVariable && this.variants.length > 0) {
    const prices = this.variants
      .filter((v) => v.price > 0)
      .map((v) => v.price || this.price);
    if (prices.length > 0) {
      this.priceRange = {
        min: Math.min(this.price, ...prices),
        max: Math.max(this.price, ...prices),
      };
    }
  }

  next();
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;