"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "صفحه اصلی", path: "/" },
  { name: "فروشگاه", path: "/shop" },
  { name: "مقالات", path: "/web-design" },
  { name: "درباره ما", path: "/programing" },
  { name: "تماس با ما", path: "/contact-us" },
];

export default function Nav() {
  const pathName = usePathname();

  return (
    <nav className="hidden lg:flex items-center justify-center gap-6 font-yekan-bakh text-secondery text-base lg:text-lg pt-4">
      {links.map(({ name, path }, index) => {
        const isActive = path === pathName;
        return (
          <Link
            key={index}
            href={path}
            className={`
              px-3 py-1 font-medium transition-all duration-200 
              hover:text-green-500 hover:scale-105
              ${isActive ? "text-green-500 border-b-2 border-green-500 scale-105" : ""}
            `}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
