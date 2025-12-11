// components/admin/CategoriesBox.jsx
"use client";

import Image from "next/image";
import {
  CiTrash,
  CiEdit,
  CiCircleChevDown,
  CiCircleChevRight,
  CiFolderOn,
} from "react-icons/ci";

export default function CategoriesBox({
  cat,
  level = 0,
  expanded = {},
  toggleExpand,
  onDelete,
  onEdit,
  search = "",
}) {
  const hasChildren = cat.children && cat.children.length > 0;
  const isExpanded = expanded[cat._id];

  // جستجوی هوشمند (والد هم نشون بده اگر فرزند شامل سرچ باشه)
  const shouldRender = () => {
    if (!search) return true;
    const lower = search.toLowerCase();

    if (cat.title.toLowerCase().includes(lower) || cat.slug.toLowerCase().includes(lower))
      return true;

    if (hasChildren) {
      return cat.children.some(child =>
        child.title.toLowerCase().includes(lower) ||
        child.slug.toLowerCase().includes(lower) ||
        (child.children && child.children.some(grand => 
          grand.title.toLowerCase().includes(lower) || 
          grand.slug.toLowerCase().includes(lower)
        ))
      );
    }
    return false;
  };

  if (!shouldRender()) return null;

  return (
    <div>
      <div
        className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all cursor-pointer group hover:bg-gray-50 ${
          level > 0 ? "border-r-4 border-r-indigo-500" : ""
        }`}
        style={{ paddingRight: `${level * 32 + 16}px` }}
        onClick={(e) => {
          if (hasChildren) {
            e.stopPropagation();
            toggleExpand(cat._id);
          }
        }}
      >
        {/* آیکون باز/بسته */}
        {hasChildren ? (
          isExpanded ? (
            <CiCircleChevDown size={22} className="text-gray-600" />
          ) : (
            <CiCircleChevRight size={22} className="text-gray-600" />
          )
        ) : (
          <div className="w-6" />
        )}

        {/* تصویر */}
        {cat.thumbnail && cat.thumbnail !== "/images/default-category.png" ? (
          <Image
            src={cat.thumbnail}
            alt={cat.title}
            width={50}
            height={50}
            className="rounded-lg object-cover border shadow-sm"
          />
        ) : (
          <CiFolderOn size={40} className="text-gray-400" />
        )}

        {/* اطلاعات */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-secondery truncate">{cat.title}</div>
          <div className="text-xs text-gray-500 truncate">
            /{cat.slug} • {cat.mainCategory}
            {cat.productCount > 0 && ` • ${cat.productCount} محصول`}
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(cat);
            }}
            className="text-secondery cursor-pointer"
            title="ویرایش"
          >
            <CiEdit size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(cat._id);
            }}
            className="text-red-600 hover:text-red-800 cursor-pointer"
            title="حذف"
          >
            <CiTrash size={24} />
          </button>
        </div>
      </div>

      {/* زیرمجموعه‌ها */}
      {hasChildren && isExpanded && (
        <div className="border-r-2 border-r-gray-300 ml-8 mt-1">
          {cat.children.map((child) => (
            <CategoriesBox
              key={child._id}
              cat={child}
              level={level + 1}
              expanded={expanded}
              toggleExpand={toggleExpand}
              onDelete={onDelete}
              onEdit={onEdit}
              search={search}
            />
          ))}
        </div>
      )}
    </div>
  );
}