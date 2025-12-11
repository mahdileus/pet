"use client";
import Link from "next/link";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { PiTelegramLogo, PiInstagramLogo, PiYoutubeLogo, PiDotsNineLight } from "react-icons/pi";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

export default function Herosection() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                
                {/* متن و دکمه‌ها */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start py-10 md:py-0">
                    <h2 className="text-8xl font-bold bg-linear-to-r from-primary to-secondery bg-clip-text text-transparent text-center md:text-left">
                        روی سلامتیش <br/>تمرکز کن
                    </h2>

                    <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                        <div className="shrink-0">
                            <PiDotsNineLight size={32} className="md:w-12 md:h-12" />
                        </div>
                        <p className="text-justify text-sm sm:text-base md:text-base px-2 md:px-0">
                            اگر قصد دارید برای سایت خود طراحی کنید، رابط کاربری یکی از مهم‌ترین بخش‌هاست.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mt-4">
                        <Link
                            href="/posts"
                            className="flex group justify-center md:justify-start items-center py-2 px-4 transition-all rounded-full gap-6 w-full md:w-44 bg-green-500 border-b-4 border-b-green-600 hover:border-b-[#6e7e9f91] hover:bg-secondery"
                        >
                            <p className="font-yekan-bakh text-base font-semibold text-white">مشاهده همه</p>
                            <span className="w-10 h-8 relative bg-secondery group-hover:rounded-full group-hover:bg-green-600 rounded-l-full">
                                <HiOutlineArrowLongLeft
                                    size={30}
                                    className="absolute text-white group-hover:-translate-x-2 transition-all -top-1 bottom-0 -right-4 left-0 z-50"
                                />
                            </span>
                        </Link>

                        <div className="flex gap-4 mt-5 text-xl justify-center md:justify-start text-third font-bold">
                            <a href="https://www.instagram.com/t1w.ir/">
                                <PiInstagramLogo size={24} className="hover:text-primary cursor-pointer" />
                            </a>
                            <a href="https://t.me/09125673763">
                                <PiTelegramLogo size={24} className="hover:text-primary cursor-pointer" />
                            </a>
                            <PiYoutubeLogo size={24} className="hover:text-primary cursor-pointer" />
                            <FaWhatsapp size={24} className="hover:text-primary cursor-pointer" />
                            <FaXTwitter size={24} className="hover:text-primary cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* تصویر */}
                <div className="hidden md:w-1/2 md:flex justify-center md:justify-end mt-6 md:mt-0 select-none z-20">
                    <img src="/images/dog-2.png" className="w-full h-auto max-w-sm md:max-w-full" />
                </div>

            </div>
        </div>
    );
}
