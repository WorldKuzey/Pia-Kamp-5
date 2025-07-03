// pages/employee/leaveRequest/useLeaveRequest.js
import { useState } from "react";
import axios from "axios";

const useLeaveRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

  return { submitLeave, loading, error, success };
};

export default useLeaveRequest;
