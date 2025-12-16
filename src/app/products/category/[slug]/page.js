

import Footer from "@/app/components/module/footer/Footer";
import Navbar from "@/app/components/module/navbar/Navbar";
import ShopArchive from "@/app/components/module/shop/ShopArchive";
import ShapeTwo from "@/app/components/template/shape/Shape";

export default async function CategoryProducts({ params }) {
  const { slug } = await params;

  return (
    <div className="font-yekan-bakh relative overflow-hidden">
      <ShapeTwo/>
      <Navbar />
      <ShopArchive initialCategorySlug={slug} />
      <Footer />
    </div>
  );
}