const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // لوکیشن از طریق نقشه
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },

  // آدرسی که مپ حدس زده
  autoAddress: { type: String },

  // ورودی دستی
  manual: {
    street: { type: String },
    plaque: { type: String },
    unit: { type: String },
    floor: { type: String },
    postalCode: { type: String },
    description: { type: String },
  },

  // آدرس فعال کاربر
  isDefault: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.models.Address || mongoose.model("Address", addressSchema);
