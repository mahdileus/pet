"use client";

import { useState, useEffect } from "react";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // فرم ایجاد تیکت
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [department, setDepartment] = useState("");

  // فرم پاسخ
  const [reply, setReply] = useState("");

  //* -------------------------- Load Data -------------------------- *//
  useEffect(() => {
    fetchTickets();
    fetchDepartments();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    const res = await fetch("/api/tickets");
    const data = await res.json();
    setTickets(data.tickets || []);
    setLoading(false);
  };

  const fetchDepartments = async () => {
    const res = await fetch("/api/department");
    const data = await res.json();
    setDepartments(data.list || []);
  };

  //* -------------------------- Submit Ticket -------------------------- *//
  const submitTicket = async (e) => {
    e.preventDefault();

    await fetch("/api/tickets", {
      method: "POST",
      body: JSON.stringify({ title, body, department }),
    });

    await fetchTickets();
    setTitle("");
    setBody("");
    setDepartment("");
  };

  //* -------------------------- Submit Reply -------------------------- *//
  const submitReply = async (ticketId) => {
    if (!reply.trim()) return;

    await fetch(`/api/tickets/${ticketId}/reply`, {
      method: "POST",
      body: JSON.stringify({ message: reply }),
    });

    setReply("");
    fetchTickets();

    const res = await fetch(`/api/tickets/${ticketId}`);
    const data = await res.json();
    setSelectedTicket(data.ticket);
  };

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* ------------------------- ستون ۱ : ایجاد تیکت ------------------------- */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-6 text-secondery">ارسال تیکت جدید</h2>

        <form onSubmit={submitTicket} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="عنوان تیکت"
            className="border p-2 rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="متن تیکت"
            className="border p-2 rounded-xl"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />

          <select
            className="border p-2 rounded-xl"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">انتخاب دپارتمان</option>

            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-primary text-white p-3 rounded-xl hover:bg-primary/80 transition"
          >
            ثبت تیکت
          </button>
        </form>
      </div>

      {/* ------------------------- ستون ۲ : لیست تیکت‌ها ------------------------- */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow max-h-[600px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-secondery">تیکت‌های شما</h2>

        {loading ? (
          <p className="text-gray-500">در حال بارگذاری...</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500">تیکتی ثبت نشده است.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {tickets.map((t) => (
              <div
                key={t._id}
                onClick={() => setSelectedTicket(t)}
                className="cursor-pointer border p-3 rounded-xl hover:bg-gray-100 transition"
              >
                <p className="font-semibold">{t.title}</p>

                <p
                  className={`text-sm mt-1 ${
                    t.status === "answered"
                      ? "text-green-600"
                      : t.status === "pending"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {t.status === "answered"
                    ? "پاسخ داده شده"
                    : t.status === "pending"
                    ? "در انتظار پاسخ"
                    : "بسته شده"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------- ستون ۳ : نمایش تیکت انتخاب شده ------------------------- */}
      <div className="col-span-1 bg-white p-6 rounded-2xl shadow">
        {!selectedTicket ? (
          <p className="text-gray-500">یک تیکت را انتخاب کنید.</p>
        ) : (
          <>
            <h2 className="text-xl font-bold">{selectedTicket.title}</h2>

            <p className="text-gray-700 mt-3">{selectedTicket.body}</p>

            <div className="mt-6">
              <h3 className="font-bold mb-2">پاسخ‌ها</h3>

              {selectedTicket.replies.length === 0 ? (
                <p className="text-gray-500">پاسخی وجود ندارد.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {selectedTicket.replies.map((r, i) => (
                    <div key={i} className="bg-gray-100 p-3 rounded-xl">
                      <p className="text-sm">{r.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(r.createdAt).toLocaleString("fa-IR")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ارسال پاسخ */}
            <div className="mt-6">
              <textarea
                placeholder="پاسخ شما..."
                className="border p-2 rounded-xl w-full"
                rows="3"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>

              <button
                onClick={() => submitReply(selectedTicket._id)}
                className="mt-3 bg-primary text-white p-3 rounded-xl hover:bg-primary/80 transition"
              >
                ارسال پاسخ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
