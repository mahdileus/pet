"use client"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Modules
import { Pagination } from "swiper/modules";

export default function MiddleSlider() {
  return (
<div className="container mx-auto mt-10">

  {/* SLIDER */}
  <div className=" w-full h-[200px]">  {/* ارتفاع ثابت */}
    <Swiper
      pagination={{ dynamicBullets: true }}
      modules={[Pagination]}
      className="w-full h-full rounded-xl overflow-hidden"
    >
      <SwiperSlide>
        <img src="/images/thinslider-1.jpg" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/thinslider-2.jpg" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/thinslider-3.jpg" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/thinslider-4.jpg" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/thinslider-5.jpg" className="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  </div>

</div>

  );
}
