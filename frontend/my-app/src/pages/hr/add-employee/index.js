import React from "react";
import EmployeeForm from "./EmployeeForm";
import AppLayout from "../../../components/layout/AppLayout";

const HRAddEmp = () => {
    return (
        <AppLayout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                    Çalışan Ekleme
                </h2>
                <EmployeeForm />
            </div>
        </AppLayout>
    );
};

export default HRAddEmp;
