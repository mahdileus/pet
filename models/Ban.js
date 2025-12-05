const mongoose = require("mongoose");

const banSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    reason: {
      type: String,
      default: "No reason provided",
      trim: true,
    },
    expiresAt: {
      type: Date,
      default: null, // null یعنی بن دائمی
    },
  },
  {
    timestamps: true,
  }
);

// ایندکس برای سرعت جستجو و جلوگیری از رکوردهای تکراری
banSchema.index({ phone: 1 }, { unique: true, sparse: true });
banSchema.index({ email: 1 }, { unique: true, sparse: true });

// Validator برای اطمینان که حداقل یکی از phone یا email پر باشد
banSchema.pre("validate", function (next) {
  if (!this.phone && !this.email) {
    next(new Error("You must provide at least a phone number or email to ban."));
  } else {
    next();
  }
});

const Ban = mongoose.models.Ban || mongoose.model("Ban", banSchema);

module.exports = Ban;
