import { Suspense } from "react";
import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import ShopArchive from "../components/module/shop/ShopArchive";




export default function Products() {

  return (
    <div>
      <Navbar />
      <Suspense>
        <ShopArchive />
      </Suspense>
      <Footer />

    </div>
  );
}