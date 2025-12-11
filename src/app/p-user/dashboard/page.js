export const dynamic = "force-dynamic";

import UserInfoBox from "@/app/components/template/p-user/dashboard/UserInfoBox";
import DiscountesBox from "@/app/components/template/p-user/discountes/Discountes";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth-server";
import Discount from "@/models/Discount";




export default async function Dashboard() {
  await connectToDB();
  const user = await authUser();
      const discounts = await Discount.find({})
          .sort({ createdAt: -1 }) // جدیدترین اول
          .lean()
          .limit(2);

  return (
    <section className="container mt-14 ">
      <UserInfoBox user={JSON.parse(JSON.stringify(user))} />
      <div className="flex items-center justify-between mt-8 gap-8">
        <div className="w-1/2 container mx-auto py-10 flex flex-col gap-6">
          {discounts.length === 0 && (
            <div className="w-full bg-white rounded-3xl">
              <p className="text-center text-gray-500">هیچ کد تخفیفی پیدا نشد.</p>
            </div>
          )}

          {discounts.map((item) => (
            <DiscountesBox key={item._id} discount={JSON.parse(JSON.stringify(item))} />
          ))}
        </div>
        <div className="w-1/2">
          <UserInfoBox />
        </div>
      </div>
    </section>
  );
}
