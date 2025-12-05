"use client"
import React from 'react'



import Link from 'next/link'
import { usePathname } from 'next/navigation'


const links = [
    {
        name: "صفحه اصلی",
        path: "/",
    },
    {
        name: " داروخانه",
        path: "/seo",
    },
    {
        name: " مقالات ",
        path: "/web-design",
    },
    {
        name: "  درباره ما",
        path: "/programing",
    },
    {
        name: "تماس با ما ",
        path: "/portfolios",
    },
];



function MobileNav() {
    const pathName = usePathname()
    return (
        <nav className='flex flex-col font-yekan-bakh items-start gap-y-5 text-primary text-base font-dana pt-4'>
            {links.map((link, index) => {
                return <Link href={link.path} key={index} className={`${link.path === pathName && "text-secondery"
                    } font-medium hover:text-secondery transition-all`}>
                    {link.name}
                </Link>
            })}
        </nav>
    )
}

export default MobileNav;