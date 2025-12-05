"use client"

export default function Shape() {
    return (
        <>
        <div className="absolute top-20 left-0 2xl:left-30"> 
            <img src="/images/circle.png"/>
        </div>
            <div
                className="absolute top-0 left-30 2xl:left-60 w-[450px] h-[850px] z-10 rounded-b-full bg-no-repeat bg-bottom"
                style={{
                    backgroundImage: "url('/images/Rectangle-60.png')",
                    backgroundSize: "cover",
                    opacity: 0.2, // شدت تصویر رو کم می‌کنه
                }}
            >

            </div>
            <div className="absolute top-0 left-30 2xl:left-60 w-[450px] h-[850px] -z-10 rounded-b-full  bg-primary" >
            </div>
        </>

    );
}