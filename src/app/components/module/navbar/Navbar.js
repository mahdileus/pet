import Link from "next/link";
import MegaMenu from "./megaMenu";
import MobileHeader from "./MobileHeader";
import Nav from "./Nav";
import { CiUser } from "react-icons/ci";
export default function Navbar({ isLogin, userName }) {
    return (
        <div className="container mt-2 font-yekan-bakh">

            <div className="flex justify-between">

                <div className=" w-[30%] md:w-[68%] flex justify-between items-center">
                    <div className="flex justify-center items-center md:gap-5 gap-13">

                        <a href="#" className="text-base text-secondery font-bold text-nowrap no-underline flex items-center gap-4">
                            <img src="/images/dog-face-svgrepo-com 1.png" alt="" />
                            پت شاپ
                        </a>

                        <div className="lg:hidden categories_btn bg-primary text-white flex justify-center items-center w-lg-[30%]">
                            <span className="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </span>
                        </div>

                        <span className="lg:block hidden">
                            <svg width="1" height="18" viewBox="0 0 1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.5" y1="0.5" x2="0.499999" y2="17.5" stroke="#EAE6F9" strokeLinecap="round" />
                            </svg>
                        </span>


                        <p className="text-base lg:block hidden">
                            غذا و لوازم حیوانات خانگی
                        </p>
                    </div>
                    <div className="lg:flex hidden justify-center items-center gap-5">
                        <div>
                            <a href="#" className="text-lg shadow-md flex justify-center items-center bg-white rounded-4xl px-4 py-1.5">
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.74976 12.0001C2.74976 5.06312 5.06276 2.75012 11.9998 2.75012C18.9368 2.75012 21.2498 5.06312 21.2498 12.0001C21.2498 18.9371 18.9368 21.2501 11.9998 21.2501C5.06276 21.2501 2.74976 18.9371 2.74976 12.0001Z" stroke="#050A14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.9998 8.10498V12" stroke="#050A14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.9956 15.5H12.0046" stroke="#050A14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                راهنما
                            </a>
                        </div>
                        <span>
                            <svg width="1" height="18" viewBox="0 0 1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.5" y1="0.5" x2="0.499999" y2="17.5" stroke="#EAE6F9" strokeLinecap="round" />
                            </svg>
                        </span>
                        <div>
                            <a href="#" className="">
                                <div className="text-xs text-red-600 text-shadow-[0 5px 5px rgba(238, 39, 58, 0.10)] flex ustify-center items-center">شگفت<span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.74922 17.3318C8.10839 17.3318 7.46839 17.0885 6.97922 16.6027L6.37089 15.9943C6.13505 15.7593 5.81922 15.6293 5.48422 15.6285H4.62839C3.24505 15.6285 2.11922 14.5027 2.11922 13.1193V12.2627C2.11839 11.9285 1.98839 11.6127 1.75255 11.3752L1.15422 10.7777C0.174221 9.8035 0.170054 8.211 1.14505 7.23017L1.75339 6.621C1.98839 6.38517 2.11839 6.06933 2.11922 5.73433V4.87933C2.11922 3.49517 3.24505 2.36933 4.62839 2.36933H5.48505C5.81922 2.36933 6.13422 2.23933 6.37172 2.00183L6.97089 1.40433C7.94505 0.424333 9.53672 0.419333 10.5184 1.39517L11.1267 2.0035C11.3634 2.23933 11.6784 2.36933 12.0126 2.36933H12.8692C14.2526 2.36933 15.3784 3.49517 15.3784 4.87933V5.73517C15.3792 6.06933 15.5092 6.38517 15.7451 6.62267L16.3434 7.221C16.8176 7.69267 17.0801 8.321 17.0826 8.99183C17.0842 9.6585 16.8276 10.286 16.3601 10.7602C16.3517 10.7685 16.3442 10.7777 16.3359 10.7852L15.7442 11.3768C15.5092 11.6127 15.3792 11.9285 15.3784 12.2635V13.1193C15.3784 14.5027 14.2526 15.6285 12.8692 15.6285H12.0126C11.6784 15.6293 11.3626 15.7593 11.1259 15.9952L10.5267 16.5935C10.0384 17.0852 9.39339 17.3318 8.74922 17.3318Z" fill="#EE273A" />
                                        <path d="M10.3681 10.6316C10.5815 10.4182 10.9015 10.3566 11.1715 10.4699C11.2506 10.4966 11.339 10.5532 11.4123 10.6257C11.5456 10.7591 11.6181 10.9416 11.6181 11.1416C11.6181 11.3407 11.5456 11.5241 11.4131 11.6566C11.264 11.7957 11.0823 11.8707 10.8973 11.8707C10.7023 11.8707 10.5273 11.7999 10.3765 11.6599C10.3106 11.5941 10.2606 11.5182 10.219 11.4249C10.174 11.3232 10.1681 11.2149 10.1681 11.1416C10.1681 11.0682 10.174 10.9591 10.219 10.8574C10.2615 10.7632 10.324 10.6832 10.3681 10.6316ZM10.3779 6.3415C10.662 6.05817 11.1245 6.05817 11.4087 6.3415C11.6929 6.6265 11.6929 7.08817 11.4087 7.37317L7.12538 11.6565C6.98788 11.794 6.80538 11.8698 6.61038 11.8698C6.41538 11.8698 6.23288 11.794 6.09455 11.6565C5.81038 11.3715 5.81038 10.909 6.09455 10.6248L10.3779 6.3415ZM6.33897 6.18408C6.59063 6.06908 6.9248 6.13658 7.12313 6.34492C7.19397 6.41575 7.24813 6.49325 7.28397 6.57408C7.32313 6.66075 7.34313 6.75908 7.34313 6.85825C7.34313 7.05658 7.26397 7.24075 7.11897 7.37575C6.98147 7.51325 6.80313 7.58742 6.60563 7.58742C6.42063 7.58742 6.23897 7.51158 6.09313 7.37492C5.9548 7.23742 5.87646 7.04908 5.87646 6.85825C5.87646 6.67658 5.95313 6.48992 6.08813 6.34575C6.1623 6.27075 6.25063 6.21408 6.33897 6.18408Z" fill="white" />
                                    </svg></span>
                                </div>
                                <div className="text-xs text-red-600 text-shadow-[0 5px 5px rgba(238, 39, 58, 0.10)]">انگیز امروز</div>
                            </a>
                        </div>
                    </div>
                </div>




                <div className=" w-[70%] md:w-[30%]  flex md:justify-center justify-end  items-center lg:gap-3 md:gap-2 gap-7 z-20">

                    <div className="hidden md:flex justify-end items-center space-x-1">

                        <span className="flex items-center justify-center">
                            <span className=" text-white font-bold text-xl">9851065</span>
                            <span className="text-yellow-300 font-bold text-xl">0933</span>
                        </span>

                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M14.3525 3.14612C18.0535 3.55712 20.9775 6.47712 21.3935 10.1781" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.4" d="M14.3525 6.68909C16.1235 7.03309 17.5075 8.41809 17.8525 10.1891" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path fillRule="evenodd" clipRule="evenodd" d="M7.70049 16.695C0.802503 9.79622 1.78338 6.63715 2.51055 5.61915C2.60396 5.45462 4.90647 2.00788 7.37459 4.03006C13.5008 9.07545 5.7451 8.36211 10.8894 13.5073C16.0348 18.6514 15.3203 10.8959 20.3659 17.0209C22.3882 19.49 18.9413 21.7924 18.7778 21.8848C17.7598 22.613 14.5995 23.5938 7.70049 16.695Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>

                    <div className="btn grid place-items-center ">
                        <a href="#" className=" bg-white rounded-full  p-1.5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2481 18.8272C15.6877 18.8272 19.2867 15.2283 19.2867 10.7887C19.2867 6.34914 15.6877 2.75016 11.2481 2.75016C6.80857 2.75016 3.20959 6.34914 3.20959 10.7887C3.20959 15.2283 6.80857 18.8272 11.2481 18.8272Z" stroke="#0F295D" strokeWidth="1.5" strokeLinecap="square" />
                                <path d="M16.7369 16.7083L21.2904 21.2499" stroke="#0F295D" strokeWidth="1.5" strokeLinecap="square" />
                            </svg>
                        </a>
                    </div>

                    <div className="btn relative grid place-items-center ">
                        <a href="#" className=" bg-white rounded-full  p-1.5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.75012 3.2499L4.83012 3.6099L5.79312 15.0829C5.87012 16.0199 6.65312 16.7389 7.59312 16.7359H18.5021C19.3991 16.7379 20.1601 16.0779 20.2871 15.1899L21.2361 8.6319C21.3421 7.8989 20.8331 7.2189 20.1011 7.1129C20.0371 7.1039 5.16412 7.0989 5.16412 7.0989" stroke="#0F295D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.1251 10.7948H16.8981" stroke="#0F295D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.15447 20.2025C7.45547 20.2025 7.69847 20.4465 7.69847 20.7465C7.69847 21.0475 7.45547 21.2915 7.15447 21.2915C6.85347 21.2915 6.61047 21.0475 6.61047 20.7465C6.61047 20.4465 6.85347 20.2025 7.15447 20.2025Z" fill="#0F295D" stroke="#0F295D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.4347 20.2025C18.7357 20.2025 18.9797 20.4465 18.9797 20.7465C18.9797 21.0475 18.7357 21.2915 18.4347 21.2915C18.1337 21.2915 17.8907 21.0475 17.8907 20.7465C17.8907 20.4465 18.1337 20.2025 18.4347 20.2025Z" fill="#0F295D" stroke="#0F295D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <span className="grid place-items-center badge absolute text-white rounded-full top-[-6%] right-[2%]">3</span>
                    </div>

                    <div className="w-full grid place-items-center ">

                        {!isLogin ? (
                            <Link
                                href="/login-register"
                                className="text-gray-700 bg-white font-light text-lg bg-light-blue p-2.5 rounded-2xl hidden md:flex justify-between items-center"
                            >
                                <CiUser className="text-gray-700" />
                                <p className="text-sm font-medium lg:text-base">
                                    ورود / ثبت‌نام
                                </p>
                            </Link>
                        ) : (
                            userName && (
                                <Link
                                    href="/p-user/dashboard"
                                    className="text-gray-700 bg-white font-light text-lg bg-light-blue p-2.5 rounded-2xl hidden md:flex justify-between items-center"
                                >
                                    <CiUser className="text-gray-700" />
                                    <p className="text-sm font-medium lg:text-base">
                                        {userName}
                                    </p>
                                </Link>
                            )
                        )}


                    </div>
                </div>
            </div>
            <hr className="w-full text-gray-100 mt-4" />
            <div className="relative flex gap-6 w-full items-center">
                {/* مگا منو */}
                <MegaMenu />

                {/* ناوبری اصلی */}
                <div className="hidden lg:flex justify-center items-center">
                    <Nav />
                </div>
            </div>

            <MobileHeader />
        </div>


    );
}
