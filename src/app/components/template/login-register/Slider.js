"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
export default function Slider() {
    return (
        <div className="w-full">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500 }}
                pagination={{ clickable: true }}
                loop
                className="rounded-xl overflow-hidden"
            >

                <SwiperSlide>
                    <img
                        src="/images/login-page-3.png"
                        className="w-full h-72 object-contain"
                        alt="slide"
                    />
                    <p className="text-center text-primary">طوطی‌ها می‌تونن تا ده‌ها کلمه و جمله رو یاد بگیرن و حتی ازشون در موقعیت درست استفاده کنن! حافظه‌شون فوق‌العاده قویه.</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/login-page-4.png"
                        className="w-full h-72 object-contain"
                        alt="slide"
                    />
                    <p className="text-center text-primary">گربه‌ها می‌تونن صدای صاحبشون رو از بین صدها صدای مختلف تشخیص بدن، فقط همیشه تصمیم نمی‌گیرن بهش واکنش نشون بدن!</p>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}