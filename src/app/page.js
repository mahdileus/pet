
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product"
import ArticleModel from "@/models/Article"
import Footer from "./components/module/footer/Footer";
import Navbar from "./components/module/navbar/Navbar";
import AboutUs from "./components/template/main/AboutUs";
import Ads from "./components/template/main/Ads";
import Herosection from "./components/template/main/Herosection";
import MedicineSevices from "./components/template/main/MedicineSevices";
import MounthlyService from "./components/template/main/MounthlyService";
import PetSycology from "./components/template/main/PetSycology";
import Services from "./components/template/main/Services";
import Shape from "./components/template/main/Shape";
import LatestProduct from "./components/template/main/LatestProducts";
import LatestArticles from "./components/template/main/LatestArticles";
;

export default async function Home() {
  await connectToDB();
  const products = await ProductModel.find({})
    .sort({ createdAt: -1 })
    .limit(8);
  const safeProducts = (products || []).filter(product => product);

  const articles = await ArticleModel.find({})
    .sort({ createdAt: -1 })
    .limit(8);
  const safeArticle = (articles || []).filter(article => article);

  return (
    <div className="font-yekan-bakh">
      <Shape />
      <Navbar />
      <Herosection />
      <Services />
      <MedicineSevices />
      <MounthlyService />
      <PetSycology />
      <AboutUs />
      <LatestProduct
        products={JSON.parse(JSON.stringify(safeProducts))}
      />
      <Ads />

      <LatestArticles articles={JSON.parse(JSON.stringify(safeArticle))} />

      <Footer />
    </div>
  );
}
