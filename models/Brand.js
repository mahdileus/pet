import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // لوگو و بنر
    logo: {
      type: String,
      default: "/images/default-brand.png",
    },
    banner: {
      type: String,
      default: null,
    },

    // توضیحات
    description: { type: String, maxlength: 1000 },
    shortDescription: { type: String, maxlength: 300 },

    // وبسایت و شبکه‌های اجتماعی
    website: {
      type: String,
      validate: {
        validator: (v) => !v || /^https?:\/\//i.test(v),
        message: "آدرس وبسایت باید با http یا https شروع شود",
      },
    },
    socials: {
      instagram: String,
      telegram: String,
      whatsapp: String,
      twitter: String,
    },

    // وضعیت نمایش
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    // ترتیب نمایش در لیست برندها
    order: {
      type: Number,
      default: 0,
    },

    // آیا در صفحه اصلی یا فیلتر نمایش داده شود؟
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    // تعداد محصولات این برند (آپدیت خودکار یا virtual)
    productCount: {
      type: Number,
      default: 0,
    },

    // سئوی اختصاصی برای صفحه برند
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
      ogImage: { type: String }, // برای شتاب‌دهنده‌های سوشال
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: محصولات این برند
brandSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "brand",
  justOne: false,
});

// Virtual: url کامل صفحه برند
brandSchema.virtual("url").get(function () {
  return `/shop/brand/${this.slug}`;
});

// ایندکس‌های بهینه برای فیلتر و سرچ
brandSchema.index({ isActive: 1, featured: 1, order: 1 });
brandSchema.index({ name: "text" }); // برای جستجوی نام برند

// پیش‌پردازش قبل از ذخیره
brandSchema.pre("save", function (next) {
  // اگر seo.title خالی بود، از نام برند استفاده کن
  if (!this.seo?.title) {
    this.seo = this.seo || {};
    this.seo.title = `${this.name} | خرید آنلاین محصولات اصل ${this.name}`;
  }
  if (!this.seo?.description && this.shortDescription) {
    this.seo.description = this.shortDescription;
  }

  next();
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default Brand;