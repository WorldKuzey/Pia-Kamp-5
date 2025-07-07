import React from "react";
import AppLayout from "../../components/layout/AppLayout";

const ViewConfessions = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">İtirafları Görüntüle</h1>
        <p>Burada kullanıcıların gönderdiği itiraflar listelenecek.</p>
      </div>
    </AppLayout>
  );
};

export default ViewConfessions;
