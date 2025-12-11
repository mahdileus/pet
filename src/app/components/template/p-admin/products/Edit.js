"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams(); // آیدی محصول از مسیر
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    price: 0,
    discountedPrice: 0,
    discountPercent: 0,
    category: "",
    brand: "",
    stock: 0,
    status: "AVAILABLE",
    shortDescription: "",
    longDescription: "",
    tags: [],
    thumbnail: "",
    gallery: [],
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // گرفتن محصول
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(product => {
        setFormData({
          ...formData,
          ...product,
          category: product.category?._id || "",
          brand: product.brand?._id || "",
          tags: product.tags || [],
          gallery: product.gallery || [],
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // گرفتن برندها و دسته‌ها
  useEffect(() => {
    fetch("/api/brands")
      .then(res => res.json())
      .then(data => setBrands(Array.isArray(data) ? data : data.brands || []))
      .catch(err => console.error(err));

    fetch("/api/product-categories")
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : data.categories || []))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(() => {
        router.push("/p-admin/products"); // بعد از ذخیره برگرد به لیست محصولات
      })
      .catch(err => console.error(err));
  };

  if (loading) return <p>در حال بارگذاری محصول...</p>;

  return (
    <div className="p-10 bg-white min-h-screen rounded-3xl">
      <h2 className="text-2xl font-bold mb-6">ویرایش محصول</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        {/* عنوان */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">عنوان</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
            required
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">Slug</label>
          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
            required
          />
        </div>

        {/* قیمت */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">قیمت</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
            required
          />
        </div>

        {/* دسته‌بندی */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">دسته‌بندی</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
            required
          >
            <option value="">انتخاب دسته‌بندی</option>
            {Array.isArray(categories) &&
              categories.map(c => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
          </select>
        </div>

        {/* برند */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">برند</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
          >
            <option value="">بدون برند</option>
            {Array.isArray(brands) &&
              brands.map(b => (
                <option key={b._id} value={b._id}>{b.title}</option>
              ))}
          </select>
        </div>

        {/* وضعیت */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">وضعیت</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
          >
            <option value="AVAILABLE">موجود</option>
            <option value="UNAVAILABLE">ناموجود</option>
          </select>
        </div>

        {/* توضیحات کوتاه */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">توضیحات کوتاه</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
            required
          />
        </div>

        {/* توضیحات بلند */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">توضیحات کامل</label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
            required
          />
        </div>

        {/* تصویر شاخص */}
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">تصویر شاخص</label>
          <input
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#2C00A7]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#2C00A7] text-white w-full py-3 rounded-2xl hover:bg-[#4900FF] transition-colors"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
}
