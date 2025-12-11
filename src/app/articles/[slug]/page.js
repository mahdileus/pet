import Navbar from "@/app/components/module/navbar/Navbar";
import ArticleHeader from "@/app/components/template/article/ArticleHeader";
import ShapeTwo from "@/app/components/template/shape/Shape";
import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article"

export default async function Product({ params }) {
    await connectToDB()
    const { slug } = await params;

    const article = await ArticleModel.findOne({ slug })
        .populate("comments")
        .lean(); // یک محصول
    const latestArticles = await ArticleModel.find({})
        .sort({ createdAt: -1 }) // جدیدترین‌ها
        .limit(4)
        .lean();
    return (
        < div className="font-yekan-bakh relative overflow-hidden">
            <ShapeTwo />
            <Navbar />
            <ArticleHeader article={JSON.parse(JSON.stringify(article))}
                articles={JSON.parse(JSON.stringify(latestArticles))}
            />
        </div>
    )
}