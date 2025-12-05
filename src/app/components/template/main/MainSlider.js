"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";

export default function MainSlider() {
  const slides = [
    { id: 1, image: "/images/dog.png" },
    { id: 2, image: "/images/dog2.png" },
  ];
                                                                                                                      
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* wrapper with perspective so 3D transforms look correct */}
      <div className="w-full max-w-4xl mx-auto" style={{ perspective: 1400 }}>
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          modules={[Autoplay, EffectCreative]}
          effect={"creative"}
          creativeEffect={{
            prev: {
              translate: [0, 250, -200],
              rotate: [180, 0, 0],

            },
            next: {
              translate: [0, -250, -200],
              rotate: [-180, 0, 0],
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={1}
          grabCursor={true}
          className=""
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="flex items-center justify-center">
              <div className="relative w-full" >
                <img
                  src={slide.image}
                  alt={`slide-${slide.id}`}
                  className="w-full h-full object-contain rounded-3xl"
                />
                {/* اگر خواستی overlay تاریک اضافه کن */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
