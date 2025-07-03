// pages/hr/employee/index.js
import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AppLayout from "../../../components/layout/AppLayout";

const EmployeePage = () => {
  const role = localStorage.getItem("role");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

  return (
    <AppLayout role={role}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Çalışan Listesi
        </h2>
        <EmployeeTable employees={employees} fetchEmployees={fetchEmployees} />
      </div>
    </AppLayout>
  );
};

export default EmployeePage;
