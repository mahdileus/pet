import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth-server";
import ProductComment from "@/models/ProductComment";
import ArticleComment from "@/models/ArticleComment";
import ProductCommentBox from "@/app/components/template/p-user/comments/ProductComment";
import ArticleCommentBox from "@/app/components/template/p-user/comments/ArticleComments";
import Article from "@/models/Article";
import Product from "@/models/Product";



export default async function UserCommentsPanel() {
    await connectToDB();

    const user = await authUser();
    if (!user) {
        return (
            <div className="container mx-auto py-10">
                <p className="text-center text-red-500">ابتدا وارد حساب کاربری خود شوید.</p>
            </div>
        );
    }

    // گرفتن کامنت‌های محصولات کاربر
    const productComments = await ProductComment.find({ user: user._id })
        .populate("product", "title") // گرفتن عنوان محصول
        .sort({ createdAt: -1 })
        .lean();

    // گرفتن کامنت‌های مقالات کاربر
    const articleComments = await ArticleComment.find({ user: user._id })
        .populate("article", "title") // گرفتن عنوان مقاله
        .sort({ createdAt: -1 })
        .lean();


    return (
        <>
            <div className="container bg-white rounded-3xl mx-auto py-10 flex flex-col gap-12">

                {/* بخش کامنت‌های محصولات */}
                <div className="flex flex-col gap-4 px-10">
                    <h2 className="text-xl font-bold text-secondery">کامنت‌های محصولات</h2>
                    {productComments.length === 0 ? (
                        <div className="w-full bg-white rounded-3xl p-4">
                            <p className="text-center text-gray-500">هیچ کامنتی برای محصول ثبت نشده است.</p>
                        </div>
                    ) : (
                        productComments.map((comment) => (
                            <ProductCommentBox key={comment._id} comment={JSON.parse(JSON.stringify(comment))} />
                        ))
                    )}
                </div>
            </div>
            <div className="container bg-white rounded-3xl mx-auto py-10 flex flex-col gap-12 mt-8">
                {/* بخش کامنت‌های مقالات */}
                <div className="flex flex-col gap-4 px-10">
                    <h2 className="text-xl font-bold text-secondery">کامنت‌های مقالات</h2>
                    {articleComments.length === 0 ? (
                        <div className="w-full bg-white rounded-3xl p-4">
                            <p className="text-center text-gray-500">هیچ کامنتی برای مقاله ثبت نشده است.</p>
                        </div>
                    ) : (
                        articleComments.map((comment) => (
                            <ArticleCommentBox key={comment._id} comment={JSON.parse(JSON.stringify(comment))} />
                        ))
                    )}
                </div>
            </div>
        </>

    );
}
