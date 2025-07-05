// pages/employee/leaves/PersonalLeaveStatusChart.js
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  PENDING: "#f59e0b",
  APPROVED: "#10b981",
  REJECTED: "#ef4444",
};

const PersonalLeaveStatusChart = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/leaves?employeeId=${userId}`)
      .then((res) => res.json())
      .then((leaves) => {
        const counts = { PENDING: 0, APPROVED: 0, REJECTED: 0 };

        leaves.forEach((leave) => {
          const status = leave.status;
          if (counts[status] !== undefined) counts[status]++;
        });

        const chartData = Object.entries(counts).map(([status, value]) => ({
          name: status,
          value,
        }));

        setData(chartData);
      })
      .catch(console.error);
  }, [userId]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 className="mb-2 font-semibold text-lg">İzin Durum Dağılımı</h3>
      <ResponsiveContainer>
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
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#8884d8"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PersonalLeaveStatusChart;
