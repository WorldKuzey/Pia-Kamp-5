// pages/employee/leaveRequest/index.js
import React from "react";
import LeaveForm from "./leaveForm";
import AppLayout from "../../../components/layout/AppLayout";

const LeaveRequestPage = () => {
  const role = localStorage.getItem("role");

  return (
    <AppLayout role={role}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Yeni İzin Talebi Oluştur
        </h2>
        <LeaveForm />
      </div>
    </AppLayout>
  );
};

export default LeaveRequestPage;
