import React from "react";
import SeeLeavesForm from "./SeeLeavesForm";
import AppLayout from "../../../components/layout/AppLayout";

const seeLeavesPage = () => {
  const role = localStorage.getItem("role");

  return (
    <AppLayout role={role}>
      <SeeLeavesForm />
    </AppLayout>
  );
};

export default seeLeavesPage;
