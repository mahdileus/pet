// components/admin/BrandBox.jsx
"use client";

import Image from "next/image";
import { CiTrash, CiEdit } from "react-icons/ci";

export default function BrandBox({ brand, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 group">
      {/* لوگو + اطلاعات */}
      <div className="flex items-center gap-4">
        {brand.logo && brand.logo !== "/images/default-brand.png" ? (
          <Image
            src={brand.logo}
            alt={brand.name}
            width={60}
            height={60}
            className="rounded-lg object-contain border shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xs">بدون لوگو</span>
          </div>
        )}

        <div>
          <h3 className="font-bold text-gray-800 text-lg">{brand.name}</h3>
          <p className="text-sm text-gray-500">{brand.website || "وبسایتی ثبت نشده"}</p>
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onEdit(brand)}
          className="text-secondery cursor-pointer hover:text-blue-800 transition"
          title="ویرایش برند"
        >
          <CiEdit size={22} />
        </button>
        <button
          onClick={() => onDelete(brand._id)}
          className="text-red-600 cursor-pointer hover:text-red-800 transition"
          title="حذف برند"
        >
          <CiTrash size={22} />
        </button>
      </div>
    </div>
  );
}