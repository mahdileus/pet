"use client";
import { BsBalloonHeart } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const discount = product.discountPercent || 0;
  const price = product.price || 0;
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="overflow-hidden w-full max-w-sm h-[380px] flex flex-col justify-between">
      {/* تصویر محصول + درصد تخفیف + دکمه لایک */}
      <div className="relative w-full h-52 rounded-3xl border bg-white border-gray-100 overflow-hidden shrink-0">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
          />
        </Link>

        {/* درصد تخفیف سمت راست بالا */}
        {discount > 0 && (
          <span className="absolute top-4 right-0 bg-secondery text-white text-xs font-medium rounded-l-full px-2 py-1 shadow-md">
            {discount}٪
          </span>
        )}

        {/* آیکون لایک سمت چپ بالا */}
        <div className="absolute top-2 left-2 z-10">
          <BsBalloonHeart size={24} className="text-secondery" />
        </div>
      </div>

      {/* محتوا */}
      <div className="p-4 flex flex-col justify-between flex-1 text-right">
        {/* عنوان لینک‌دار با ارتفاع ثابت */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-text text-base font-medium hover:text-secondery transition line-clamp-2 h-12">
            {product.title}
          </h3>
        </Link>

        {/* بخش قیمت و دکمه */}
        <div className="flex justify-between items-center mt-3">
          {/* قیمت‌ها */}
          <div className="flex flex-col items-start">
            <span className="text-green-600 font-bold text-lg">
              {discountedPrice.toLocaleString()} تومان
            </span>
            {discount > 0 && (
              <span className="line-through text-red-400 font-bold text-sm">
                {price.toLocaleString()} تومان
              </span>
            )}
          </div>

          {/* خط جداکننده */}
          <div className="w-px h-10 bg-gray-900 mx-2"></div>

          {/* دکمه مشاهده */}
          <Link
            href={`/products/${product.slug}`}
            className="flex justify-center items-center py-2 px-5 transition-all rounded-full bg-green-500 border-b-4 border-b-green-600 hover:border-b-[#6e7e9f91] hover:bg-secondery"
          >
            <p className="font-yekan-bakh text-sm font-medium text-white whitespace-nowrap">
              مشاهده
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
