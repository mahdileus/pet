"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ProductCard from "../../module/products/ProductCard";
import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
import { IoPawSharp } from "react-icons/io5";

export default function LatestProduct({ products }) {

    return (

        <div className="relative container mt-10">
            <div className="container flex items-center mb-4 gap-5" style={{ padding: 0 }}>
                <span className="hidden md:block border border-green-200 rounded-full p-1.5 bg-green-100">
                    <IoPawSharp size={32} className="text-green-500 " />

                </span>
                {/* این کانتینر در وسط صفحه و همه چی داخلشه */}
                <div className="container mx-auto flex items-center justify-between z-10 py-4" style={{ padding: 0 }}>
                    <span className=" text-secondery text-xl md:text-2xl font-bold">
                        محصولات پت شاپ
                    </span>

                    <Link
                        href="/products"
                        className="flex group justify-start items-center py-2 px-2 transition-all  rounded-full gap-6 w-41  mt-4"
                    >
                        <p className="font-yekan-bakh text-base font-semibold text-secondery group-hover:text-green-600"> مشاهده همه</p>
                        <span className="w-10 h-8 relative bg-green-500 group-hover:rounded-full group-hover:bg-green-600 rounded-l-full">
                            <HiOutlineArrowLongLeft
                                size={40}
                                className="absolute text-white group-hover:-translate-x-2  transition-all -top-1 bottom-0 -right-4 left-0 z-50"
                            />
                        </span>
                    </Link>
                </div>


            </div>
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={1.2}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1.5 },
                    1024: { slidesPerView: 2.5 },
                    1280: { slidesPerView: 4.5 },
                }}
            >
                {products
                    .filter(product => product)
                    .map((product) => (
                        <SwiperSlide key={product._id}>
                            < ProductCard
                                product={product}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}
