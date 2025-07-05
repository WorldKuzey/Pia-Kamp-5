// src/pages/hr/employee/index.js
import React from "react";
import AppLayout from "../../../components/layout/AppLayout";
import EmployeeForm from "./EmployeeForm";

const HREmployeeAddPage = () => {
  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <EmployeeForm />
      </div>
    </AppLayout>
  );
};

export default HREmployeeAddPage;
