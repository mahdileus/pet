// components/dashboard/Topbar.jsx
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth-server";
import { BiSolidBell } from "react-icons/bi";

export default async function Topbar() {
  await connectToDB();
  const user = await authUser();
  const username = user.name
  const avatar = user.avatar
  return (
    <header className="flex justify-between items-center p-4 border-b border-secondery bg-white">
      <h2 className="text-secondery text-sm md:text-base"><span className="font-bold text-green-500">{username}</span> عزیز به وبسایت خودت خوش اومدی.</h2>
      <div className="flex items-center gap-4">
        <BiSolidBell className="w-6 h-6 text-primary"/>
        <img
          src={avatar}
          alt="User"
          className="w-8 h-8 rounded-full border border-white"
        />
      </div>
    </header>
  );
}
