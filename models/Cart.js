import mongoose from "mongoose";
require('./Product');
require('./User');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // هر کاربر فقط یک سبد داشته باشه
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true }, // ذخیره نام محصول برای سرعت دسترسی
        price: { type: Number, required: true }, // قیمت فعلی محصول
        quantity: { type: Number, default: 1, min: 1 },
        thumbnail: { type: String }, // تصویر محصول
      }
    ],
    discount: {
      code: { type: String, default: null },
      percent: { type: Number, default: 0 },
      amount: { type: Number, default: 0 }, // مبلغ تخفیف اعمال شده
    },
    totalPrice: { type: Number, default: 0 }, // جمع کل بعد از تخفیف
  },
  { timestamps: true }
);

// Virtual برای محاسبه جمع کل اتوماتیک
cartSchema.virtual("calculatedTotal").get(function () {
  let total = 0;
  this.items.forEach(item => {
    total += item.price * item.quantity;
  });
  if (this.discount && this.discount.percent > 0) {
    total = total - (total * this.discount.percent) / 100;
  }
  return total;
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
