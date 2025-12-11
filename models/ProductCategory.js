// models/ProductCategory.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    
    // فقط دستی — هیچ تولید خودکاری نداره
    slug: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      trim: true,
      // فقط حروف، عدد و خط تیره قبول کنه
      match: [/^[a-z0-9-]+$/g, "اسلاگ فقط می‌تونه حروف کوچک، عدد و خط تیره داشته باشه"]
    },

    mainCategory: {
      type: String,
      enum: ["onlineshop", "drugstore"],
      required: true,
      index: true,
    },

    parent: {
      type: mongoose.Types.ObjectId,
      ref: "ProductCategory",
      default: null,
      index: true,
    },

    ancestors: [
      {
        _id: { type: mongoose.Types.ObjectId, ref: "ProductCategory" },
        title: String,
        slug: String,
      },
    ],

    thumbnail: {
      type: String,
      default: "/images/default-category.png",
    },

    banner: { type: String },

    isActive: { type: Boolean, default: true, index: true },

    order: { type: Number, default: 0 },

    description: { type: String },

    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },

    productCount: { type: Number, default: 0 },

    showInMenu: { type: Boolean, default: true },

    icon: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ایندکس‌ها (فقط یکبار!)
categorySchema.index({ slug: 1 }, { unique: true }); // این جایگزین خط قبلی شد
categorySchema.index({ parent: 1, isActive: 1 });
categorySchema.index({ mainCategory: 1, isActive: 1, showInMenu: 1 });
categorySchema.index({ ancestors: 1 });

// virtual: سطح دسته‌بندی
categorySchema.virtual("level").get(function () {
  return this.ancestors ? this.ancestors.length : 0;
});

// virtual: تعداد فرزندان
categorySchema.virtual("hasChildren", {
  ref: "ProductCategory",
  localField: "_id",
  foreignField: "parent",
  count: true,
});

// آپدیت ancestors
categorySchema.pre("save", async function (next) {
  if (this.isModified("parent") || this.isNew) {
    if (!this.parent) {
      this.ancestors = [];
    } else {
      try {
        const parentCat = await this.model("ProductCategory").findById(this.parent);
        if (parentCat) {
          this.ancestors = [
            ...parentCat.ancestors,
            {
              _id: parentCat._id,
              title: parentCat.title,
              slug: parentCat.slug,
            },
          ];
        }
      } catch (err) {
        return next(err);
      }
    }
  }
  next();
});

const ProductCategory =
  mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", categorySchema);

export default ProductCategory;