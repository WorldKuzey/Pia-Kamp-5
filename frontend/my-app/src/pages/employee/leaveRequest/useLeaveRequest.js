import { useState } from "react";
import axios from "axios";

const useLeaveRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const createLeaveRequest = async (data) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const userId = localStorage.getItem("userId"); // Kullanıcı ID’si localStorage’dan

      if (!userId) {
        setError("Kullanıcı ID bulunamadı.");
        setLoading(false);
        return;
      }

      // Backend’in beklediği DTO’ya uygun nesne
      const payload = {
        employeeId: userId,
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
        // status backend tarafından otomatik atanabilir
      };

      await axios.post("/api/leaves", payload);

      setSuccess(true);
    } catch (err) {
      setError("İzin talebi oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  return { createLeaveRequest, loading, error, success };
};

export default useLeaveRequest;
