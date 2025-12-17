// components/shop/ShopArchive.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CiFilter, CiSearch } from "react-icons/ci";
import ProductCard from "../products/ProductCard";

export default function ShopArchive({ initialCategorySlug = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // =========================
  // Stateهای فیلتر
  // =========================
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategorySlug || searchParams.get("category") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // =========================
  // وقتی از روت داینامیک میای، فیلتر دسته اعمال بشه
  // =========================
  useEffect(() => {
    if (initialCategorySlug && selectedCategory !== initialCategorySlug) {
      setSelectedCategory(initialCategorySlug);
      setPage(1);
    }
  }, [initialCategorySlug]);

  // =========================
  // ریست صفحه وقتی فیلتر تغییر می‌کنه
  // =========================
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedBrand, sortBy]);

  // =========================
  // آپدیت URL وقتی state فیلتر تغییر کرد
  // =========================
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedBrand) params.set("brand", selectedBrand);
    params.set("sort", sortBy);
    params.set("page", page.toString());

    const basePath = selectedCategory
      ? `/products/category/${selectedCategory}`
      : "/products";

    router.push(`${basePath}?${params.toString()}`, { shallow: true });
  }, [selectedCategory, selectedBrand, sortBy, page, router]);

  // =========================
  // گرفتن دسته‌ها و برندها
  // =========================
  const fetchFilters = useCallback(async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/brands"),
      ]);
      const catData = await catRes.json();
      const brandData = await brandRes.json();
      setCategories(catData.categories || []);
      setBrands(brandData.brands || []);
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  // =========================
  // گرفتن محصولات
  // =========================
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedBrand) params.append("brand", selectedBrand);
      if (sortBy) params.append("sort", sortBy);
      params.append("page", page.toString());

      const res = await fetch(`/api/products?${params.toString()}`);

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`API Error: ${res.status} - ${errText}`);
      }

      const data = await res.json();

      if (data.success) {
        setProducts(data.products || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        setProducts([]);
        setTotalPages(1);
        console.error("Fetch products failed:", data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Fetch products error:", err);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand, sortBy, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // =========================
  // عنوان دسته‌بندی
  // =========================
  const currentCategoryTitle =
    categories.find((c) => c.slug === selectedCategory)?.title ||
    selectedCategory ||
    "همه محصولات";

  return (
    <div className="min-h-screen font-yekan-bakh bg-white container rounded-2xl shadow-md py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          {currentCategoryTitle}
        </h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* سایدبار فیلتر */}
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-xl p-6 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CiFilter size={28} />
              فیلترها
            </h2>


            {/* دسته‌بندی */}
            <div>
              <h3 className="font-bold mb-3">دسته‌بندی</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-5 py-3 border-2 rounded-xl outline-none"
              >
                <option value="">همه دسته‌ها</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.slug}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* برند */}
            <div>
              <h3 className="font-bold mb-3">برند</h3>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-5 py-3 border-2 rounded-xl outline-none"
              >
                <option value="">همه برندها</option>
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* محصولات */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-8 border-indigo-600 border-t-transparent"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-2xl text-gray-500">محصولی یافت نشد</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* صفحه‌بندی */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-6 py-3 rounded-xl font-bold transition ${page === p ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}