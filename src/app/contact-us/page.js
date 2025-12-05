import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import ShapeTwo from "../components/template/shape/Shape";

export default function contactUs(){
    return(
        < div className="font-yekan-bakh relative overflow-hidden">
           <ShapeTwo/>
        <Navbar/>
            <section class="container font-yekan-bakh mt-20 md:space-x-4 space-y-4 shadow-md shadow-gray-200 md:px-4 py-8 px-5 rounded-lg">
        <div class=" flex flex-col-reverse  lg:flex-row">
            <div class="lg:w-1/2 w-full space-y-16 p-5">
                <div class="flex items-center gap-3">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5217f6" class="size-3 bg-primary rounded-full">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </span>
                    <span>تماس باما</span>
                </div>

                <form class="space-y-10" autocomplete="on">
                    <div class="space-y-3">
                        <label class="w-full text-[18px] flex items-center gap-1.5" for="name">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#EE273A" viewBox="0 0 24 24" stroke-width="1.5" stroke="#EE273A" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </span>
                            <span>نام و نام خانوادگی</span>
                        </label>
                        <input class="block text-sm text-gray-400 bg-gray-100 rounded-lg w-full px-5 py-4" type="text" id="name" placeholder="نام و نام خانوادگی خود را وارد نمایید" />
                    </div>

                    <div class="space-y-3">
                        <label class="w-full text-[18px] flex items-center gap-1.5" for="email">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#EE273A" viewBox="0 0 24 24" stroke-width="1.5" stroke="#EE273A" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </span>
                            <span>آدرس ایمیل</span>
                        </label>
                        <input class="block text-sm text-gray-400 bg-gray-100 rounded-lg w-full px-5 py-4" type="email" id="email" placeholder="آرس ایمیل خودرا وارد نمایید" />
                    </div>

                    <div class="space-y-3">
                        <label class="w-full text-[18px] flex items-center gap-1.5" for="phone">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#EE273A" viewBox="0 0 24 24" stroke-width="1.5" stroke="#EE273A" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </span>
                            <span>شماره تلفن</span>

                        </label>
                        <input class="block text-sm text-gray-400 bg-gray-100 rounded-lg w-full px-5 py-4" type="text" id="phone" placeholder="شماره تلفن خودرا وارد نمایید"/>
                    </div>

                    <div class="space-y-3">
                        <label class="w-full text-[18px] flex items-center gap-1.5" for="text">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#EE273A" viewBox="0 0 24 24" stroke-width="1.5" stroke="#EE273A" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </span>
                            <span>پیام شما</span>
                        </label>
                        <textarea class="block text-sm lin text-gray-400 bg-gray-100 rounded-lg w-full px-5 py-4" id="text" placeholder="پیام خودرا برای ما بفرستید"></textarea>
                    </div>

                    <button type="submit" class="bg-primary rounded-lg text-sm text-white px-10 py-3 cursor-pointer hover:bg-[#ff9f42]">ارسال کنید</button>
                </form>
            </div>


            <div class="w-[1.5px] bg-gray-200 h-[700px] hidden lg:block"></div>


            <div class="lg:w-1/2 w-full p-5 space-y-16">
                <div class="w-full h-80">
                    <img class=" w-full h-full object-fill rounded-lg" src="https://datakadeh.com/Images/ProductImages/af5d80938c7144adae47e599b95c4130.webp" alt="" />
                </div>

                <div class="w-full space-y-3">
                    <div class="flex items-center gap-2">
                        <span class="lg:text-[20px] md:text-[14px]">آدرس ایمیل: </span>
                        <span class="lg:text-[18px] md:text-[14px] text-gray-400"> info@lioncomputer.com</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="lg:text-[20px] md:text-[14px]">تلفن: </span>
                        <span class="lg:text-[18px] text-gray-400 md:text-[14px]">91005666-021</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="lg:text-[20px] md:text-[14px]">آدرس دفتر مرکزی: </span>
                        <span class="lg:text-[18px] md:text-[14px] text-gray-400">  تهران، خیابان حافظ، بالاتر از زرتشت، کوچه جاوید، پلاک ۲۴</span>
                    </div>
                </div>

                <div class="w-full">
                    <ul class="flex items-center gap-2">
                        <li class="">
                            <a href="#" class="grid place-items-center ">
                                <svg class="bg-primary hover:bg-[#ff9f42] rounded-full p-2 size-10" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9596 3.20159C21.2618 1.72835 19.8148 0.504059 18.412 1.04607L1.21606 7.68994C-0.350536 8.29522 -0.42034 10.4859 1.10454 11.1896L4.84932 12.918L6.63076 19.153C6.7233 19.4769 6.9803 19.7277 7.30635 19.8122C7.6324 19.8966 7.97882 19.8023 8.21699 19.5641L10.9611 16.8199L14.8051 19.703C15.921 20.5398 17.5281 19.9303 17.8083 18.5639L20.9596 3.20159ZM1.90127 9.4634L19.0972 2.81954L15.9459 18.182L11.4423 14.8042C11.0639 14.5204 10.5343 14.558 10.1998 14.8926L9.02443 16.0679L9.37758 14.1257L16.2972 7.20609C16.634 6.86934 16.6696 6.33536 16.3805 5.95689C16.0914 5.57841 15.5669 5.47226 15.1534 5.70854L5.59721 11.1692L1.90127 9.4634ZM6.76239 12.6931L7.33882 14.7107L7.56013 13.4934C7.59473 13.3032 7.68651 13.128 7.82324 12.9913L9.9335 10.8811L6.76239 12.6931Z" fill="white"/>
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="grid place-items-center rounded-full">
                                <svg class="bg-primary hover:bg-[#ff9f42] rounded-full p-2 size-10" width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_152_1033)">
                                        <path d="M16.5544 0H19.7774L12.7359 8.04833L21.0199 19H14.5334L9.45326 12.3577L3.64026 19H0.41502L7.94668 10.3916L0 0H6.65079L11.243 6.07115L16.5544 0ZM15.4231 17.0707H17.2092L5.68043 1.82804H3.764L15.4231 17.0707Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_152_1033">
                                            <rect width="21.0199" height="19" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="grid place-items-center rounded-full">
                                <svg class="bg-primary hover:bg-[#ff9f42] rounded-full p-2 size-10" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47712 2 2 6.47712 2 12C2 13.64 2.39537 15.1896 3.09637 16.5569L2.02038 21.0762C1.99077 21.2009 1.99355 21.331 2.02845 21.4542C2.06336 21.5774 2.12923 21.6896 2.21979 21.7802C2.31035 21.8708 2.42259 21.9366 2.54581 21.9715C2.66904 22.0065 2.79915 22.0092 2.92375 21.9796L7.44312 20.9036C8.81037 21.6046 10.36 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47712 17.5229 2 12 2ZM3.5 12C3.5 7.30562 7.30562 3.5 12 3.5C16.6944 3.5 20.5 7.30562 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.5145 20.5 9.12 20.1196 7.90662 19.4514C7.74334 19.3615 7.55245 19.3356 7.37112 19.3787L3.76187 20.2381L4.62125 16.6289C4.66441 16.4476 4.63852 16.2566 4.54862 16.0934C3.88037 14.8799 3.5 13.4855 3.5 12ZM9.25287 14.7471C10.7497 16.2439 12.7456 17.248 14.972 17.487C16.444 17.6449 17.5 16.4321 17.5 15.1724V14.2979C17.5 13.7883 17.3357 13.2923 17.0315 12.8834C16.7274 12.4746 16.2995 12.1747 15.8114 12.0282L15.7417 12.0074L15.6705 11.9934L14.6677 11.7959C14.3453 11.7124 14.0089 11.6979 13.6804 11.7532C13.3519 11.8085 13.0388 11.9324 12.7615 12.1169C12.4351 11.8597 12.1403 11.5649 11.8831 11.2385C12.0676 10.9611 12.1916 10.648 12.247 10.3195C12.3023 9.99098 12.2877 9.6545 12.2042 9.332L12.0065 8.32937L11.9925 8.25812L11.9716 8.1885C11.8252 7.70045 11.5253 7.27261 11.1165 6.96845C10.7077 6.66429 10.2118 6.50001 9.70225 6.5H8.8275C7.56787 6.5 6.355 7.55575 6.51287 9.02787C6.75187 11.2541 7.75587 13.2502 9.25287 14.7471ZM13.4594 13.4747C13.5704 13.3638 13.7094 13.2849 13.8616 13.2466C14.0138 13.2082 14.1735 13.2118 14.3239 13.2569L15.3805 13.465C15.5596 13.5188 15.7165 13.6288 15.8281 13.7789C15.9397 13.9289 16 14.1109 16 14.2979V15.1724C16 15.6525 15.6095 16.0467 15.1321 15.9955C13.9394 15.8681 12.7907 15.4736 11.7712 14.8415C11.2425 14.5139 10.7534 14.1263 10.3136 13.6864C9.87372 13.2466 9.48611 12.7575 9.1585 12.2287C8.5264 11.2093 8.13198 10.0605 8.0045 8.86775C7.95325 8.39037 8.3475 8 8.8275 8H9.70212C9.88906 8.00005 10.071 8.06035 10.221 8.17197C10.3709 8.28358 10.4809 8.44056 10.5346 8.61962L10.743 9.676C10.7881 9.82636 10.7917 9.98614 10.7533 10.1384C10.715 10.2906 10.6361 10.4296 10.5251 10.5406L10.3851 10.6806C10.2925 10.7729 10.2259 10.888 10.192 11.0142C10.1455 11.1896 10.1665 11.3794 10.2674 11.5421C10.5419 11.9854 10.8668 12.3955 11.2355 12.7642C11.6042 13.133 12.0144 13.458 12.4577 13.7325C12.6205 13.8332 12.8101 13.8544 12.9856 13.8079C13.1119 13.774 13.227 13.7074 13.3192 13.6147L13.4594 13.4747Z" fill="white"/>
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="social_items grid place-items-center rounded-full">
                                <svg class="bg-primary hover:bg-[#ff9f42] rounded-full p-2 size-10" width="23" height="23" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_152_1039)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 16.5C14.0376 16.5 16.5 14.0376 16.5 11C16.5 7.96243 14.0376 5.5 11 5.5C7.96243 5.5 5.5 7.96243 5.5 11C5.5 14.0376 7.96243 16.5 11 16.5ZM11 14.6667C13.025 14.6667 14.6667 13.025 14.6667 11C14.6667 8.97496 13.025 7.33333 11 7.33333C8.97496 7.33333 7.33333 8.97496 7.33333 11C7.33333 13.025 8.97496 14.6667 11 14.6667Z" fill="white"/>
                                        <path d="M16.4999 4.58331C15.9936 4.58331 15.5833 4.99372 15.5833 5.49998C15.5833 6.00624 15.9936 6.41665 16.4999 6.41665C17.0062 6.41665 17.4166 6.00624 17.4166 5.49998C17.4166 4.99372 17.0062 4.58331 16.4999 4.58331Z" fill="white"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.51621 3.91974C0.916748 5.09626 0.916748 6.6364 0.916748 9.71669V12.2834C0.916748 15.3636 0.916748 16.9038 1.51621 18.0803C2.04351 19.1152 2.8849 19.9566 3.9198 20.4839C5.09632 21.0834 6.63646 21.0834 9.71675 21.0834H12.2834C15.3637 21.0834 16.9039 21.0834 18.0803 20.4839C19.1152 19.9566 19.9566 19.1152 20.4839 18.0803C21.0834 16.9038 21.0834 15.3636 21.0834 12.2834V9.71669C21.0834 6.6364 21.0834 5.09626 20.4839 3.91974C19.9566 2.88484 19.1152 2.04345 18.0803 1.51615C16.9039 0.916687 15.3637 0.916687 12.2834 0.916687H9.71675C6.63646 0.916687 5.09632 0.916687 3.9198 1.51615C2.8849 2.04345 2.04351 2.88484 1.51621 3.91974ZM12.2834 2.75002H9.71675C8.14635 2.75002 7.07881 2.75145 6.25365 2.81886C5.44988 2.88453 5.03885 3.00356 4.75212 3.14966C4.06219 3.5012 3.50126 4.06213 3.14972 4.75206C3.00362 5.03879 2.88459 5.44982 2.81892 6.25359C2.75151 7.07875 2.75008 8.14629 2.75008 9.71669V12.2834C2.75008 13.8538 2.75151 14.9212 2.81892 15.7464C2.88459 16.5503 3.00362 16.9613 3.14972 17.248C3.50126 17.9379 4.06219 18.4988 4.75212 18.8504C5.03885 18.9965 5.44988 19.1155 6.25365 19.1812C7.07881 19.2486 8.14635 19.25 9.71675 19.25H12.2834C13.8538 19.25 14.9213 19.2486 15.7465 19.1812C16.5503 19.1155 16.9613 18.9965 17.2481 18.8504C17.938 18.4988 18.4989 17.9379 18.8504 17.248C18.9965 16.9613 19.1156 16.5503 19.1812 15.7464C19.2486 14.9212 19.2501 13.8538 19.2501 12.2834V9.71669C19.2501 8.14629 19.2486 7.07875 19.1812 6.25359C19.1156 5.44982 18.9965 5.03879 18.8504 4.75206C18.4989 4.06213 17.938 3.5012 17.2481 3.14966C16.9613 3.00356 16.5503 2.88453 15.7465 2.81886C14.9213 2.75145 13.8538 2.75002 12.2834 2.75002Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_152_1039">
                                            <rect width="22" height="22" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


    </section>
    <Footer/>
    </div>
    )
}