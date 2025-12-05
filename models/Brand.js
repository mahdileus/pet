const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String, default: "/images/default-brand.png" },
    description: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

// Products of this brand (Virtual)
brandSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "brand",
});

module.exports =
  mongoose.models.Brand || mongoose.model("Brand", brandSchema);
