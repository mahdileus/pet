"use client";
import Image from "next/image";
import { LuMessageCircleMore, LuUserRound, LuClock } from "react-icons/lu";
import { BsFileRichtext } from "react-icons/bs";
export default function ArticleCardBox({ article }) {


    return (
        <div className="relative w-[560px] h-[410px] rounded-3xl overflow-hidden shadow-xl group ">
            {/* تصویر پس‌زمینه */}
            <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                priority
            />

            {/* لایه‌ی گرادیان برای خواناتر شدن متن */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0638]/90 via-[#0a0638]/50 to-transparent" />

            {/* متن و محتوا */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white ">
                <div className="flex items-center justify-between gap-2.5">
                    <div className=" w-1/2">

                        <BsFileRichtext size={32} className="text-white mb-4 " />

                        <h3 className="text-2xl line-clamp-2 font-bold leading-tight mb-2 ">
                            {article.title}
                        </h3>
                    </div>
                    <div className="w-1/2">
                        <p className="text-sm text-gray-200 leading-relaxed mb-4 line-clamp-3 text-justify ">
                            {article.shortDescription}
                        </p>
                        {/* اطلاعات پایین کارت */}
                        <div className="flex w-full items-center gap-4 text-xs bg-primary p-2.5 rounded-xl text-gray-300">
                            <div className="flex items-center gap-1">
                                <LuUserRound size={18} />
                                <span className="font-bold text-sm"> {article.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <LuMessageCircleMore size={18} />
                                <span className="font-bold text-sm">۶۸ دیدگاه</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <LuClock size={18} />
                                <span className="font-bold text-sm">{article.timeToRead} دقیقه</span>
                            </div>
                        </div>

                    </div>
                </div>


            </div>


        </div>
    );
}
