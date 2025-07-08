import React from "react";
import ConfessionGrid from "./ConfessionGrid";
import AppLayout from "../../components/layout/AppLayout.js";

const ViewConfessions = () => {
  const role = localStorage.getItem("role") || "guest";

  return (
    <AppLayout role={role}>
      <h1 className="text-center text-3xl font-bold mb-6">
        Anonymous Confession from Colleagues
      </h1>
      <ConfessionGrid />
    </AppLayout>
  );
};

export default ViewConfessions;
