// src/pages/hr/mainPage/charts/DepartmentDistributionChart.js

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

const DepartmentDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((employees) => {
        const departmentCount = {};

        employees.forEach((emp) => {
          let department = emp.department?.toUpperCase() || "BİLİNMİYOR";

          if (departmentCount[department]) {
            departmentCount[department]++;
          } else {
            departmentCount[department] = 1;
          }
        });

        const chartData = Object.entries(departmentCount).map(
          ([department, count]) => ({
            department,
            count,
          })
        );

        setData(chartData);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Departman Dağılımı
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Çalışan Sayısı" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentDistributionChart;
