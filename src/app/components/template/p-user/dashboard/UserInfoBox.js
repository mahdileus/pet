"use client";

import {
    CiUser,
    CiPhone,
    CiMail,
    CiCreditCard1,
} from "react-icons/ci";

const fields = [
    {
        icon: CiUser,
        label: "نام و نام خانوادگی",
        key: "name",
    },
    {
        icon: CiPhone,
        label: "شماره تماس",
        key: "phone",
    },
    {
        icon: CiCreditCard1,
        label: "کد ملی",
        key: "idCard",
    },
    {
        icon: CiMail,
        label: "آدرس ایمیل",
        key: "email",
    },
];

export default function UserInfoBox({ user }) {
    return (
        <div className="w-full bg-white rounded-3xl  p-6">

            {/* هدر */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-secondery">
                    مشخصات و اطلاعات تماس
                </h2>

                <button className="bg-primary mt-4 text-white text-sm font-bold rounded-xl border-b-4 border-b-[#2C00A7] hover:opacity-90 transition-all py-2 px-5 flex justify-center items-center cursor-pointer select-none">
                    ویرایش اطلاعات
                </button>
            </div>

            {/* محتوا */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {fields.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col p-4 w-full bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <item.icon size={24} className="text-green-500" />
                            <span className="text-gray-600 text-sm">{item.label}</span>
                        </div>

                        <span className="text-lg font-medium text-secondery">
                            {user?.[item.key] || "-"}
                        </span>
                    </div>
                ))}

            </div>
        </div>
    );
}
