"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { BsFileRichtext } from "react-icons/bs";
import ArticleCardBox from "../../module/articles/ArticleCardBox";
import ArticleCard from "../../module/articles/ArticleCard";

export default function LatestArticles({ articles }) {
    if (!articles || articles.length === 0) return null;

    // آخرین مقاله
    const latestArticle = articles[0]; // فرض بر اینه آرایه بر اساس createdAt نزولی هست
    // بقیه مقالات
    const otherArticles = articles.slice(1);

    return (
        <div className="relative container my-22">
            <div className="container flex items-center mb-4 gap-5" style={{ padding: 0 }}>
                <span className="hidden md:block border border-green-200 rounded-full p-1.5 bg-green-100">
                    <BsFileRichtext size={32} className="text-green-500" />
                </span>

                <div className="container mx-auto flex items-center justify-between z-10 py-4" style={{ padding: 0 }}>
                    <span className="text-secondery text-xl md:text-2xl font-bold">
                        مقالات و دانستنی ها
                    </span>

                    <Link
                        href="/posts"
                        className="flex group justify-start items-center py-2 px-2 transition-all rounded-full gap-6 w-41 mt-4"
                    >
                        <p className="font-yekan-bakh text-base font-semibold text-secondery group-hover:text-green-600">
                            مشاهده همه
                        </p>
                        <span className="w-10 h-8 relative bg-green-500 group-hover:rounded-full group-hover:bg-green-600 rounded-l-full">
                            <HiOutlineArrowLongLeft
                                size={40}
                                className="absolute text-white group-hover:-translate-x-2 transition-all -top-1 bottom-0 -right-4 left-0 z-50"
                            />
                        </span>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch justify-between w-full gap-6">
                {/* نصف اول: آخرین مقاله */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    {latestArticle && <ArticleCardBox key={latestArticle._id} article={latestArticle} />}
                </div>

                {/* نصف دوم: بقیه مقالات در اسلایدر */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <Swiper
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true,
                        }}
                        modules={[Autoplay]}
                        spaceBetween={12} // فاصله بین کارت‌ها کمتر شد
                        slidesPerView={1} // موبایل: یک کارت
                        breakpoints={{
                            768: { slidesPerView: 1.2, spaceBetween: 16 }, // تبلت: کمی بیشتر
                            1024: { slidesPerView: 1.5, spaceBetween: 20 }, // دسکتاپ متوسط
                            1280: { slidesPerView: 2, spaceBetween: 24 }, // دسکتاپ بزرگ
                        }}
                    >
                        {otherArticles.map((article) => (
                            <SwiperSlide key={article._id}>
                                <ArticleCard article={article} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </div>
    );
}
