import Link from "next/link"
    ;
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { PiTelegramLogo, PiInstagramLogo, PiYoutubeLogo } from "react-icons/pi"
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
export default function AboutUs() {
    return (
        <div className="container">
            <hr className="text-gray-200 my-12" />
            <div className="flex items-center justify-between">

                <div className="w-1/2">
                    <div>
                        <h2 className="text-3xl font-bold  bg-linear-to-r from-primary to-secondery bg-clip-text text-transparent"> درباره ما</h2>
                        <hr className="border-t-4 border-primary w-10 rounded-full my-3" />
                    </div>
                    <div>
                        <p className="description text-justify ">
                            اگر قصد دارید برای شغل خود یک وبسایت راه اندازی کنید باید توجه داشته باشید که یکی از مهمترین بخش ها طراحی رابط  کاربری آن است که نقش اساسی در جذب و حفظ کاربر دارد. حتی اگر مطالب و  محصولات حرفه ای داشته باشید اما سایت شما رابط کاربری ضعیفی داشته باشد ،  کاربر آن را ترک میکند و تمام هزینه و زمان شما هدر خواهد رفت و شما با  گروهی از مخاطبان ناراضی روبرو خواهید شد ، اتفاقی که با یک انتخاب اصولی  میشود از آن جلوگیری کرد و با ارائه یک طرح حرفه ای مخاطبان خود را دائمی  کرده و اعتماد آنها را جذب کرد فقط باید توجه داشته باشید که یک طراح حرفه  ای را انتخاب کنید که بتواند خروجی استاندارد و مطابق زمینه کاری شما ارائه دهد.   </p>
                        <div className="flex items-center justify-start gap-10">
                            <Link
                                href="/posts"
                                className="flex group justify-start items-center py-2 px-2 transition-all  rounded-full gap-6 w-41 bg-green-500 border-b-4 border-b-green-600 hover:border-b-[#6e7e9f91] hover:bg-secondery mt-4"
                            >
                                <p className="font-yekan-bakh text-base font-semibold text-white"> مشاهده همه</p>
                                <span className="w-10 h-8 relative bg-secondery group-hover:rounded-full group-hover:bg-green-600 rounded-l-full">
                                    <HiOutlineArrowLongLeft
                                        size={40}
                                        className="absolute text-white group-hover:-translate-x-2  transition-all -top-1 bottom-0 -right-4 left-0 z-50"
                                    />
                                </span>
                            </Link>
                            <div className="flex gap-4 mt-5 text-xl justify-center md:justify-start text-third font-bold">
                                <a href="https://www.instagram.com/t1w.ir/">
                                    <PiInstagramLogo size={24} className="hover:text-primary cursor-pointer" />
                                </a>
                                <a href="https://t.me/09125673763">
                                    <PiTelegramLogo size={24} className="hover:text-primary cursor-pointer" />
                                </a>
                                <PiYoutubeLogo size={24} className="hover:text-primary cursor-pointer" />
                                <FaWhatsapp size={24} className="hover:text-primary cursor-pointer" />
                                <FaXTwitter size={24} className="hover:text-primary cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-end">
                    <img src="/images/Group-151.png" />
                </div>
            </div>

        </div>

    )
}