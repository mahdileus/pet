
import AdminProducts from "@/app/components/template/p-admin/products/Products";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import Link from "next/link";
export default async function page() {
    await connectToDB();
    const products = await ProductModel.find().sort({ createdAt: -1 }).lean();

    return (
        <section className=" mt-14 container bg-white rounded-3xl shadow-md p-10">
            <div className=" px-4 flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-secondery mb-6">تمام محصولات</h1>
                </div>
                <div>
                    <Link href={"/p-admin/products/add"} className="text-white  bg-primary border-b-[#2C00A7] border-b-4 hover:opacity-90  p-3 rounded-2xl">افزودن محصول جدید</Link>

                </div>

            </div>
            <div className="px-8">
                {products.map((product) => (
                    <AdminProducts key={product._id} product={JSON.parse(JSON.stringify(product))} />
                ))}
            </div>

        </section>
    );
}