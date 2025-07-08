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
  BEKLEMEDE: "#f59e0b",
  ONAYLANDI: "#10b981",
  REDDEDILDI: "#ef4444",
};

const STATUS_LABELS = {
  PENDING: "BEKLEMEDE",
  APPROVED: "ONAYLANDI",
  REJECTED: "REDDEDILDI",
};

const PersonalLeaveStatusChart = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/leaves?employeeId=${userId}`)
      .then((res) => res.json())
      .then((leaves) => {
        const counts = { BEKLEMEDE: 0, ONAYLANDI: 0, REDDEDILDI: 0 };

        leaves.forEach((leave) => {
          const statusKey = STATUS_LABELS[leave.status];
          if (statusKey && counts[statusKey] !== undefined) {
            counts[statusKey]++;
          }
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
