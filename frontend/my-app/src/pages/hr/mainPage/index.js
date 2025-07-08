// src/pages/hr/mainPage/index.js

import React from "react";
import HRLayout from "../../../components/layout/AppLayout";
import GenderDistributionChart from "./GenderDistributionChart";
import DepartmentDistributionChart from "./DepartmentDistributionChart";
import TitleDistributionChart from "./TitleDistributionChart";
import LeaveDistributionChart from "./LeaveTypesChart";

const HRMainPage = () => {
  const role = localStorage.getItem("role");

  return (
    <HRLayout role={role}>
      {/* Responsive grid düzeni */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <GenderDistributionChart />
        <DepartmentDistributionChart />
        <TitleDistributionChart />
        <LeaveDistributionChart />
      </div>
    </HRLayout>
  );
};

export default HRMainPage;
