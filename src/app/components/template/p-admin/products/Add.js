// components/admin/AddEditProductForm.jsx
"use client";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CiTrash,
  CiSquarePlus,
  CiSaveUp2,
  CiImageOn,
} from "react-icons/ci";
const CKEditorComponent = dynamic(() => import("@/app/components/module/ckeditor/CKEditorWrapper"), { ssr: false });


export default function AddEditProductForm({ product, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);

  // فرم اصلی
  const [title, setTitle] = useState(product?.title || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [price, setPrice] = useState(product?.price || "");
  const [discountedPrice, setDiscountedPrice] = useState(product?.discountedPrice || "");
  const [discountPercent, setDiscountPercent] = useState(product?.discountPercent || "");
  const [stock, setStock] = useState(product?.stock || 0);
  const [category, setCategory] = useState(product?.category?._id || product?.category || "");
  const [brand, setBrand] = useState(product?.brand?._id || product?.brand || "");
  const [publishStatus, setPublishStatus] = useState(product?.publishStatus || "published");

  const [shortDescription, setShortDescription] = useState(product?.shortDescription || "");
  const [longDescription, setLongDescription] = useState(product?.longDescription || "");

  const [tags, setTags] = useState(product?.tags?.join(", ") || "");
  const [badges, setBadges] = useState(product?.badges || []);

  // ویژگی‌ها
  const [attributes, setAttributes] = useState(
    product?.attributes ? Object.entries(product.attributes).map(([k, v]) => [k, Array.isArray(v) ? v.join(", ") : v]) : [["", ""]]
  );

  // واریانت‌ها
  const [variants, setVariants] = useState(
    product?.variants?.length > 0
      ? product.variants.map(v => ({
        name: v.name || "",
        price: v.price || "",
        stock: v.stock || 0,
        image: null,
        imagePreview: v.image || null,
        isDefault: v.isDefault || false,
      }))
      : [{ name: "", price: "", stock: 0, image: null, imagePreview: null, isDefault: false }]
  );

  // لیست‌ها
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // تصاویر
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(product?.thumbnail || "/images/default-product.png");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGallery, setExistingGallery] = useState(product?.gallery || []);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(d => setCategories(d.categories || []));
    fetch("/api/brands").then(r => r.json()).then(d => setBrands(d.brands || []));
  }, []);

  // آپلود تصویر اصلی
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // آپلود گالری
  const handleGallery = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(prev => [...prev, ...files]);
  };

  // حذف تصاویر
  const removeNewImage = (i) => setGalleryFiles(prev => prev.filter((_, idx) => idx !== i));
  const removeExistingImage = (url) => setExistingGallery(prev => prev.filter(img => img !== url));

  // ویژگی‌ها
  const addAttribute = () => setAttributes(prev => [...prev, ["", ""]]);
  const updateAttribute = (i, key, value) => {
    const updated = [...attributes];
    updated[i] = [key, value];
    setAttributes(updated);
  };
  const removeAttribute = (i) => setAttributes(prev => prev.filter((_, idx) => idx !== i));

  // واریانت‌ها
  const addVariant = () => setVariants(prev => [...prev, { name: "", price: "", stock: 0, image: null, imagePreview: null, isDefault: false }]);
  const updateVariant = (i, field, value) => {
    const updated = [...variants];
    if (field === "image") {
      updated[i].image = value;
      updated[i].imagePreview = URL.createObjectURL(value);
    } else {
      updated[i][field] = value;
    }
    setVariants(updated);
  };
  const removeVariant = (i) => setVariants(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug || !price || !category || !shortDescription || !longDescription) {
      alert("فیلدهای ضروری را پر کنید!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("price", price);
    if (discountedPrice) formData.append("discountedPrice", discountedPrice);
    if (discountPercent) formData.append("discountPercent", discountPercent);
    formData.append("stock", stock);
    formData.append("category", category);
    if (brand) formData.append("brand", brand);
    formData.append("publishStatus", publishStatus);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    if (tags) formData.append("tags", tags);
    if (badges.length > 0) formData.append("badges", JSON.stringify(badges));

    // ویژگی‌ها
    const attrObj = {};
    attributes.forEach(([k, v]) => { if (k && v) attrObj[k] = v; });
    if (Object.keys(attrObj).length > 0) formData.append("attributes", JSON.stringify(attrObj));

    // واریانت‌ها
    if (variants.some(v => v.name)) {
      const cleanVariants = variants.map(v => ({
        name: v.name,
        price: v.price ? Number(v.price) : undefined,
        stock: Number(v.stock),
        image: v.imagePreview || undefined,
        isDefault: v.isDefault,
      }));
      formData.append("variants", JSON.stringify(cleanVariants));
    }

    // تصاویر
    if (thumbnail) formData.append("thumbnail", thumbnail);
    galleryFiles.forEach(f => formData.append("gallery", f));
    if (product) {
      const removed = product.gallery.filter(img => !existingGallery.includes(img));
      if (removed.length > 0) formData.append("removedImages", JSON.stringify(removed));
    }

    try {
      const url = product ? `/api/products/${product._id}` : "/api/products";
      const res = await fetch(url, { method: product ? "PUT" : "POST", body: formData });
      const result = await res.json();

      if (result.success) {
        alert(product ? "محصول بروز شد!" : "محصول اضافه شد!");
        onSuccess?.();
      } else {
        alert("خطا: " + (result.error || "ناموفق"));
      }
    } catch (err) {
      console.error(err);
      alert("خطای شبکه!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 container mx-auto space-y-12">
      <h1 className="text-2xl font-bold text-center text-secondery">
        {product ? "ویرایش محصول" : "افزودن محصول جدید"}
      </h1>

      {/* عنوان و اسلاگ */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block font-bold text-secondery text-lg mb-2">عنوان محصول *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-6 py-4 border border-secondery rounded-2xl" placeholder="مثل: غذای خشک گربه کتلوکس جوسرا Josera Catelux وزن 2 کیلوگرم " />
        </div>
        <div>
          <label className="block font-bold text-secondery text-lg mb-2">اسلاگ (دستی) *</label>
          <input value={slug} onChange={e => setSlug(e.target.value)} required className="w-full px-6 py-4 border border-secondery rounded-2xl focus:border-indigo-600" placeholder="Josera-Catelux-dry-cat-food-weight-2-kg" />
        </div>
      </div>

      {/* قیمت‌ها */}
      <div className="grid md:grid-cols-4 gap-6">
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="قیمت اصلی *" className="px-6 py-4 border border-secondery rounded-2xl" />
        <input type="number" value={discountedPrice} onChange={e => setDiscountedPrice(e.target.value)} placeholder="قیمت تخفیف‌دار" className="px-6 py-4 border border-secondery rounded-2xl" />
        <input type="number" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} placeholder="درصد تخفیف" className="px-6 py-4 border border-secondery rounded-2xl" />
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="موجودی" className="px-6 py-4 border border-secondery rounded-2xl" />
      </div>

      {/* دسته‌بندی و برند */}
      <div className="grid md:grid-cols-3 gap-6">
        <select value={category} onChange={e => setCategory(e.target.value)} required className="px-6 py-4 border border-secondery rounded-2xl">
          <option value="">دسته‌بندی *</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
        </select>
        <select value={brand} onChange={e => setBrand(e.target.value)} className="px-6 py-4 border border-secondery rounded-2xl">
          <option value="">برند</option>
          {brands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
        </select>
        <select value={publishStatus} onChange={e => setPublishStatus(e.target.value)} className="px-6 py-4 border border-secondery rounded-2xl">
          <option value="published">منتشر شده</option>
          <option value="draft">پیش‌نویس</option>
          <option value="archived">آرشیو</option>
        </select>
      </div>

      {/* توضیحات */}
      <div className="grid gap-8">
        {/* توضیح کوتاه */}
        <div className="flex flex-col w-full">
          <label className="mb-2 text-gray-700 font-medium">توضیح کوتاه</label>
          <CKEditorComponent
            value={shortDescription}
            onChange={(data) => setShortDescription(data)}
            required
            rows={6}
            placeholder="توضیح کوتاه محصول خود را وارد کنید..."
            className="w-full px-5 py-4"
          />
        </div>

        {/* توضیح بلند */}
        <div className="flex flex-col w-full">
          <label className="mb-2 text-gray-700 font-medium">توضیح بلند</label>
          <CKEditorComponent
            value={longDescription}
            onChange={(data) => setLongDescription(data)}
            required
            rows={12}
            placeholder="توضیح کامل محصول خود را وارد کنید..."
            className="w-full px-5 py-4 "
          />
        </div>
      </div>


      {/* تصویر اصلی */}
      <div>
        <h3 className="text-xl text-secondery font-bold mb-6">تصویر اصلی</h3>
        <div className="flex items-center gap-8">
          <Image src={thumbnailPreview} alt="پیش‌نمایش" width={200} height={200} className="rounded-2xl border-4 object-cover shadow-lg" />
          <label className="cursor-pointer bg-linear-to-r from-secondery to-primary text-white px-10 py-8 rounded-3xl font-bold flex flex-col items-center gap-3 hover:shadow-2xl transition">
            <CiImageOn size={40} />
            {thumbnail ? "تغییر تصویر" : "انتخاب تصویر اصلی"}
            <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" />
          </label>
        </div>
      </div>

      {/* گالری تصاویر */}
      <div>
        <h3 className="text-xl text-secondery font-bold mb-6">گالری تصاویر</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {existingGallery.map((url, i) => (
            <div key={i} className="relative group">
              <Image src={url} alt="" width={220} height={220} className="rounded-2xl object-cover border-4 shadow-lg" />
              <button type="button" onClick={() => removeExistingImage(url)} className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition">
                <CiTrash size={24} />
              </button>
            </div>
          ))}
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative group">
              <Image src={URL.createObjectURL(file)} alt="" width={220} height={220} className="rounded-2xl object-cover border-4 shadow-lg" />
              <button type="button" onClick={() => removeNewImage(i)} className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full">
                <CiTrash size={24} />
              </button>
            </div>
          ))}
          <label className="border-4 border-dashed border-indigo-500 rounded-3xl h-56 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-700 transition bg-linear-to-br from-indigo-50 to-purple-50">
            <CiSquarePlus size={70} className="text-indigo-600" />
            <span className="mt-4 text-xl font-bold text-indigo-700">افزودن تصویر</span>
            <input type="file" multiple accept="image/*" onChange={handleGallery} className="hidden" />
          </label>
        </div>
      </div>

      {/* ویژگی‌ها */}
      <div>
        <h3 className="text-xl text-secondery font-bold mb-4">ویژگی‌ها</h3>
        {attributes.map(([key, value], i) => (
          <div key={i} className="flex gap-3 mb-3">
            <input value={key} onChange={e => updateAttribute(i, e.target.value, value)} placeholder="مثل: وزن" className="flex-1 px-4 py-2 border border-secondery rounded-lg" />
            <input value={value} onChange={e => updateAttribute(i, key, e.target.value)} placeholder="مثل: ۲۰۰ گرم" className="flex-1 px-4 py-2 border border-secondery rounded-lg" />
            <button type="button" onClick={() => removeAttribute(i)} className="text-red-600"><CiTrash size={24} /></button>
          </div>
        ))}
        <button type="button" onClick={addAttribute} className="text-indigo-600 flex items-center gap-2"><CiSquarePlus size={24} /> افزودن ویژگی</button>
      </div>

      {/* واریانت‌ها */}
      <div>
        <h3 className="text-xl text-secondery font-bold mb-4">واریانت‌ها (رنگ، سایز، حافظه و ...)</h3>
        {variants.map((v, i) => (
          <div key={i} className="border border-secondery p-4 rounded-xl mb-4">
            <div className="grid md:grid-cols-4 gap-4">
              <input value={v.name} onChange={e => updateVariant(i, "name", e.target.value)} placeholder="نام واریانت" className="px-4 py-2 border border-secondery rounded-lg" />
              <input type="number" value={v.price} onChange={e => updateVariant(i, "price", e.target.value)} placeholder="قیمت اختصاصی" className="px-4 py-2 border border-secondery rounded-lg" />
              <input type="number" value={v.stock} onChange={e => updateVariant(i, "stock", e.target.value)} placeholder="موجودی" className="px-4 py-2 border border-secondery rounded-lg" />
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={v.isDefault} onChange={e => updateVariant(i, "isDefault", e.target.checked)} />
                <label>پیش‌فرض</label>
              </div>
            </div>
            <button type="button" onClick={() => removeVariant(i)} className="text-red-600 mt-3"><CiTrash size={24} /> حذف واریانت</button>
          </div>
        ))}
        <button type="button" onClick={addVariant} className="text-indigo-600 flex items-center gap-2"><CiSquarePlus size={24} /> افزودن واریانت</button>
      </div>

      {/* بج‌ها */}
      <div>
        <h3 className="text-xl text-secondery font-bold mb-4">بج‌ها</h3>
        <div className="flex flex-wrap gap-3">
          {["bestseller", "new", "special_offer", "limited", "hot"].map(b => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={badges.includes(b)} onChange={e => {
                if (e.target.checked) setBadges(prev => [...prev, b]);
                else setBadges(prev => prev.filter(x => x !== b));
              }} />
              <span className="px-4 py-2 bg-secondery text-white rounded-full">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* تگ‌ها */}
      <div>
        <h3 className="text-xl text-secondery font-bold mb-4">تگ‌ها (با کاما جدا کن)</h3>
        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="مثل: آیفون, اپل, ۲۰۲۴" className="w-full px-5 py-3 border border-secondery rounded-xl" />
      </div>

      <div className="flex justify-center pt-12">
        <button type="submit" disabled={isLoading} className="bg-linear-to-r from-secondery to-primary text-white px-20 py-8 rounded-3xl text-3xl font-bold hover:shadow-2xl transition disabled:opacity-60 flex items-center gap-5">
          <CiSaveUp2 size={40} />
          {isLoading ? "در حال ارسال..." : product ? "بروزرسانی محصول" : "ثبت محصول"}
        </button>
      </div>
    </form>
  );
}