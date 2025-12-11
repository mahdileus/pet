"use client";
import React from "react";

export default function ArticleCommentBox({ comment }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 mb-4 w-full mx-auto ">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
          {comment.user?.avatar ? comment.user.name[0] : "U"}
        </div>
        <div>
          <h4 className="text-gray-800 font-semibold text-sm md:text-base">
            {comment.article?.title || "مقاله ناشناس"}
          </h4>
          <p className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm md:text-base">{comment.content}</p>
    </div>
  );
}
