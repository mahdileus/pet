"use client";
import { FaPercent } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiPackageLight } from "react-icons/pi";

export default function DiscountesBox({ discount }) {
    if (!discount) return null;

    const {
        code,
        percent,
        maxUse,
        uses,
        expiresAt,
        isActive,
        minCartAmount,
    } = discount;

    return (
        <div className="w-full bg-white shadow-md rounded-2xl p-5 flex flex-col gap-4 border border-gray-100">

            {/* Title & Status */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    کد تخفیف: <span className="text-primary">{code}</span>
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {isActive ? "فعال" : "غیرفعال"}
                </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {/* Percent */}
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                    <FaPercent className="text-primary text-lg" />
                    <div>
                        <p className="text-xs text-gray-500">درصد تخفیف</p>
                        <p className="font-bold text-gray-700">{percent}%</p>
                    </div>
                </div>

                {/* Used */}
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                    <PiPackageLight className="text-primary text-lg" />
                    <div>
                        <p className="text-xs text-gray-500">تعداد استفاده</p>
                        <p className="font-bold text-gray-700">
                            {uses} / {maxUse}
                        </p>
                    </div>
                </div>

                {/* Min Cart */}
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                    <MdOutlineAccessTime className="text-primary text-lg" />
                    <div>
                        <p className="text-xs text-gray-500">حداقل مبلغ سبد</p>
                        <p className="font-bold text-gray-700">
                            {minCartAmount.toLocaleString()} تومان
                        </p>
                    </div>
                </div>

                {/* Expiration */}
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                    <CiCalendar className="text-primary text-lg" />
                    <div>
                        <p className="text-xs text-gray-500">تاریخ انقضا</p>
                        <p className="font-bold text-gray-700">
                            {expiresAt
                                ? new Date(expiresAt).toLocaleDateString("fa-IR")
                                : "ندارد"}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
