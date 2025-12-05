"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ icon, label, href, onClick }) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  // اگر onClick وجود داشته باشد → دکمه معمولی (غیر لینک)
  if (onClick) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-full transition-all cursor-pointer 
          hover:bg-secondery hover:text-white text-secondery`}
      >
        <span className="text-xl text-green-500 ">{icon}</span>
        <span className="hidden md:block">{label}</span>
      </div>
    );
  }

  // حالت لینک (عادی)
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-full transition-all cursor-pointer 
        hover:bg-secondery hover:text-white ${
          isActive ? "bg-secondery text-white font-bold w-full" : "text-secondery"
        }`}
    >
      <span className="text-xl text-green-500 ">{icon}</span>
      <span className="hidden md:block">{label}</span>
    </Link>
  );
}
