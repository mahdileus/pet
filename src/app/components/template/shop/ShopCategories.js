export default function ShopCategories(){
    return(
                    <div className=" w-full mt-10  container flex flex-col justify-center">

                <div className="relative grid md:grid-cols-6  grid-cols-2 lg:mt-10 lg:gap-10 gap-5">
                    <a href="#" className="flex flex-col gap-2 items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/pet-cat-1.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold"> غذای پت </span>
                    </a>

                    <a href="#" className="flex  flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className=" object-cover w-[100px] h-[100px]" src="/images/pet-cat-2.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold">اسباب بازی </span>
                    </a>


                    <a href="#" className="flex flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/pet-cat-3.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold"> لوازم آرایشی و بهداشتی </span>
                    </a>


                    <a href="#" className="flex flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/pet-cat-4.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold"> سلامت پت </span>
                    </a>

                    <a href="#" className="flex flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/pet-cat-5.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold"> تقویتی پت </span>
                    </a>

                    <a href="#" className="flex flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/pet-cat-6.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold"> کتاب آموزشی پت </span>
                    </a>
                </div>

            </div>
    )
}