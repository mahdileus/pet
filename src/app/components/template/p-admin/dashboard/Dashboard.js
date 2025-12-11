"use client";

import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function AdminCharts() {
  // داده‌های نمونه
  const barData = {
    labels: ["دوره", "مقاله", "پادکست", "وبینار", "کاربران"],
    datasets: [
      {
        label: "تعداد",
        data: [25, 15, 10, 5, 30],
        backgroundColor: "#2C00A7",
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["دوره", "مقاله", "پادکست", "وبینار"],
    datasets: [
      {
        label: "توزیع محتوا",
        data: [40, 25, 20, 15],
        backgroundColor: ["#2C00A7", "#ff9f42", "#49BE78", "#737AFF"],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
    datasets: [
      {
        label: "درآمد ماهانه",
        data: [100, 120, 90, 150, 130, 170],
        fill: true,
        backgroundColor: "rgba(44,0,167,0.2)",
        borderColor: "#2C00A7",
        tension: 0.4,
        pointBackgroundColor: "#2C00A7",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="p-10 space-y-10  min-h-screen">
      <h2 className="text-xl font-bold text-gray-700">داشبورد ادمین</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-500 mb-4">تعداد محتواها</h3>
          <Bar data={barData} options={options} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-500 mb-4">توزیع محتوا</h3>
          <Pie data={pieData} options={options} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-gray-500 mb-4">درآمد ماهانه</h3>
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
}
