"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const categories = [
  {
    title: "غذای حیوانات",
    image: "/images/dog-food.jpg",
    items: [
      "غذای خشک سگ",
      "غذای خشک گربه",
      "غذای مرطوب گربه",
      "غذای توله‌سگ",
      "تشویقی حیوانات",
      "کنسرو و پته حیوانات",
    ],
  },
  {
    title: "لوازم جانبی",
    image: "/images/pood.jpg",
    items: [
      "قلاده و بند",
      "اسباب‌بازی حیوانات",
      "ظرف آب و غذا",
      "تشک و تخت پت",
      "لباس و پوشاک",
      "کیف حمل حیوانات",
    ],
  },
  {
    title: "بهداشت و سلامت",
    image: "/images/food.jpg",
    items: [
      "شامپو و نرم‌کننده",
      "برس و ناخن‌گیر",
      "دارو و مکمل غذایی",
      "قرص ضد انگل",
      "محصولات ضد کک و کنه",
      "اسپری خوشبوکننده بدن پت",
    ],
  },
  {
    title: "زیبایی و مراقبت",
    image: "/images/cat-food.jpg",
    items: [
      "ادکلن حیوانات",
      "روغن و سرم مو",
      "تمیزکننده چشم و گوش",
      "کرم مراقبتی پوست پت",
    ],
  },
];

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const newTimer = setTimeout(() => setIsOpen(false), 250); // ← تاخیر بسته شدن
    setTimer(newTimer);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return (
    <div
      className="hidden md:relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* دکمه اصلی */}
      <div className="bg-primary mt-4 text-white text-sm font-bold rounded-xl border-b-4 border-b-[#2C00A7] hover:opacity-90 transition-all py-1.5 px-4 flex justify-center items-center cursor-pointer select-none">
        <svg
          width="28"
          height="28"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2"
        >
          <path
            d="M16.0417 24.7917H27.7084M7.29175 17.5H27.7084M16.0417 10.2083H27.7084"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        دسته‌بندی محصولات
      </div>

      {/* منوی بزرگ */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-2xl rounded-xl p-5 w-[750px] min-h-[300px] z-50 animate-fadeIn flex transition-all duration-100 ease-out">
          {/* ستون ۱: دسته‌بندی‌ها */}
          <div className="w-1/4 border-l border-gray-200 pr-3">
            {categories.map((cat, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveMenu(index)}
                className={`p-2 text-sm font-bold cursor-pointer rounded-md transition-all ${
                  activeMenu === index
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.title}
              </div>
            ))}
          </div>

          {/* ستون ۲: آیتم‌ها */}
          <div className="w-2/4 px-4">
            <ul className="grid grid-cols-2 gap-2 animate-fadeIn">
              {categories[activeMenu].items.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 hover:text-primary transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ستون ۳: تصویر دسته‌بندی */}
          <div className="w-1/4 pl-3 flex justify-center items-center">
            <div className="w-[250px] h-[250px] relative overflow-hidden rounded-xl shadow-md">
              <Image
                src={categories[activeMenu].image}
                alt={categories[activeMenu].title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
