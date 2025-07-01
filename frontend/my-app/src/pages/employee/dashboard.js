import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const EmployeeDashboard = () => {
  const role = localStorage.getItem("role"); // Gerçek senaryoda context'ten alınır

  return (
    <AppLayout role={role}>
      <h2 className="text-2xl font-bold mb-4">Çalışan Paneli</h2>
      <p>Burada çalışanın bilgileri, izin durumu, puanları vs. yer alabilir.</p>
    </AppLayout>
  );
};

export default EmployeeDashboard;
