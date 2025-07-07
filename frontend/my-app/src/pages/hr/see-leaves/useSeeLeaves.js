import axios from "axios";
import { useState } from "react";

const useSeeLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState({ employeeId: "", status: "" });

  const fetchLeaves = async () => {
    try {
      const params = {};
      if (filter.employeeId) params.employeeId = filter.employeeId;
      if (filter.status) params.status = filter.status;

      const res = await axios.get("http://localhost:5000/api/leaves", {
        params,
      });
      const rawLeaves = res.data;
      const leavesWithNames = [];

      for (const leave of rawLeaves) {
        try {
          const empId = leave.employeeId;
          const empRes = await axios.get(
            `http://localhost:5000/api/employees/employee/${empId}`
          );
          const employee = empRes.data;

          // LeaveType'a göre kalan günleri belirle
          let remainingDays = null;
          switch (leave.leaveType) {
            case "ANNUAL_LEAVE":
              remainingDays = employee.remainingAnnualLeave;
              break;
            case "SICK_LEAVE":
              remainingDays = employee.remainingSickLeave;
              break;
            case "MARRIAGE_LEAVE":
              remainingDays = employee.remainingMarriageLeave;
              break;
            case "FATHER_LEAVE":
              remainingDays = employee.remainingFatherLeave;
              break;
            default:
              remainingDays = "-";
          }

          leavesWithNames.push({
            ...leave,
            employeeFirstName: employee.firstName,
            employeeLastName: employee.lastName,
            approvedByFirstName: leave.approvedByFirstName || "",
            approvedByLastName: leave.approvedByLastName || "",
            leaveType: leave.leaveType || "BELİRTİLMEMİŞ",
            remainingDays: remainingDays, // Yeni alan eklendi
          });
        } catch (err) {
          console.log("İzni alan kişi alınamadı:", err);
        }
      }

      setLeaves(leavesWithNames);
    } catch (err) {
      alert(
        "İzinler alınamadı: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const changeLeaveStatus = async (leaveId, newStatus, approverId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/leaves/${leaveId}/status`,
        null,
        {
          params: {
            status: newStatus,
            approverId: approverId,
          },
        }
      );

      alert("Durum güncellendi!");
    } catch (err) {
      alert(
        "Durum güncelleme başarısız: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return { leaves, fetchLeaves, changeLeaveStatus, setFilter, filter };
};

export default useSeeLeaves;
