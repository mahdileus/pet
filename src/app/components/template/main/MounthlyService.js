"use client";

import Link from "next/link"
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
export default function MounthlyService() {
    return (
        <div className="container mx-auto px-4">
            <hr className="text-gray-200 my-12" />
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">

                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                    <div>
                        <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-secondery bg-clip-text text-transparent text-center md:text-left">
                            خدمات ماهانه آنلاین
                        </h2>
                        <hr className="border-t-4 border-primary w-10 rounded-full my-3" />
                    </div>
                    <p className="description text-justify text-sm md:text-base px-2 md:px-0">
                        اگر قصد دارید برای شغل خود یک وبسایت راه اندازی کنید باید توجه داشته باشید که یکی از مهمترین بخش ها طراحی رابط کاربری آن است که نقش اساسی در جذب و حفظ کاربر دارد. حتی اگر مطالب و محصولات حرفه ای داشته باشید اما سایت شما رابط کاربری ضعیفی داشته باشد ، کاربر آن را ترک میکند و تمام هزینه و زمان شما هدر خواهد رفت و شما با گروهی از مخاطبان ناراضی روبرو خواهید شد ، اتفاقی که با یک انتخاب اصولی میشود از آن جلوگیری کرد و با ارائه یک طرح حرفه ای مخاطبان خود را دائمی کرده و اعتماد آنها را جذب کرد فقط باید توجه داشته باشید که یک طراح حرفه ای را انتخاب کنید که بتواند خروجی استاندارد و مطابق زمینه کاری شما ارائه دهد.
                    </p>
                        <Link
                            href="/posts"
                            className="flex group justify-center md:justify-start items-center py-2 px-4 transition-all rounded-full gap-6 w-full md:w-44 bg-green-500 border-b-4 border-b-green-600 hover:border-b-[#6e7e9f91] hover:bg-secondery"
                        >
                            <p className="font-yekan-bakh text-base font-semibold text-white">مشاهده همه</p>
                            <span className="w-10 h-8 relative bg-secondery group-hover:rounded-full group-hover:bg-green-600 rounded-l-full">
                                <HiOutlineArrowLongLeft
                                    size={40}
                                    className="absolute text-white group-hover:-translate-x-2 transition-all -top-1 bottom-0 -right-4 left-0 z-50"
                                />
                            </span>
                        </Link>

                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
                    <img src="/images/Group-163.png" className="w-full h-auto max-w-sm" />
                </div>
            </div>
        </div>

    )
}