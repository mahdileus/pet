// components/admin/CategoriesManager.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import swal from "sweetalert";
import CategoriesBox from "./CategoriesBox";
import { CiSquarePlus, CiSearch, CiImageOn } from "react-icons/ci";

export default function CategoriesManager() {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({});

  const [form, setForm] = useState({
    title: "",
    slug: "",
    mainCategory: "onlineshop",
    parent: "",
    thumbnail: null,
    thumbnailPreview: null,
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.success) setTree(data.tree || []);
    } catch {
      swal("خطا!", "بارگذاری دسته‌بندی‌ها با مشکل مواجه شد", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files[0]) {
      setForm({
        ...form,
        thumbnail: files[0],
        thumbnailPreview: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      swal("هشدار", "عنوان و اسلاگ الزامی هستند", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("mainCategory", form.mainCategory);
    if (form.parent) formData.append("parent", form.parent);
    if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

    const url = isEditMode
      ? `/api/categories/${editingCategory._id}`
      : "/api/categories";

    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "خطای سرور");
      }

      resetForm();
      setShowForm(false);
      setIsEditMode(false);
      setEditingCategory(null);
      await fetchCategories();
      swal("موفقیت!", isEditMode ? "ویرایش شد" : "دسته‌بندی اضافه شد", "success");
    } catch (error) {
      swal("خطا!", "عملیات ناموفق بود", "error");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      mainCategory: "onlineshop",
      parent: "",
      thumbnail: null,
      thumbnailPreview: null,
    });
  };

  const handleEdit = (cat) => {
    setForm({
      title: cat.title,
      slug: cat.slug,
      mainCategory: cat.mainCategory,
      parent: cat.parent || "",
      thumbnail: null,
      thumbnailPreview: cat.thumbnail,
    });
    setEditingCategory(cat);
    setIsEditMode(true);
    setShowForm(true);
  };

  const deleteCategory = async (id) => {
    const isConfirm = await swal({
      title: "مطمئنی؟",
      text: "این دسته‌بندی و زیرمجموعه‌ها حذف می‌شوند!",
      icon: "warning",
      buttons: {
        cancel: {
          text: "لغو",
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "بله، حذف کن",
          value: true,
          visible: true,
          closeModal: false, // برای شبیه‌سازی showLoaderOnConfirm
        },
      },
      dangerMode: true,
    });

    if (!isConfirm) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("خطا");
      await res.json();

      fetchCategories();

      await swal({
        title: "حذف شد!",
        text: "دسته‌بندی با موفقیت حذف شد",
        icon: "success",
        button: "باشه",
      });
    } catch (err) {
      swal("خطا!", "حذف ناموفق بود", "error");
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen container">
      <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-secondery text-white p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">مدیریت دسته‌بندی‌ها</h1>
            <button
              onClick={() => {
                resetForm();
                setIsEditMode(false);
                setEditingCategory(null);
                setShowForm(true);
              }}
              className="text-white  bg-primary border-b-[#2C00A7] border-b-4 hover:opacity-90 cursor-pointer px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition"
            >
              <CiSquarePlus size={24} />
              افزودن دسته‌بندی
            </button>
          </div>
        </div>

        {/* فرم اضافه/ویرایش */}
        {showForm && (
          <div className="p-8 border-b bg-gray-50">
            <h2 className="text-2xl font-bold text-secondery mb-6">
              {isEditMode ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
            </h2>
            <form onSubmit={submitCategory} className="grid md:grid-cols-2 gap-6">
              <input name="title" value={form.title} onChange={handleInput} placeholder="عنوان *" required className="w-full px-4 py-2 border text-secondery border-secondery rounded-lg focus:border-indigo-500" />
              <input name="slug" value={form.slug} onChange={handleInput} placeholder="اسلاگ *" required className="w-full px-4 py-2 border border-secondery text-secondery rounded-lg focus:border-indigo-500" />
              <select name="mainCategory" value={form.mainCategory} onChange={handleInput} className="w-full px-4 py-2 border border-secondery  text-secondery rounded-lg" required>
                <option value="onlineshop" >فروشگاه آنلاین</option>
                <option value="drugstore">داروخانه</option>
              </select>
              <select name="parent" value={form.parent} onChange={handleInput} className="w-full px-4 py-2 border text-secondery border-secondery rounded-lg">
                <option value="">بدون والد</option>
                {tree.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.title}</option>
                ))}
              </select>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-secondery">تصویر</label>
                <div className="flex items-center gap-6">
                  {form.thumbnailPreview ? (
                    <Image src={form.thumbnailPreview} alt="پیش‌نمایش" width={100} height={100} className="rounded-lg border border-secondery object-cover" />
                  ) : (
                    <div className="w-24 h-24 border-2 border-secondery border-dashed rounded-lg flex items-center justify-center">
                      <CiImageOn size={40} className="text-gray-400" />
                    </div>
                  )}
                  <label className="text-white  bg-primary border-b-[#2C00A7] border-b-4 hover:bg-opacity-90 cursor-pointer px-6 py-3 rounded-lg  flex items-center gap-2">
                    <CiImageOn size={20} />
                    انتخاب تصویر
                    <input type="file" accept="image/*" name="thumbnail" onChange={handleInput} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="bg-green-500 cursor-pointer text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600">
                  {isEditMode ? "بروزرسانی" : "ایجاد"} دسته‌بندی
                </button>
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="bg-red-500 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-red-600">
                  انصراف
                </button>
              </div>
            </form>
          </div>
        )}

        {/* جستجو و لیست */}
        <div className="p-6 border-b border-secondery bg-gray-50">
          <div className="relative max-w-md">
            <CiSearch size={22} className="absolute right-3 top-3 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو..."
              className="w-full pr-12 px-4 py-2 border border-secondery rounded-lg text-secondery focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-center py-10 text-gray-500">در حال بارگذاری...</p>
          ) : tree.length === 0 ? (
            <p className="text-center py-20 text-gray-500 text-lg">هیچ دسته‌بندی ثبت نشده است</p>
          ) : (
            <div className="space-y-2">
              {tree.map((cat) => (
                <CategoriesBox
                  key={cat._id}
                  cat={cat}
                  level={0}
                  expanded={expanded}
                  toggleExpand={toggleExpand}
                  onDelete={deleteCategory}
                  onEdit={handleEdit}
                  search={search}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}