// components/admin/BrandsManager.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import swal from "sweetalert";
import BrandBox from "./BrandBox";
import { CiSquarePlus, CiSearch, CiImageOn } from "react-icons/ci";

export default function BrandsManager() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    logo: null,
    logoPreview: null,
    website: "",
  });

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands");
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.success) setBrands(data.brands || []);
    } catch {
      swal("خطا!", "بارگذاری برندها با مشکل مواجه شد", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files[0]) {
      setForm({
        ...form,
        logo: files[0],
        logoPreview: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitBrand = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      swal("هشدار", "نام برند الزامی است", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    if (form.slug) formData.append("slug", form.slug);
    if (form.website) formData.append("website", form.website);
    if (form.logo) formData.append("logo", form.logo);

    const url = isEditMode ? `/api/brands/${editingBrand._id}` : "/api/brands";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("خطای سرور");

      resetForm();
      setShowForm(false);
      setIsEditMode(false);
      setEditingBrand(null);
      await fetchBrands();
      swal("موفقیت!", isEditMode ? "برند بروزرسانی شد" : "برند اضافه شد", "success");
    } catch {
      swal("خطا!", "عملیات ناموفق بود", "error");
    }
  };

  const resetForm = () => {
    setForm({ name: "", slug: "", logo: null, logoPreview: null, website: "" });
  };

  const handleEdit = (brand) => {
    setForm({
      name: brand.name,
      slug: brand.slug || "",
      website: brand.website || "",
      logo: null,
      logoPreview: brand.logo,
    });
    setEditingBrand(brand);
    setIsEditMode(true);
    setShowForm(true);
  };

  const deleteBrand = async (id) => {
    const isConfirm = await swal({
      title: "مطمئنی؟",
      text: "این برند حذف میشه!",
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
          closeModal: false, // شبیه showLoaderOnConfirm
        },
      },
      dangerMode: true,
    });

    if (!isConfirm) return;

    try {
      const res = await fetch(`/api/brands/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      await res.json();

      fetchBrands();

      await swal({
        title: "حذف شد!",
        text: "برند با موفقیت حذف شد",
        icon: "success",
        button: "باشه",
      });
    } catch {
      swal("خطا!", "حذف ناموفق بود", "error");
    }
  };

  const filteredBrands = brands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen container">
      <div className=" mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-linear-to-r bg-secondery text-white p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">مدیریت برندها</h1>
            <button
              onClick={() => {
                resetForm();
                setIsEditMode(false);
                setEditingBrand(null);
                setShowForm(true);
              }}
              className="text-white  bg-primary border-b-[#2C00A7] border-b-4 hover:opacity-90 cursor-pointer px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition"
            >
              <CiSquarePlus size={24} />
              افزودن برند
            </button>
          </div>
        </div>

        {/* فرم اضافه/ویرایش */}
        {showForm && (
          <div className="p-8 border-b bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-secondery">
              {isEditMode ? "ویرایش برند" : "افزودن برند جدید"}
            </h2>
            <form onSubmit={submitBrand} className="grid md:grid-cols-2 gap-6">
              <input name="name" value={form.name} onChange={handleInput} placeholder="نام برند *" required className="w-full px-4 py-2 border rounded-lg focus:border-purple-500" />
              <input name="slug" value={form.slug} onChange={handleInput} placeholder="اسلاگ (اختیاری)" className="w-full px-4 py-2 border rounded-lg" />
              <input name="website" value={form.website} onChange={handleInput} placeholder="آدرس وبسایت (اختیاری)" className="md:col-span-2 w-full px-4 py-2 border rounded-lg" />

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">لوگو</label>
                <div className="flex items-center gap-6">
                  {form.logoPreview ? (
                    <Image src={form.logoPreview} alt="لوگو" width={120} height={120} className="rounded-lg border object-contain bg-white" />
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                      <CiImageOn size={50} className="text-gray-400" />
                    </div>
                  )}
                  <label className="text-white  bg-primary border-b-[#2C00A7] border-b-4 hover:opacity-90 cursor-pointer px-6 py-3 rounded-lg  flex items-center gap-2">
                    <CiImageOn size={20} />
                    انتخاب لوگو
                    <input type="file" accept="image/*" name="logo" onChange={handleInput} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="bg-green-500 cursor-pointer text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600">
                  {isEditMode ? "بروزرسانی" : "ایجاد"} برند
                </button>
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="bg-red-500 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-red-600">
                  انصراف
                </button>
              </div>
            </form>
          </div>
        )}

        {/* جستجو */}
        <div className="p-6 border-b bg-gray-50">
          <div className="relative max-w-md">
            <CiSearch size={22} className="absolute right-3 top-3 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در برندها..."
              className="w-full pr-12 px-4 py-2 border rounded-lg focus:border-purple-500"
            />
          </div>
        </div>

        {/* لیست برندها */}
        <div className="p-6">
          {loading ? (
            <p className="text-center py-10 text-gray-500">در حال بارگذاری...</p>
          ) : filteredBrands.length === 0 ? (
            <p className="text-center py-20 text-gray-500 text-lg">هیچ برندی ثبت نشده است</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => (
                <BrandBox
                  key={brand._id}
                  brand={brand}
                  onEdit={handleEdit}
                  onDelete={deleteBrand}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}