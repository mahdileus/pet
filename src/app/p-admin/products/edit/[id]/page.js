
import EditProduct from "@/app/components/template/p-admin/products/Edit";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";

export default async function EditProductPage({ params }) {
  // await کردن params برای دسترسی به id
  const { id } = await params;

  // اتصال به دیتابیس و دریافت داده
  await connectToDB();
  const product = await ProductModel.findById(id).lean();

  return (
    <div className="mt-10">
      <EditProduct
        product={JSON.parse(JSON.stringify(product))}
        productId={id}
      />
    </div>
  );
}