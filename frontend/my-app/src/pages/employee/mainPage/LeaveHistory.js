// pages/employee/leaves/LeaveHistoryChart.js
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

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const LeaveHistoryChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leaves");
        const allLeaves = res.data;

        // Sadece kullanıcının verileri
        const userLeaves = allLeaves.filter(
          (leave) => leave.employeeId === userId
        );

        // leaveType'a göre grupla
        const grouped = {};
        userLeaves.forEach((leave) => {
          const type = leave.leaveType;
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

  if (error) return <p className="text-red-600">{error}</p>;
  if (data.length === 0)
    return <p>Henüz görselleştirilecek izin verisi yok.</p>;

  return (
    <div className="w-full h-96 bg-white rounded shadow p-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">İzin Türü Geçmişi</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
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

export default LeaveHistoryChart;
