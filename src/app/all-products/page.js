// app/shop/page.jsx
"use client";

import { useState, useEffect } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import ProductCard from "../components/module/products/ProductCard";
import Navbar from "@/app/components/module/navbar/Navbar";
import ShapeTwo from "@/app/components/template/shape/Shape";
import Footer from "../components/module/footer/Footer";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // فیلترها
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [hasDiscount, setHasDiscount] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // صفحه‌بندی
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedBrand) params.append("brand", selectedBrand);
      if (priceRange.min) params.append("minPrice", priceRange.min);
      if (priceRange.max) params.append("maxPrice", priceRange.max);
      if (hasDiscount) params.append("hasDiscount", "true");
      if (inStock) params.append("inStock", "true");
      params.append("sort", sortBy);
      params.append("page", page);

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
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
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchData();
  }, [search, selectedCategory, selectedBrand, priceRange, hasDiscount, inStock, sortBy, page]);

  return (
    <div className="font-yekan-bakh relative overflow-hidden">
      <ShapeTwo />
      <Navbar />
      <div className="min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">فروشگاه</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* سایدبار فیلتر */}
            <div className="lg:col-span-1 bg-white rounded-3xl shadow-xl p-6 space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <CiFilter size={28} />
                فیلترها
              </h2>

              {/* جستجو */}
              <div className="relative">
                <CiSearch size={22} className="absolute right-4 top-4 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="جستجو در محصولات..."
                  className="w-full pr-12 px-5 py-4 border-2 rounded-2xl focus:border-indigo-600"
                />
              </div>

              {/* دسته‌بندی */}
              <div>
                <h3 className="font-bold mb-3">دسته‌بندی</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-5 py-3 border-2 rounded-xl"
                >
                  <option value="">همه دسته‌ها</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.title}</option>
                  ))}
                </select>
              </div>

              {/* برند */}
              <div>
                <h3 className="font-bold mb-3">برند</h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-5 py-3 border-2 rounded-xl"
                >
                  <option value="">همه برندها</option>
                  {brands.map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* محدوده قیمت */}
              <div>
                <h3 className="font-bold mb-3">محدوده قیمت</h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    placeholder="از"
                    className="w-full px-4 py-3 border-2 rounded-xl"
                  />
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    placeholder="تا"
                    className="w-full px-4 py-3 border-2 rounded-xl"
                  />
                </div>
              </div>

              {/* چک‌باکس‌ها */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={hasDiscount} onChange={(e) => setHasDiscount(e.target.checked)} />
                  <span className="font-medium">فقط تخفیف‌دار</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
                  <span className="font-medium">فقط موجود</span>
                </label>
              </div>

              {/* مرتب‌سازی */}
              <div>
                <h3 className="font-bold mb-3">مرتب‌سازی</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-5 py-3 border-2 rounded-xl"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="bestseller">پرفروش‌ترین</option>
                  <option value="price-low">ارزان‌ترین</option>
                  <option value="price-high">گران‌ترین</option>
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
                      className={`px-5 py-3 rounded-xl font-bold transition ${page === p
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
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
      <Footer/>
    </div>
  );
}