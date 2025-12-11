export default function ShopCategories(){
    return(
                    <div className=" w-full mt-10  container flex flex-col justify-center">

                <div className="relative grid md:grid-cols-6  grid-cols-2 lg:mt-10 lg:gap-10 gap-5">
                    <a href="#" className="flex flex-col gap-2 items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/cat.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold">  گربه </span>
                    </a>

                    <a href="#" className="flex  flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className=" object-cover w-[100px] h-[100px]" src="/images/dog.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold"> سگ </span>
                    </a>


                    <a href="#" className="flex flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/parrot.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold">پرندگان</span>
                    </a>


                    <a href="#" className="flex flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/rabbit.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold">  جوندگان </span>
                    </a>

                    <a href="#" className="flex flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/clown-fish.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold">  آبزیان </span>
                    </a>

                    <a href="#" className="flex flex-col gap-2  items-center justify-center category_poster_item rounded-3xl ">
                        <img className="w-[100px] h-[100px] object-cover" src="/images/aligator.png" alt="" />
                        <span className="text-[16px] text-secondery font-bold">سایر حیوانات</span>
                    </a>
                </div>

            </div>
    )
}