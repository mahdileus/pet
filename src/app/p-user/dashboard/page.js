export const dynamic = "force-dynamic";

import UserInfoBox from "@/app/components/template/p-user/dashboard/UserInfoBox";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth-server";



export default async function Dashboard() {
  await connectToDB();
  const user = await authUser();
  return (
    <section className="container mt-14 ">
      <UserInfoBox user={JSON.parse(JSON.stringify(user))}/>
      <div className="flex items-center justify-between mt-8 gap-8">
        <div className="w-1/2">
        <UserInfoBox/>
        </div>
        <div className="w-1/2">
        <UserInfoBox/>
        </div>
      </div>
    </section>
  );
}
