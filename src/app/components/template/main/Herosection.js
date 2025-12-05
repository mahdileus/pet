"use client";
import Link from "next/link";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { PiTelegramLogo, PiInstagramLogo, PiYoutubeLogo, PiDotsNineLight } from "react-icons/pi"
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
import React from "react";

export default function Herosection() {
    return (
        <div className="container">
            <div className="flex items-center justify-between">
                <div className="w-1/2">
                
                    <div>
                        <h2 className="text-8xl font-bold bg-linear-to-r from-primary to-secondery bg-clip-text text-transparent">
                            روی سلامتیش <br/>تمرکز کن
                        </h2>
                        
                    </div>
                    <div>
                        <div className="flex items-center justify-start gap-5">
                            <div className="shrink-0">
                                <PiDotsNineLight size={48} />
                            </div>
                            <p className="text-justify">
                                اگر قصد دارید برای سایت خود طراحی کنید، رابط کاربری یکی از مهم‌ترین بخش‌هاست.
                            </p>
                        </div>


                        <div className="flex items-center justify-start gap-10">
                            <Link
                                href="/posts"
                                className="flex group justify-start items-center py-2 px-2 transition-all  rounded-full gap-6 w-41 bg-green-500 border-b-4 border-b-green-600 hover:border-b-[#6e7e9f91] hover:bg-secondery mt-4"
                            >
                                <p className="font-yekan-bakh text-base font-semibold text-white"> مشاهده همه</p>
                                <span className="w-10 h-8 relative bg-secondery group-hover:rounded-full group-hover:bg-green-600 rounded-l-full">
                                    <HiOutlineArrowLongLeft
                                        size={40}
                                        className="absolute text-white group-hover:-translate-x-2  transition-all -top-1 bottom-0 -right-4 left-0 z-50"
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
                </div>
                <div className="w-1/2 flex items-center justify-end z-20 select-none">
                    <img src="/images/dog.png"/>
                </div>
            </div>
        </div>


    );
}
