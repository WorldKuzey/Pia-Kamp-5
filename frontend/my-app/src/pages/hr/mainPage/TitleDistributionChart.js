// src/pages/hr/mainPage/charts/TitleDistributionChart.js

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TitleDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((employees) => {
        const titleCount = {};

        employees.forEach((emp) => {
          let title = emp.title?.toUpperCase() || "BİLİNMİYOR";

          if (titleCount[title]) {
            titleCount[title]++;
          } else {
            titleCount[title] = 1;
          }
        });

        const chartData = Object.entries(titleCount).map(([title, count]) => ({
          title,
          count,
        }));

        setData(chartData);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Ünvan Dağılımı
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" name="Çalışan Sayısı" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TitleDistributionChart;
