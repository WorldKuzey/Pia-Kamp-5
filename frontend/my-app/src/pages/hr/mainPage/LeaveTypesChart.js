// src/pages/hr/mainPage/charts/LeaveDistributionChart.js

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LeaveDistributionChart = () => {
  const [data, setData] = useState([]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a1d2ce"];

  const formatLabel = (type) => {
    switch (type) {
      case "FATHER_LEAVE":
        return "Babalık İzni";
      case "MARRIAGE_LEAVE":
        return "Evlilik İzni";
      case "ANNUAL_LEAVE":
        return "Yıllık İzin";
      case "SICK_LEAVE":
        return "Hastalık İzni";
      default:
        return type;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leaves");
        const json = await res.json();

        const counts = {};
        json.forEach((leave) => {
          const type = leave.leaveType;
          counts[type] = (counts[type] || 0) + 1;
        });

        const chartData = Object.entries(counts).map(([key, value]) => ({
          name: formatLabel(key),
          value,
        }));

        setData(chartData);
      } catch (error) {
        console.error("İzin verileri alınamadı:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">İzin Türü Dağılımı</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaveDistributionChart;
