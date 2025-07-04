// src/pages/hr/mainPage/charts/GenderDistributionChart.js

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d"]; // Kadın - Erkek renkleri

const GenderDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        const employees = res.data;

        const genderCounts = employees.reduce(
          (acc, emp) => {
            if (emp.gender === "FEMALE") acc.female++;
            else if (emp.gender === "MALE") acc.male++;
            return acc;
          },
          { female: 0, male: 0 }
        );

        setData([
          { name: "Kadın", value: genderCounts.female },
          { name: "Erkek", value: genderCounts.male },
        ]);
      } catch (err) {
        console.error("Cinsiyet verisi alınamadı:", err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Cinsiyet Dağılımı
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderDistributionChart;
