import React from "react";
import EmployeeLayout from "../../../components/layout/AppLayout";
import PersonalLeaveStatusChart from "./PersonalLeaveStatusChart";
import LeaveHistoryChart from "./LeaveHistory";

const LeavePage = () => {
  const role = localStorage.getItem("role");

  return (
    <EmployeeLayout role={role}>
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold mb-4">İzin Bilgileriniz</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kişisel izin durumu grafiği */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-700"></h2>
            <PersonalLeaveStatusChart />
          </div>

          {/* İzin türü geçmişi grafiği */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              İzin Durum Dağılımı
            </h2>
            <LeaveHistoryChart />
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default LeavePage;
