"use client";

import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function TemplateDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    code: "",
    percent: 0,
    maxUse: 1,
    expiresAt: "",
    isActive: true,
    minCartAmount: 0,
    applicableCategories: [],
    applicableProducts: [],
  });
  const [editingId, setEditingId] = useState(null);

  // دریافت همه کوپن‌ها
  const fetchDiscounts = async () => {
    try {
      const res = await fetch("/api/discounts");
      const data = await res.json();
      setDiscounts(data.discounts || []);
    } catch (err) {
      console.log(err);
      swal("خطا", "مشکل در دریافت کوپن‌ها", "error");
    } finally {
      setLoading(false);
    }
  };

  // دریافت دسته‌ها و محصولات برای چندانتخابی
  const fetchOptions = async () => {
    try {
      const resCats = await fetch("/api/product-categories");
      const dataCats = await resCats.json();
      setCategories(dataCats.categories || []);

      const resProds = await fetch("/api/products");
      const dataProds = await resProds.json();
      setProducts(dataProds.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDiscounts();
    fetchOptions();
  }, []);

  // تغییر فرم
  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "select-multiple") {
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setForm((prev) => ({ ...prev, [name]: selected }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ایجاد / ویرایش کوپن
  const saveDiscount = async (e) => {
    e.preventDefault();

    if (!form.code.trim() || form.percent <= 0) {
      swal("خطا", "کد و درصد تخفیف الزامی هستند", "warning");
      return;
    }

    try {
      setCreating(true);

      const formData = new FormData();
      for (const key in form) {
        if (Array.isArray(form[key])) {
          form[key].forEach((val) => formData.append(key, val));
        } else {
          formData.append(key, form[key]);
        }
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/discounts/${editingId}` : "/api/discounts";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setForm({
          code: "",
          percent: 0,
          maxUse: 1,
          expiresAt: "",
          isActive: true,
          minCartAmount: 0,
          applicableCategories: [],
          applicableProducts: [],
        });
        setEditingId(null);
        fetchDiscounts();
        swal("موفقیت", editingId ? "کوپن ویرایش شد" : "کوپن ایجاد شد", "success");
      } else {
        swal("خطا", data.error || "خطا در ذخیره کوپن", "error");
      }
    } catch (err) {
      console.log(err);
      swal("خطا", err.message || "خطا در ذخیره کوپن", "error");
    } finally {
      setCreating(false);
    }
  };

  // ویرایش
  const editDiscount = (discount) => {
    setEditingId(discount._id);
    setForm({
      code: discount.code,
      percent: discount.percent,
      maxUse: discount.maxUse,
      expiresAt: discount.expiresAt ? discount.expiresAt.slice(0, 16) : "",
      isActive: discount.isActive,
      minCartAmount: discount.minCartAmount,
      applicableCategories: discount.applicableCategories?.map((c) => c._id) || [],
      applicableProducts: discount.applicableProducts?.map((p) => p._id) || [],
    });
    window.scrollTo(0, 0);
  };

  // حذف کوپن
  const deleteDiscount = (id) => {
    swal({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      buttons: ["لغو", "حذف کن"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (!willDelete) return;
      try {
        const res = await fetch(`/api/discounts/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchDiscounts();
          swal("موفقیت", "کوپن با موفقیت حذف شد", "success");
        } else {
          swal("خطا", "خطا در حذف کوپن", "error");
        }
      } catch (err) {
        console.log(err);
        swal("خطا", "خطا در حذف کوپن", "error");
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">مدیریت کوپن‌ها</h1>

      <form
        onSubmit={saveDiscount}
        className="flex flex-col gap-4 mb-6 border p-4 rounded-lg"
      >
        <input
          type="text"
          name="code"
          placeholder="کد تخفیف"
          value={form.code}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="number"
          name="percent"
          placeholder="درصد تخفیف"
          value={form.percent}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="number"
          name="maxUse"
          placeholder="حداکثر دفعات استفاده"
          value={form.maxUse}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="datetime-local"
          name="expiresAt"
          value={form.expiresAt}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          فعال
        </label>
        <input
          type="number"
          name="minCartAmount"
          placeholder="حداقل مبلغ سبد خرید"
          value={form.minCartAmount}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <select
          name="applicableCategories"
          value={form.applicableCategories}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          multiple
        >
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
        <select
          name="applicableProducts"
          value={form.applicableProducts}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          multiple
        >
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {creating ? "در حال ذخیره..." : editingId ? "ویرایش کوپن" : "افزودن کوپن"}
        </button>
      </form>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : discounts.length === 0 ? (
        <p className="text-gray-500">هیچ کوپنی ثبت نشده است.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {discounts.map((d) => (
            <div
              key={d._id}
              className="border p-4 rounded-md flex flex-col gap-2"
            >
              <p>
                <strong>{d.code}</strong> - {d.percent}%
              </p>
              <p>حداکثر استفاده: {d.maxUse}</p>
              <p>حداقل مبلغ سبد خرید: {d.minCartAmount}</p>
              <p>
                {d.expiresAt
                  ? `انقضا: ${new Date(d.expiresAt).toLocaleString()}`
                  : "بدون تاریخ انقضا"}
              </p>
              <p>وضعیت: {d.isActive ? "فعال" : "غیرفعال"}</p>
              <p>
                دسته‌ها:{" "}
                {d.applicableCategories?.map((c) => c.title).join(", ") || "همه"}
              </p>
              <p>
                محصولات:{" "}
                {d.applicableProducts?.map((p) => p.title).join(", ") || "همه"}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => editDiscount(d)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => deleteDiscount(d._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
