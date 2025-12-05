"use client";
import {
  FaPhone,
  FaInstagram,
  FaTelegram,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaWhatsapp
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-indigo-600 to-blue-700 text-white pt-16 relative overflow-hidden mt-22">
      {/* بخش اصلی فوتر */}
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* ستون اول - توضیحات برند */}
          <div className="md:col-span-2 space-y-4 text-center md:text-right">
            <div className="flex items-center justify-start gap-4">
              <img src="/images/logo-white.png" alt="logo" />           
            <h2 className="font-bold text-xl">
              پت شاپ | <span className="font-medium text-base">غذا و لوازم حیوانات خانگی</span>
            </h2>
            </div>

            <p className="text-sm leading-7 text-justify text-white/80">
              اگر قصد دارید برای شغل خود یک وبسایت راه  اندازی کنید باید توجه داشته باشید که یکی از مهمترین بخش ها طراحی رابط  کاربری آن است که نقش اساسی در جذب و حفظ کاربر دارد. حتی اگر مطالب و  محصولات حرفه ای داشته باشید اما سایت شما رابط کاربری ضعیفی داشته باشد ،  کاربر آن را ترک میکند و تمام هزینه و زمان شما هدر خواهد رفت و شما با  گروهی از مخاطبان ناراضی روبرو خواهید شد ، اتفاقی که با یک انتخاب اصولی  میشود از آن جلوگیری کرد و با ارائه یک طرح حرفه ای مخاطبان خود را دائمی  کرده و اعتماد آنها را جذب کرد فقط باید توجه داشته باشید که یک طراح حرفه  ای را انتخاب کنید که بتواند خروجی استاندارد و مطابق زمینه کاری شما ارائه دهد</p>
          </div>

          {/* ستون‌های لینک سریع */}
          {[1, 2].map((col) => (
            <div key={col} className="pt-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-8 h-1 bg-green-500 rounded-full"></div>
                <h3 className="font-bold text-lg text-center md:text-right">
                  دسترسی سریع
                </h3>
              </div>
              <ul className="space-y-2 text-sm leading-6 text-center md:text-right">
                <li><Link href="#">صفحه اصلی</Link></li>
                <li><Link href="#">محصولات</Link></li>
                <li><Link href="#">درباره ما</Link></li>
                <li><Link href="#">تماس با ما</Link></li>
                <li><Link href="#">سؤالات متداول</Link></li>
                <li><Link href="#">راهنما</Link></li>
                <li><Link href="#">پیگیری سفارش</Link></li>
              </ul>
            </div>
          ))}

          {/* ستون آخر - نماد اعتماد */}
          <div
            className="relative flex flex-col justify-center items-center w-40 h-[280px] space-y-4 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: "url('/images/layer.png')",
            }}
          >
            <div className="flex flex-col justify-center items-center space-y-4 absolute inset-0">
              <Image src="/images/enamad.png" alt="Enamad" width={70} height={70} />
              <Image src="/images/samandehi.png" alt="Samandehi" width={70} height={70} />
              <Image src="/images/award.png" alt="Award" width={70} height={70} />
            </div>
          </div>

        </div>
      </div>

      {/* گربه پایین */}
      <div className="flex items-center justify-center -mt-48">
        <img src="/images/cat-footer.png" className="opacity-25" />
      </div>

      {/* نوار پایین فوتر */}
      <div
        className="container bg-secondery px-6 py-10 rounded-3xl relative z-10 shadow-4xl"
        style={{
          backgroundImage: "url(/images/linear-footer.png)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-10">
          <div className="flex gap-5 text-xl">
            <Link href="#" className="border group border-gray-300/25 rounded-full p-1.5 hover:bg-white">
              <FaXTwitter className="group-hover:text-secondery" />
            </Link>
            <Link href="#" className="border group border-gray-300/25 rounded-full p-1.5 hover:bg-white">
              <FaWhatsapp className="group-hover:text-secondery" />
            </Link>
            <Link href="#" className="border group border-gray-300/25 rounded-full p-1.5 hover:bg-white">
              <FaInstagram className="group-hover:text-secondery" />
            </Link>
            <Link href="#" className="border group border-gray-300/25 rounded-full p-1.5 hover:bg-white">
              <FaLinkedin className="group-hover:text-secondery" />
            </Link>
            <Link href="#" className="border group border-gray-300/25 rounded-full p-1.5 hover:bg-white">
              <FaGithub className="group-hover:text-secondery" />
            </Link>
            <Link href="#" className="border group border-gray-300/25 rounded-full p-1.5 hover:bg-white">
              <FaTelegram className="group-hover:text-secondery" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <FaPhone />
              <span>09339851065</span>
            </div>
            <div className="flex items-center gap-2">
              <span>info@sitename.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="flex items-center justify-center py-6">
        <p>
          تمامی حقوق برای پت شاپ محفوظ است — توسعه توسط{" "}
          <Link href="https://t1w.ir" className="text-orange-500 font-bold text-base">
            تیوان
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
