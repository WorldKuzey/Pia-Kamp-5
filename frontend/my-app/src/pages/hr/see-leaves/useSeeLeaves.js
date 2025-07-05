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

          leavesWithNames.push({
            ...leave,
            employeeFirstName: employee.firstName,
            employeeLastName: employee.lastName,
            approvedByFirstName: leave.approvedByFirstName || "",
            leaveType: leave.leaveType || "BELİRTİLMEMİŞ", // null durumunu engelle
          });
        } catch (err) {
          console.log("İzni alan kişi alınamadı.");
        }
      }

      setLeaves(leavesWithNames);
    } catch (err) {
      alert(
        "Getting leaves is failed: " +
          (err.response?.data?.message || err.message)
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
        "Changing leave status is failed: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return { leaves, fetchLeaves, changeLeaveStatus, setFilter, filter };
};

export default useSeeLeaves;
