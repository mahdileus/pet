const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // هر کوپن باید یکتا باشه
      trim: true,
      uppercase: true, // برای یکنواختی
    },
    percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // درصد تخفیف بین 0 تا 100
    },
    maxUse: {
      type: Number,
      required: true, // حداکثر تعداد دفعات استفاده
      min: 1,
    },
    uses: {
      type: Number,
      default: 0, // تعداد استفاده فعلی
      min: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false, // اگر کوپن محدود به یک کاربر باشه
    },
    expiresAt: {
      type: Date, // تاریخ انقضا کوپن
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true, // کوپن فعال/غیرفعال
    },
    minCartAmount: {
      type: Number,
      default: 0, // حداقل مبلغ سبد خرید برای اعمال کوپن
    },
    applicableCategories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ProductCategory", // می‌تونه محدود به دسته‌بندی خاص باشه
      },
    ],
    applicableProducts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product", // می‌تونه محدود به محصول خاص باشه
      },
    ],
  },
  {
    timestamps: true, // createdAt و updatedAt خودکار
  }
);

// Virtual برای بررسی اعتبار کوپن
discountSchema.virtual("isValid").get(function () {
  const now = new Date();
  if (!this.isActive) return false;
  if (this.expiresAt && this.expiresAt < now) return false;
  if (this.maxUse && this.uses >= this.maxUse) return false;
  return true;
});

const Discount =
  mongoose.models.Discount || mongoose.model("Discount", discountSchema);

module.exports = Discount;
