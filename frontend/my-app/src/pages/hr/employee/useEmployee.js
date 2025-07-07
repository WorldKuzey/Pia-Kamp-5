// pages/hr/employee/useEmployee.js
import { useState, useEffect } from "react";
import axios from "axios";

const useEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/api/employees");
        setEmployees(res.data); // gelen veriyi state'e yaz
      } catch (err) {
        console.error("Çalışanlar alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading };
};

export default useEmployee;

//
