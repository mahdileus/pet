export const dynamic = "force-dynamic";
// یا export const revalidate = 0

import Footer from "@/app/components/module/footer/Footer";
import Navbar from "@/app/components/module/navbar/Navbar";
import ShapeTwo from "@/app/components/template/shape/Shape";
import MainSlider from "../components/template/shop/MainSlider";
import ShopCategories from "../components/template/shop/ShopCategories";
import LatestProduct from "../components/template/main/LatestProducts";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product"
import Banners from "../components/template/shop/Banners";
import Brands from "../components/template/shop/Brands";
import MiddleSlider from "../components/template/shop/MiddleSlider";

export default async function Product() {
    await connectToDB();
    const products = await ProductModel.find({})
        .sort({ createdAt: -1 })
        .limit(8);

    const safeProducts = products || [];

    return (
        <div className="font-yekan-bakh relative overflow-hidden">
            <ShapeTwo />
            <Navbar />
            <MainSlider />
            <ShopCategories />

            <LatestProduct products={JSON.parse(JSON.stringify(safeProducts))} />

            <MiddleSlider />

            <LatestProduct products={JSON.parse(JSON.stringify(safeProducts))} />

            <Banners />

            <LatestProduct products={JSON.parse(JSON.stringify(safeProducts))} />

            <Brands />
            <Footer />
        </div>
    )
}
