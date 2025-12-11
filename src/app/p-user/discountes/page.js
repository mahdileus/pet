import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth-server";
import Discount from "@/models/Discount";
import DiscountesBox from "@/app/components/template/p-user/discountes/Discountes";

export default async function Discountes() {
await connectToDB();


    const user = await authUser(); // اگر خواستی کوپن‌های مربوط به یک یوزر رو جدا کنی
    // console.log("user:", user);

    // گرفتن همه تخفیف‌ها
    const discounts = await Discount.find({})
        .sort({ createdAt: -1 }) // جدیدترین اول
        .lean();

    return (
        <div className="container mx-auto py-10 flex flex-col gap-6">
            {discounts.length === 0 && (
                <div className="w-full bg-white rounded-3xl">
                    <p className="text-center text-gray-500">هیچ کد تخفیفی پیدا نشد.</p>
                </div>
            )}

            {discounts.map((item) => (
                <DiscountesBox key={item._id} discount={JSON.parse(JSON.stringify(item))} />
            ))}
        </div>
    );
}
