import React from "react";
import EmployeeLayout from "../../../components/layout/AppLayout";

const EmployeeDashboard = () => {
  const role = localStorage.getItem("role"); // Gerçek senaryoda context'ten alınır

  return (
    <EmployeeLayout role={role}>
      <h2 className="text-2xl font-bold mb-4">Çalışan Paneli</h2>
      <p>Burada çalışanın bilgileri, izin durumu, puanları vs. yer alabilir.</p>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;
