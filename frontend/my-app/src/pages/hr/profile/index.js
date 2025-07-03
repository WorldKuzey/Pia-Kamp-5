import React from "react";
import AppLayout from "../../../components/layout/AppLayout.js";
import ProfileDetails from "./ProfileDetails";
import useProfile from "./useProfile";

const ProfilePage = () => {
  const { profile, loading, error } = useProfile();
  const role = localStorage.getItem("role"); // rolü layout’a iletmek için

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <AppLayout role={role}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Profil Bilgileri
      </h2>
      <ProfileDetails profile={profile} />
    </AppLayout>
  );
};

export default ProfilePage;
