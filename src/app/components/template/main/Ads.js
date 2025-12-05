import Link from "next/link"
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
export default function Ads() {
    return (
        <div className="container my-22">
            <div className="w-full h-40 flex items-center justify-center bg-linear-to-l from-primary via-[#a8767b] to-[#ffd400] rounded-4xl ">
                <div className="flex justify-between items-center gap-10 ">
                    <div className="select-none">
                        <img src="/images/cat-5.png" />
                    </div>
                    <div>
                        <h2 className="text-white text-4xl font-bold">انواع غذای خشک و درمانی</h2>
                    </div>
                    <div>
                        <Link
                            href="/posts"
                            className="flex group justify-start items-center py-2 px-2 transition-all  rounded-full gap-6 w-41 bg-white border-b-4 border-b-gray-200 hover:border-b-[#6e7e9f91] hover:bg-secondery mt-4"
                        >
                            <p className="font-yekan-bakh text-base font-semibold text-secondery group-hover:text-white"> مشاهده همه</p>
                            <span className="w-10 h-8 relative bg-secondery group-hover:rounded-full group-hover:bg-white rounded-l-full">
                                <HiOutlineArrowLongLeft
                                    size={40}
                                    className="absolute text-white group-hover:-translate-x-2 group-hover:text-secondery transition-all -top-1 bottom-0 -right-4 left-0 z-50"
                                />
                            </span>
                        </Link>

                    </div>
                    <div className="select-none">
                        <img src="/images/db26e1e21b369414b1ae6924ce9fc75d 1.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}