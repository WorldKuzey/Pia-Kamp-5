import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

const LeaveHistoryChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leaves");
        const allLeaves = res.data;

        const userLeaves = allLeaves.filter(
          (leave) => leave.employeeId === userId
        );

        const grouped = {};
        userLeaves.forEach((leave) => {
          const type = leave.leaveType || "BELİRTİLMEMİŞ";
          grouped[type] = (grouped[type] || 0) + 1;
        });

        const chartData = Object.entries(grouped).map(([type, count]) => ({
          name: type.replace("_", " ").toLowerCase(),
          value: count,
        }));

        setData(chartData);
      } catch (err) {
        setError("Grafik verileri alınamadı.");
        console.error(err);
      }
    };

    fetchLeaves();
  }, [userId]);

  if (error)
    return (
      <div className="text-red-600 bg-white p-4 rounded shadow">{error}</div>
    );

  if (data.length === 0)
    return (
      <div className="text-gray-600 bg-white p-4 rounded shadow">
        Henüz görselleştirilecek izin verisi yok.
      </div>
    );

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={100}
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            isAnimationActive
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaveHistoryChart;
