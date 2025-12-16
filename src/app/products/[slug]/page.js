// app/products/[slug]/page.jsx
import Footer from "@/app/components/module/footer/Footer";
import Navbar from "@/app/components/module/navbar/Navbar";
import ProductHeader from "@/app/components/template/product/ProductHeader";
import ProductTabs from "@/app/components/template/product/ProductTabs";
import ShapeTwo from "@/app/components/template/shape/Shape";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";


export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  await connectToDB();
  const { slug } = await params;

  const product = await ProductModel.findOne({ slug })
    .populate("category", "title slug")
    .populate("brand", "name slug logo")
    .lean();

  if (!product) {
    return (
      <div className="text-center py-32">
        <h2 className="text-4xl font-bold text-red-600">محصول یافت نشد</h2>
        <p className="mt-6 text-xl text-gray-600">متأسفانه این محصول وجود ندارد یا حذف شده است.</p>
      </div>
    );
  }

  // تبدیل attributes به آرایه برای تب مشخصات
  const attributesArray = product.attributes 
    ? Object.entries(product.attributes).map(([key, value]) => ({
        key,
        value: Array.isArray(value) ? value.join(", ") : value,
      }))
    : [];

  return (
    <div className="font-yekan-bakh relative overflow-hidden">
      <ShapeTwo />
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {/* هدر محصول (گالری + اطلاعات) */}
        <ProductHeader product={JSON.parse(JSON.stringify(product))} />

        {/* تب‌ها */}
        <ProductTabs 
          product={JSON.parse(JSON.stringify(product))} 
          attributes={attributesArray}
        />
      </div>

      <Footer />
    </div>
  );
}