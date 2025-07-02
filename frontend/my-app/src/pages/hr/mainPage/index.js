import React from "react";
import HRLayout from "../../../components/layout/AppLayout";

const HRMainPage = () => {
  const role = localStorage.getItem("role");

  return (
    <HRLayout role={role}>
      <h2 className="text-2xl font-bold mb-4">HR Dashboard</h2>
      <p>İstatistikler, grafikler, çalışan bilgileri burada olacak.</p>
    </HRLayout>
  );
};

export default HRMainPage;
