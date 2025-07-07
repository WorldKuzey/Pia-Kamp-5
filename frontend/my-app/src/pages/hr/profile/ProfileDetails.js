import React, { useRef, useState } from "react";

const ProfileDetails = ({ profile }) => {
  const [imageUrl, setImageUrl] = useState(profile?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`/api/employees/update_pfp/${userId}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error("Yükleme başarısız");

      const updatedProfile = await res.json();
      setImageUrl(updatedProfile.imageUrl);
    } catch (err) {
      alert("Görsel yüklenirken bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  if (!profile) return null;

  return (
    <div className="bg-white shadow rounded p-6 max-w-xl mx-auto">
      {/* Profil Fotoğrafı */}
      <div className="flex justify-center mb-4 relative">
        <img
          src={imageUrl}
          alt="Profil Fotoğrafı"
          className="w-28 h-28 rounded-full object-cover border"
        />
      </div>

      <div className="text-center mb-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <button
          onClick={handleClickUpload}
          className="text-blue-600 hover:underline text-sm"
          disabled={uploading}
        >
          {uploading ? "Yükleniyor..." : "Profil fotoğrafını değiştir"}
        </button>
      </div>

      <div className="mb-4 text-center">
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
