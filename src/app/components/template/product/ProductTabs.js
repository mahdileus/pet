// components/template/product/ProductTabs.jsx
"use client";

import { useState } from "react";

const tabs = [
  { id: "description", label: "توضیح محصول" },
  { id: "specs", label: "مشخصات و ویژگی ها" },
  { id: "reviews", label: "نقد و بررسی کاربران" },
  { id: "questions", label: "پرسش و پاسخ" },
];

export default function ProductTabs({ product, attributes }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16 bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* سر تیتر تب‌ها */}
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-lg font-bold text-center">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-block py-6 px-8 border-b-4 transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-500 border-transparent hover:text-indigo-600 hover:border-indigo-300"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* محتوای تب */}
      <div className="p-8 lg:p-12">
        {activeTab === "description" && (
          <div className="prose max-w-none text-gray-700 leading-8 text-lg">
            <div dangerouslySetInnerHTML={{ __html: product.longDescription || product.shortDescription }} />
          </div>
        )}

        {activeTab === "specs" && (
          <div>
            {attributes.length > 0 ? (
              <table className="w-full text-right">
                <tbody>
                  {attributes.map((attr, i) => (
                    <tr key={i} className={`border-b ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                      <td className="py-5 px-6 font-bold text-gray-800 w-1/3">{attr.key}</td>
                      <td className="py-5 px-6 text-gray-600">{attr.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 py-20">ویژگی خاصی ثبت نشده است.</p>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">هنوز نظری ثبت نشده است</p>
            <button className="mt-6 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition">
              اولین نفر باشید که نظر می‌دهید
            </button>
          </div>
        )}

        {activeTab === "questions" && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">هنوز سوالی پرسیده نشده است</p>
            <button className="mt-6 bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition">
              پرسش خود را مطرح کنید
            </button>
          </div>
        )}
      </div>
    </div>
  );
}