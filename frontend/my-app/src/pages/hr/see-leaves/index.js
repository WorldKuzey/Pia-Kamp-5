import React from "react";
import  SeeLeavesForm from "./SeeLeavesForm";
import AppLayout from "../../../components/layout/AppLayout";

const seeLeavesPage = () => {
    const role = localStorage.getItem("role");

    return (
        <AppLayout role={role}>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                    Çalışan İzinleri
                </h2>
                <SeeLeavesForm/>
            </div>
        </AppLayout>
    );
};

export default seeLeavesPage;