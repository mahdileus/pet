import { Suspense } from "react";
import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import ShopArchive from "../components/module/shop/ShopArchive";
import ShapeTwo from "../components/template/shape/Shape";




export default function Products() {

  return (
    <div className="font-yekan-bakh relative overflow-hidden">
      <ShapeTwo/>
      <Navbar />
      <Suspense>
        <ShopArchive />
      </Suspense>
      <Footer />

    </div>
  );
}