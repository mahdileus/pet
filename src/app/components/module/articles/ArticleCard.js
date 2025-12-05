"use client";

import { LuMessageCircleMore, LuUserRound, LuClock } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
export default function ArticleCard({article}) {
    return (
        <div className="w-[320px] bg-white rounded-3xl px-6 py-4 border border-gray-200 leading-relaxed">

            {/* آمار بالا */}
            <div className="flex justify-between text-center text-xs mb-6 text-black">

                <div className="flex items-center">
                    <LuClock size={18} />
                    <div className="flex flex-col">
                        <span className="font-bold text-[14px] mt-1">{article.timeToRead}</span>
                        <span className="text-[11px] opacity-80">دقیقه</span>
                    </div>

                </div>

                <div className="flex items-center">
                    <LuMessageCircleMore size={18} />
                    <div className="flex flex-col">
                        <span className="font-bold text-[14px] mt-1">۶۸</span>
                        <span className="text-[11px] opacity-80">دیدگاه</span>
                    </div>

                </div>

                <div className="flex items-center">
                    <LuUserRound size={18} />
                    <div className="flex flex-col">
                        <span className="font-bold text-[14px] mt-1">احمد</span>
                        <span className="text-[11px] opacity-80">یوسف‌وند</span>
                    </div>

                </div>
            </div>

            {/* تیتر */}
            <h2 className="text-2xl font-extrabold text-right line-clamp-2 text-secondery leading-tight mb-4">
                {article.title}
            </h2>

            {/* متن */}
            <p className="text-[15px] line-clamp-7 leading-7 text-secondery text-justify">
                {article.shortDescription}

            </p>

            {/* دکمه */}
            <Link href={"/"} >
            <div className="flex items-center gap-3 mt-3 justify-end text-green-500">
                <h4>بیشتر بخوانید</h4>
                <FaArrowLeft />
            </div>
            </Link>


        </div>
    );
}
