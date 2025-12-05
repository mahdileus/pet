"use client"
import { CiDiscount1, CiShoppingBasket, CiMap, CiHeart, CiHeadphones, CiChat2, CiUser, CiLogout } from "react-icons/ci";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import Link from "next/link";
import swal from "sweetalert";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();

  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/auth/signout", {
          method: "POST",
        });

        if (res.status === 200) {
          swal({
            title: "با موفقیت از اکانت خارج شدین",
            icon: "success",
            buttons: "فهمیدم",
          }).then((result) => {
            router.replace("/");
          });
        }
      }
    });
  };
  return (
    <aside className="w-20 md:w-64 bg-white p-4 flex flex-col items-center gap-4 border-l border-secondery">
      <Link href="/" >
        <Image src={"/images/dog-face-svgrepo-com 1.png"} width={40} height={40} alt="logo" />

      </Link>

      <nav className="flex flex-col justify-between h-full w-full text-sm mt-12 text-cream">
        <div className="flex flex-col gap-4">
          <SidebarItem icon={<CiUser className="w-8 h-8" />} label="حساب کاربری" href="/p-user/dashboard" />
          <SidebarItem icon={<CiShoppingBasket className="w-8 h-8" />} label="سفارش های من" href="/p-user/courses" />
          <SidebarItem icon={<CiMap className="w-8 h-8" />} label="آدرس های من" href="/p-user/courses" />
          <SidebarItem icon={<CiHeart className="w-8 h-8" />} label="علاقه‌مندی‌ها" href="/p-user/wishlist" />
          <SidebarItem icon={<CiHeadphones className="w-8 h-8" />} label="پشتیبانی" href="/p-user/tickets" />
          <SidebarItem icon={<CiChat2 className="w-8 h-8" />} label="نظرات من" href="/p-user/comments" />
        </div>
        <div className="flex flex-col gap-4">
          <SidebarItem icon={<CiDiscount1 className="w-8 h-8" />} label="تخفیف های من" href="/p-user/accountdetails" />
          <div onClick={logoutHandler}>
            <SidebarItem
              icon={<CiLogout className="w-8 h-8" />}
              label="خروج"
              onClick={logoutHandler}
            />
          </div>
        </div>
      </nav>
    </aside>
  );
}
