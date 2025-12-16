// components/product/ProductHeader.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { CiShoppingCart, CiHeart, CiStar } from "react-icons/ci";
import ProductGallery from "./ProductSlider";

export default function ProductHeader({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find(v => v.isDefault) || product.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  // قیمت نهایی با توجه به واریانت
  const basePrice = selectedVariant?.price || product.price;
  const finalPrice = product.discountedPrice ||
    (product.discountPercent > 0
      ? Math.round(basePrice * (1 - product.discountPercent / 100))
      : basePrice
    );
  const totalStock = product.stock + (selectedVariant?.stock || 0);

  const hasDiscount = product.discountPercent > 0 || product.discountedPrice;

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mt-8">
      <div className="flex flex-col lg:flex-row gap-10 p-5 lg:p-10">



        {/* محتوا – سمت چپ */}
        <div className="w-full order-2 lg:order-2 flex flex-col gap-7">

          {/* عنوان + قلب */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-secondery leading-snug">
              {product.title}
            </h1>
            <button className="text-red-500 hover:text-red-600 mt-1">
              <CiHeart size={30} />
            </button>
          </div>

          {/* بج‌ها */}
          {product.badges?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 rounded-full text-xs font-bold text-white ${badge === "new" ? "bg-blue-600"
                    : badge === "bestseller" ? "bg-orange-600"
                      : badge === "special_offer" ? "bg-purple-600"
                        : badge === "limited" ? "bg-red-600"
                          : "bg-green-600"
                    }`}
                >
                  {badge === "new" ? "جدید"
                    : badge === "bestseller" ? "پرفروش"
                      : badge === "special_offer" ? "پیشنهاد ویژه"
                        : badge === "limited" ? "محدود"
                          : "داغ"}
                </span>
              ))}
            </div>
          )}

          {/* امتیاز */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <CiStar
                  key={i}
                  size={22}
                  className={i < Math.floor(product.rating?.average || 0)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({product.rating?.count || 0} نظر)
            </span>
          </div>

          {/* واریانت‌ها */}
          {product.isVariable && product.variants?.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-3">انتخاب گزینه</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-2 rounded-xl border-2 text-sm font-medium transition
                  ${selectedVariant?.name === variant.name
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-300 hover:border-indigo-400"
                      }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* قیمت */}
          <div className="bg-green-50 border border-green-500 rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                {hasDiscount && (
                  <span className="line-through text-gray-400 text-lg">
                    {basePrice.toLocaleString()} تومان
                  </span>
                )}
                <div className="text-3xl lg:text-4xl font-bold text-primary mt-2">
                  {finalPrice.toLocaleString()} تومان
                </div>
              </div>

              {hasDiscount && (
                <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  {product.discountPercent || Math.round((1 - finalPrice / basePrice) * 100)}٪ تخفیف
                </div>
              )}
            </div>
          </div>

          {/* موجودی */}
          <div className="flex gap-2 text-sm">
            <span className="font-medium">موجودی:</span>
            <span className={totalStock > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {totalStock > 0 ? `${totalStock} عدد موجود` : "ناموجود"}
            </span>
          </div>

          {/* تعداد + افزودن به سبد */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border-2 border-green-500 rounded-xl w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 text-lg"
              >
                −
              </button>
              <span className="px-6 font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 text-lg"
              >
                +
              </button>
            </div>

            <button className="flex-1 rounded-3xl px-5 bg-primary border-b-[#2C00A7] border-b-8 hover:opacity-90 hover:shadow-md cursor-pointer transition-all duration-300 font-bold text-lg text-white flex items-center justify-center gap-3">
              <CiShoppingCart size={28} />
              افزودن به سبد خرید
            </button>
          </div>

          {/* توضیح کوتاه */}
          <div className="pt-5 border-t">
            <h3 className="font-bold text-lg mb-2">توضیح کوتاه</h3>
            <div
              className="text-gray-600 leading-7 text-sm lg:text-base"
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
            />
          </div>
        </div>
        {/* گالری – سمت راست */}
        <div className="w-full order-1 border-green-500 lg:order-1 flex justify-center">
          <div className="w-full max-w-[520px]">
            <ProductGallery
              images={[product.thumbnail, ...(product.gallery || [])]}
              title={product.title}
            />
          </div>
        </div>
      </div>
    </div>

  );
}