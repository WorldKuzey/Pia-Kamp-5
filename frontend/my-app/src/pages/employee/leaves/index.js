import React from "react";
import useLeaves from "./useLeaves";
import LeavesTable from "./leavesTable";
import AppLayout from "../../../components/layout/AppLayout";

const LeavePage = () => {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId"); // localStorage'dan alıyoruz

  const { leaves, loading, error } = useLeaves(userId); // parametre olarak veriyoruz

  return (
    <AppLayout role={role}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          İzin Taleplerim
        </h2>

        {loading && <p>Yükleniyor...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <LeavesTable leaves={leaves} />
      </div>
    </AppLayout>
  );
};

export default LeavePage;
