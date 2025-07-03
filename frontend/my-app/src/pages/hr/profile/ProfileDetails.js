import React from "react";

const ProfileDetails = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="bg-white shadow rounded p-6 max-w-xl mx-auto">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          {profile.firstName} {profile.lastName}
        </h3>
        <p className="text-gray-600">{profile.role}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
        <div>
          <strong>Cinsiyet:</strong> {profile.gender || "-"}
        </div>
        <div>
          <strong>Telefon:</strong> {profile.phone || "-"}
        </div>
        <div>
          <strong>Email:</strong> {profile.email || "-"}
        </div>
        <div>
          <strong>Adres:</strong> {profile.address || "-"}
        </div>
        <div>
          <strong>Departman:</strong> {profile.department || "-"}
        </div>
        <div>
          <strong>Ünvan:</strong> {profile.title || "-"}
        </div>
        <div>
          <strong>TC Kimlik No:</strong> {profile.tc || "-"}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
