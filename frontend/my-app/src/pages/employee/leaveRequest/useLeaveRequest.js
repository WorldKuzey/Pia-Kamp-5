// pages/employee/leaveRequest/useLeaveRequest.js
import { useState } from "react";
import axios from "axios";

const useLeaveRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    gender: "",
    remainingAnnualLeave: 0,
    remainingSickLeave: 0,
    remainingMarriageLeave: 0,
    remainingFatherLeave: 0
  });
  const submitLeave = async (formData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const userId = localStorage.getItem("userId");

    const payload = {
      employeeId: userId,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
    };

    try {
      await axios.post("/api/leaves", payload);
      setSuccess(true);
    } catch (err) {
      setError("İzin talebi gönderilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const employeeInformations = async(empId) => {
      try{
        const empInf = await axios.get(
            `http://localhost:5000/api/employees/employee/${empId}`
        );
        const employee = empInf.data;
        setEmployeeInfo({
          gender: employee.gender,
          remainingAnnualLeave: employee.remainingAnnualLeave,
          remainingSickLeave: employee.remainingSickLeave,
          remainingMarriageLeave: employee.remainingMarriageLeave,
          remainingFatherLeave: employee.remainingFatherLeave
        });
      }
      catch(err){
        setError("Çalışan bilgileri alınırken hata oluştu.");

      }
  }



  return { submitLeave, loading, error, success,setSuccess,employeeInfo,employeeInformations };
};

export default useLeaveRequest;
