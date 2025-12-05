export default function ProductHeader({product}){

    
    return(
                        <div className="shadow-md bg-white shadow-gray-200 flex lg:flex-row md:py-10 md:px-10 py-5 px-5 flex-col  rounded-lg">
                    <div className="xl:w-[38%] lg:w-[50%] w-full relative flex flex-col justify-center items-center">
                        <div className="absolute top-0 right-[6%]">
                            <ul className="flex items-center gap-4">
                                <li>
                                    <a className="" href="#">
                                        <svg className="hover:bg-gray-200 p-1 size-7 rounded-full  transition-colors duration-100 ease-linear" width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11845 9.34832C0.0454474 5.99832 1.29945 2.16932 4.81645 1.03632C6.66645 0.439322 8.70845 0.791322 10.2464 1.94832C11.7014 0.823322 13.8184 0.443322 15.6664 1.03632C19.1834 2.16932 20.4454 5.99832 19.3734 9.34832C17.7034 14.6583 10.2464 18.7483 10.2464 18.7483C10.2464 18.7483 2.84445 14.7203 1.11845 9.34832Z" stroke="gray" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M14.2466 4.4502C15.3166 4.7962 16.0726 5.7512 16.1636 6.8722" stroke="gray" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="size-8 hover:bg-gray-200 p-1 rounded-full  transition-colors duration-100 ease-linear">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="size-7 hover:bg-gray-200 p-1 rounded-full  transition-colors duration-100 ease-linear">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid items-center lg:w-[90%] md:w-[50%] w-[60%] my-5 md:my-0 ">
                            <img className="w-full h-full object-center " src="../../pictures/cat-5.png" alt=""/>
                        </div>

                        <div className="w-full absolute flex justify-between px-[3%] md:top-[47%] lg:top-[45%]">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className=" hover:bg-gray-200 p-1 size-7 rounded-full  transition-colors duration-100 ease-linear">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="hover:bg-gray-200 p-1 size-7 rounded-full  transition-colors duration-100 ease-linear ">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </span>
                        </div>
                        <div className="lg:grid grid-cols-4 items-center gap-1 px-[4%] hidden">
                            <div className=" border border-gray-200 w-full rounded-3xl">
                                <img className="w-full h-full object-center" src="/images/dog-food.jpg" alt=""/>
                            </div>
                            <div className=" border border-gray-200 w-full rounded-3xl">
                                <img className="w-full h-full object-center" src="/images/dog-food.jpg" alt=""/>
                            </div>
                            <div className=" border border-gray-200 w-full rounded-3xl">
                                <img className="w-full h-full object-center" src="/images/dog-food.jpg" alt=""/>
                            </div>
                            <div className=" border border-gray-200 w-full rounded-3xl">
                                <img className="w-full h-full object-center" src="/images/dog-food.jpg" alt=""/>
                            </div>
                        </div>
                    </div>


                    <div className="lg:w-px lg:h-[600px] md:h-px md:w-full bg-gray-200 lg:mx-16 flex justify-center md:mx-0 md:my-10"></div>


                    <div className="w-full space-y-16">
                        <div className="flex md:flex-row flex-col justify-between items-center">
                            <div className="space-y-2">
                                <h4 className="text-secondery font-bold text-xl">{product.title}</h4>
                                <p className="text-sm text-gray-400">{product.slug}</p>
                            </div>

                            <div className="flex flex-col justify-between items-center gap-3">
                                <span>
                                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.7257 23.4321C13.3673 23.4321 14.8942 22.9577 16.1407 22.0605C17.9943 20.727 19.6101 18.477 20.5736 15.8872C21.5834 13.173 21.7797 10.4153 21.1264 8.12213C21.1248 8.11611 21.1229 8.10991 21.1211 8.10389C20.105 4.70196 16.5694 2.58852 11.8937 2.58852C10.1265 2.58852 8.27743 2.90729 6.54669 3.51037C3.50771 4.56843 1.26659 6.73124 0.398115 9.44408C-0.469184 12.1526 0.0954054 15.2059 1.94697 17.8212C1.95115 17.8272 1.9555 17.8333 1.95986 17.8391C4.47859 21.2887 8.22054 23.4318 11.725 23.4321C11.7254 23.4321 11.7257 23.4321 11.7257 23.4321ZM14.6956 10.6514C15.7737 10.6127 16.6671 11.4422 16.7096 12.5118C16.752 13.5799 15.9176 14.4836 14.8495 14.5259C14.8236 14.5269 14.7978 14.5274 14.7722 14.5274C13.7274 14.5274 12.8766 13.7096 12.8351 12.6656C12.794 11.5963 13.6287 10.6937 14.6956 10.6514Z" fill="#0F295D" />
                                        <path d="M39.2773 14.5274C39.3029 14.5274 39.3286 14.5269 39.3544 14.5259C39.8718 14.5053 40.3502 14.2846 40.7016 13.9042C41.0532 13.5237 41.2354 13.0292 41.2148 12.5117C41.1723 11.4419 40.2784 10.6089 39.2005 10.6512C38.6827 10.6718 38.2041 10.8927 37.8527 11.2736C37.5017 11.6539 37.3196 12.1482 37.3402 12.6654C37.3819 13.7096 38.2326 14.5274 39.2773 14.5274Z" fill="#0F295D" />
                                        <path d="M41.494 34.982C31.9611 34.982 29.4031 29.6876 28.7424 27.3982C31.4248 26.3786 33.2319 23.1443 33.2319 20.8364C33.2319 17.8947 30.4476 15.5014 27.0251 15.5014C23.6025 15.5014 20.8183 17.8947 20.8183 20.8364C20.8183 23.1443 22.6253 26.3786 25.3077 27.3982C24.6472 29.6878 22.0892 34.982 12.5561 34.982C11.7242 34.982 11.05 35.6562 11.05 36.488C11.05 37.3198 11.7242 37.994 12.5561 37.994C20.1477 37.994 24.0841 34.9679 26.0493 32.4294C26.4297 31.9381 26.7513 31.446 27.0251 30.9674C27.2986 31.446 27.6203 31.9381 28.0006 32.4294C31.5612 37.0286 37.3036 37.994 41.4939 37.994C42.3257 37.994 42.9999 37.3198 42.9999 36.488C42.9999 35.6562 42.3257 34.982 41.494 34.982Z" fill="#0F295D" />
                                        <path d="M28.285 37.3995H25.7651C24.9332 37.3995 24.259 38.0737 24.259 38.9055C24.259 39.7373 24.9332 40.4115 25.7651 40.4115H28.285C29.1168 40.4115 29.791 39.7373 29.791 38.9055C29.791 38.0737 29.1168 37.3995 28.285 37.3995Z" fill="#0F295D" />
                                    </svg>
                                </span>
                                <div>
                                    <ul className="flex justify-between items-center gap-0.5">
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
                                </div>
                            </div>
                        </div>




                        <div className="flex lg:flex-row flex-col justify-center items-center gap-14 lg:gap-0 ">
                            <div className="lg:w-[40%] w-full lg:h-100 h-full">
                                <ul className="space-y-0.5">
                                    <li>
                                        <p className="text-gray-400 text-sm">نوع رابط: با سیم</p>
                                    </li>
                                    <li>
                                        <p className="text-gray-400 text-sm">نوع اتصال: USB-C, HDMI, DisplayPort, USB-A و جک 3.5 میلی متری</p>
                                    </li>
                                    <li>
                                        <p className="text-gray-400 text-sm">رزولوشن سطح: 5080 خط براینچ</p>
                                    </li>
                                    <li>
                                        <p className="text-gray-400 text-sm">رزولوشن نمایشگر: 2160 × 3840 (UHD)</p>
                                    </li>
                                    <li>
                                        <p className="text-gray-400 text-sm">حساسیت به فشار سطح: 8192 سطح</p>
                                    </li>
                                </ul>
                            </div>


                            <div className="lg:w-[60%] w-full h-100 space-y-6 md:gap-4">
                                <div className="space-y-2">
                                    <p className="font-light text-gray-400 text-sm">کد کالا: Lion-Product-820525</p>
                                    <p className="text-gray-400 text-sm"><span>موجودی محصول: </span><span className="text-[#2C00A7]">موجود</span></p>
                                </div>
                                <div className="bg-gray-200 w-full h-px my-6"></div>
                                <div className="bg-gray-200 rounded-md w-full p-4 space-y-2">
                                    <div className="text-[#2C00A7] text-sm">انتخاب گارانتی :</div>

                                    <div className=" flex items-center text-gray-500 text-sm gap-1 ">
                                        <svg className="w-3 h-3 text-[#2C00A7]" fill="currentColor" viewBox="0 0 20 20">
                                            <circle cx="10" cy="10" r="5" />
                                        </svg>
                                        گارانتی شرکتی - 6 ماه
                                    </div>
                                </div>
                                <div className="flex xl:flex-row flex-col items-end justify-between">
                                    <div className="xl:w-1/5 w-full">
                                        <div className="text-gray-400 text-sm">تعداد:</div>
                                        <ul className="flex items-center justify-between w-full">
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#49BE78" className="size-6 hover:bg-green-200 rounded-full p-1 shadow-emerald-200 shadow-sm ">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </li>
                                            <li>
                                                1
                                            </li>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke=" #EE273A" className="size-6 hover:bg-red-200 rounded-full p-1 shadow-red-200 shadow-sm">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                                </svg>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="flex w-full gap-2 items-center flex-col text-gray-400">
                                        <div className="flex items-center xl:justify-end justify-center w-full">
                                            <span className="line-through text-sm text-center me-2">{product.price} تومان</span>
                                            <span className="text-[#2C00A7] text-center">
                                                210,000,000
                                            </span>
                                            <span className="text-[#2C00A7] text-center">
                                                تومان
                                            </span>
                                        </div>
                                        <div className="text-sm xl:text-end w-full text-center">
                                            4٪ تخفیف
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm text-end">قیمت مناسب‌تری سراغ دارید؟</div>
                                    <div className="flex group bg-primary hover:bg-[#49BE78] cursor-pointer p-4 rounded-2xl gap-2 items-center justify-center">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" className="size-9 bg-[#737AFFFF] group-hover:bg-[#ff9f42] p-2 rounded-full">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                        </span>
                                        <span className="text-white text-sm">فزودن به سبد خرید </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
    )
}