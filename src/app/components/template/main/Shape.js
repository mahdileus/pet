"use client"

export default function Shape() {
    return (
        <>
            {/* دایره */}
            <div className="hidden md:absolute top-20 left-0 2xl:left-30 md:block"> 
                <img src="/images/circle.png" alt="Circle Shape" />
            </div>

            {/* تصویر Rectangle */}
            <div
                className="hidden md:absolute top-0 left-30 2xl:left-60 w-[450px] h-[850px] z-10 rounded-b-full bg-no-repeat bg-bottom md:block"
                style={{
                    backgroundImage: "url('/images/Rectangle-60.png')",
                    backgroundSize: "cover",
                    opacity: 0.2, // شدت تصویر کم شده
                }}
            ></div>

            {/* پس‌زمینه رنگی */}
            <div className="hidden md:absolute top-0 left-30 2xl:left-60 w-[450px] h-[850px] -z-10 rounded-b-full bg-primary md:block"></div>
        </>
    );
}
