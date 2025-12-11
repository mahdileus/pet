"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md'; 
import { useState } from "react";

export default function AdminProducts({ product }) {
  const router = useRouter();

  // state برای کنترل نمایش محصول
  const [visible, setVisible] = useState(true);

  const removeCourse = async () => {
    const confirm = await swal({
      title: "آیا از حذف مطمئنی؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
      dangerMode: true,
    });

    if (confirm) {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        swal({
          title:"محصول با موفقیت حذف شد",
          icon:"success",
          buttons:"فهمیدم"
        });

        // بدون refresh صفحه، مستقیماً محصول رو مخفی کن
        setVisible(false);
      }
    }
  };

  const handleEditClick = () => {
    router.push(`/p-admin/products/edit/${product._id}`);
  };

  // اگر محصول حذف شده، چیزی نمایش داده نشه
  if (!visible) return null;

  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4 mb-4">
      {/* تصویر محصول */}
      <div className="w-32 h-32 shrink-0">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* اطلاعات محصول */}
      <div className="flex flex-col justify-between pr-4 w-full">
        <div className="flex justify-between ">
          <div>
            <Link
              href={`/products/${product.slug}`}
              className="text-lg font-semibold text-secondery hover:underline text-right"
            >
              {product.title}
            </Link>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-red-400 hover:text-red-500 text-2xl cursor-pointer" onClick={removeCourse}>
              <MdDelete/>
            </span>
            <span className="text-secondery hover:text-secondery/90 text-2xl cursor-pointer" onClick={handleEditClick}>
              <MdModeEdit />
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1 text-right line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="text-left text-secondery font-bold mt-2">
          {product.price?.toLocaleString()} تومان
        </div>
      </div>
    </div>
  );
}
