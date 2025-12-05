export const dynamic = "force-dynamic";

import Footer from "@/app/components/module/footer/Footer";
import Navbar from "@/app/components/module/navbar/Navbar";
import ProductHeader from "@/app/components/template/product/ProductHeader";
import ShapeTwo from "@/app/components/template/shape/Shape";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product"

export default async function Product() {
    await connectToDB()
    const product = await ProductModel.findOne({}); // یک محصول
    return (
        < div className="font-yekan-bakh relative overflow-hidden">
            <ShapeTwo />
            <Navbar />

            <div className=" container font-yekan-bakh w-full grid place-items-center">


                <section className="main_container space-y-14 flex flex-col justify-center">
                    <ProductHeader product={JSON.parse(JSON.stringify(product))} />




                    <div className=" shadow-md shadow-gray-200 px-10 py-10 flex rounded-lg">
                        <ul className="flex items-center gap-6">
                            <li >
                                <p className="text-sm cursor-pointer text-[#0F0F0F] hover:text-primary ">
                                    توضیح محصول
                                </p>
                            </li>
                            <li >
                                <p className="text-sm cursor-pointer text-[#0F0F0F] hover:text-primary ">
                                    مشخصات و ویژگی ها
                                </p>
                            </li>
                            <li >
                                <p className="text-sm cursor-pointer text-[#0F0F0F] hover:text-primary ">
                                    نقد و بررسی کاربران
                                </p>
                            </li>
                            <li >
                                <p className="text-sm cursor-pointer text-[#0F0F0F] hover:text-primary ">
                                    پرسش و پاسخ
                                </p>
                            </li>
                        </ul>
                    </div>



                    <div className=" shadow-md shadow-gray-200 px-10 py-10 2x:flex flex-col rounded-lg overflow-hidden gap-4 space-y-10">
                        <div className="space-y-2.5">
                            <h6 className="text-[22px]">خرید مانیتور گیمینگ کولر مستر مدل GA25FC سایز 24.5 اینچ</h6>
                            <p className="text-sm text-gray-500">اگر به دنبال خرید مانیتور حرفه‌ای برای تجربه‌ای روان و هیجان‌انگیز از بازی‌های ویدئویی هستید، مانیتور گیمینگ کولرمستر مدل GA25FC سایز ۲۴.۵ اینچ می‌تواند یکی از بهترین انتخاب‌ها باشد. این مانیتور با طراحی مدرن، نرخ بروزرسانی بالا و قابلیت‌های ویژه مخصوص گیمرها ساخته شده تا شما را در هر نبرد دیجیتالی همراهی کند. نقطه قوت اصلی آن، ترکیب نرخ بروزرسانی ۲۴۰ هرتز با زمان پاسخ‌دهی بسیار سریع است که امکان اجرای بازی‌ها را بدون هیچ‌گونه تأخیر یا تاری تصویری فراهم می‌کند.</p>
                        </div>
                        <div className="space-y-2.5">
                            <h6 className="text-[22px]">ویژگی٬های مانیتور گیمینگ کولر مستر مدل GA25FC</h6>
                            <p className="text-sm text-gray-500">مانیتور کولر مستر GA25FC با سایز ۲۴.۵ اینچ، ترکیبی از عملکرد سریع و رنگ‌های زنده ارائه می‌دهد و به گزینه‌ای ایده‌آل برای گیمرها و کاربران حرفه‌ای تبدیل شده است. رزولوشن Full HD (۱۹۲۰×۱۰۸۰) جزئیات تصاویر را با وضوح بالا نمایش می‌دهد و پنل IPS با زاویه دید گسترده ۱۷۸ درجه رنگ‌ها را طبیعی و پویا نشان می‌دهد.</p>
                        </div>
                        <div className="grid place-items-center">
                            <a href="#" className="group xl:w-1/12 lg:w-[15%] flex items-center justify-center rounded-full border-primary border-2 gap-2 px-2 py-2">
                                <span className="text-sm text-primary group-hover:text-indigo-900">
                                    مشاهده ادامه
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5217f6" className="size-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>



                    <div className="hidden shadow-md shadow-gray-200 px-10 py-10 2x:flex flex-col rounded-lg overflow-hidden gap-4 ">
                        <div className="text-sm text-[#0F0F0F]">قلم نوری</div>
                        <table className="w-full overflow-hidden rounded-lg">

                            <tr className="border-collapse">
                                <td className="bg-gray-100 w-[40%] p-6 text-sm text-gray-400 border-b   border-gray-300 ">سازنده</td>
                                <td className="w-[60%] text-sm p-6 text-gray-400 border-gray-300 border-b border-r">HUION</td>
                            </tr>

                            <tr className="border-collapse">
                                <td className="bg-gray-100 w-[40%] p-6 text-sm text-gray-500 border-b  border-gray-300 ">ابعاد بدنه</td>
                                <td className="w-[60%] text-sm p-6 text-gray-500 border-gray-300 border-b border-r">
                                    589.2×364×22.7 میلی‌متر</td>
                            </tr>

                            <tr className="border-collapse">
                                <td className="bg-gray-100 w-[40%] p-6 text-sm text-gray-400 border-b   border-gray-300 ">وزن</td>
                                <td className="w-[60%] text-sm p-6 text-gray-400 border-gray-300 border-b border-r">
                                    6300 گرم</td>
                            </tr>

                            <tr className="border-collapse">
                                <td className="bg-gray-100 w-[40%] p-6 text-sm text-gray-500 border-gray-300 ">نوع رابط</td>
                                <td className="w-[60%] text-sm p-6 text-gray-500 border-gray-300 border-r">
                                    با سیم
                                </td>
                            </tr>

                        </table>
                    </div>



                    <div className="space-y-10">
                        <div className="shadow-md  shadow-gray-200 px-5 py-5 rounded-lg ">
                            <div className="group flex items-center justify-center bg-green-100 rounded-lg p-6 cursor-pointer">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#49BE78" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </span>
                                <span className="text-sm text-[#49BE78] group-hover:text-green-900">
                                    برای ثبت نظر ابتدا باید وارد شوید!
                                </span>
                            </div>
                        </div>

                        <div className=" shadow-md shadow-gray-200 px-5 py-5 rounded-lg space-y-8">
                            <div className="p-4 w-full space-y-6">
                                <div className="flex md:flex-row flex-col items-center justify-between w-full gap-5 md:gap-0">
                                    <div className="flex md:flex-row flex-col items-center gap-3">
                                        <div className="md:w-[6%] w-[30%] overflow-hidden rounded-full">
                                            <img src="../../pictures/R.jpg" alt="" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="text-[#0F0F0F]">مریم قاسمی</h5>
                                                <span className="bg-gray-300 rounded-full w-1.5 h-1.5"></span>
                                                <span className="text-sm text-[#49BE78]">خریدار</span>
                                            </div>
                                            <div className="text-sm text-gray-400">صاحب‌نظر لپ‌تاپ و کامپیوتر</div>
                                        </div>
                                    </div>
                                    <div className="md:space-y-4 space-y-1">
                                        <ul className="flex justify-between items-center ">
                                            <li className="">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ff9f42" viewBox="0 0 24 24" stroke-width="1" stroke="#ff9f42" className="size-4 ">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                </svg>
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ff9f42" viewBox="0 0 24 24" stroke-width="1" stroke="#ff9f42" className="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                </svg>
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ff9f42" viewBox="0 0 24 24" stroke-width="1" stroke="#ff9f42" className="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                </svg>
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#ff9f42" className="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                </svg>
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#ff9f42" className="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                </svg>
                                            </li>
                                        </ul>
                                        <div className="text-sm text-gray-400">بر اساس نظرات 0 کاربر</div>
                                    </div>
                                </div>



                                <p className="text-sm text-gray-700 lg:w-[80%] md:w-full">
                                    امروز به دستم رسید باتوگه به قیمت، خنک کنندگی خوبی داره و طراحی ظاهریش خوبه متریال و جنس ضعیفه، برد که سوکت روش نصبه با هربار وصل کردن usb باید آمادگی شکستن داشته باشید باید مراعات کنی ولی یکسال گارانتی(نمیدونم واقعی یا اسما) داره که حس دلگرمی میده درکل و خلاصه، به قیمتش ارزش داره یه جنس معمولی ولی پرکاربرد
                                </p>

                                <div className="flex items-center justify-between">
                                    <a href="#" className="flex items-center gap-3">
                                        <span className="text-sm text-primary">مشاهده پاسخ های دیگر</span>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#5217f6" className="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </a>
                                    <div className="text-sm text-gray-400 ">۱۵ آذر ۱۴۰۳</div>
                                </div>

                            </div>


                            <div className="p-4 w-full space-y-6 px-10">
                                <div className="flex md:flex-row flex-col items-center justify-between w-full md:gap-0 gap-6">
                                    <div className="flex items-center md:flex-row flex-col gap-3">
                                        <div className="md:w-[6%] w-[30%] overflow-hidden rounded-full">
                                            <img className="w-full h-full object-center" src="../../pictures/R.jpg" alt="" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="text-[#0F0F0F]">رضا سعادتی</h5>
                                                <span className="bg-gray-300 rounded-full w-1.5 h-1.5"></span>
                                                <span className="text-sm text-[#49BE78]">خریدار</span>
                                            </div>
                                            <div className="text-sm text-gray-400">صاحب‌نظر لپ‌تاپ و کامپیوتر</div>
                                        </div>
                                    </div>
                                    <div className=" flex justify-center items-center gap-6 ">
                                        <div className="flex justify-between items-center gap-1">
                                            <span className="cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="size-6 ">
                                                    <path strokeLinecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                                </svg>
                                            </span>
                                            <span className="text-sm text-gray-500">11</span>
                                        </div>

                                        <div className="flex justify-between items-center gap-1">
                                            <span className="cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                                </svg>
                                            </span>
                                            <span className="text-sm text-gray-500">5</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-700 lg:w-[80%] md:w-full">
                                    امروز به دستم رسید باتوگه به قیمت، خنک کنندگی خوبی داره و طراحی ظاهریش خوبه متریال و جنس ضعیفه، برد که سوکت روش نصبه با هربار وصل کردن usb باید آمادگی شکستن داشته باشید باید مراعات کنی ولی یکسال گارانتی(نمیدونم واقعی یا اسما) داره که حس دلگرمی میده درکل و خلاصه، به قیمتش ارزش داره یه جنس معمولی ولی پرکاربرد
                                </p>

                                <div className="text-sm text-gray-400 ">۱۵ آذر ۱۴۰۳</div>
                            </div>
                        </div>
                    </div>



                    <div className="hidden shadow-md shadow-gray-200 px-5 py-5 rounded-lg ">
                        <div className="group flex items-center justify-center bg-green-100 rounded-lg p-6 cursor-pointer">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#49BE78" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </span>
                            <span className="text-sm text-[#49BE78] group-hover:text-green-900">
                                برای ثبت پرسش ابتدا باید وارد شوید!
                            </span>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}