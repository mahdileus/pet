"use client";
import React from "react";

export default function ProductCommentBox({ comment }) {
    
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-5 mb-4 w-full mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
            {comment.user?.avatar ? comment.user.avatar[0] : "U"}
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold text-base">{comment.product?.title || "محصول ناشناس"}</h4>
            <p className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-yellow-400 font-semibold">
          {Array(comment.rating || 5).fill("★").map((star, idx) => (
            <span key={idx} className="text-sm md:text-base">{star}</span>
          ))}
        </div>
      </div>
      <p className="text-gray-700 text-sm md:text-base">{comment.text}</p>

    </div>
  );
}
