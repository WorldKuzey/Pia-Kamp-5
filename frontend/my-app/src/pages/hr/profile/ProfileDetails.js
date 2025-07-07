import React, { useRef, useState } from "react";

const ProfileDetails = ({ profile }) => {
  const [imageUrl, setImageUrl] = useState(profile?.imageUrl || "");
  const [uploading, setUploading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const fileInputRef = useRef();

  // Profil fotoğrafı yükleme
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
      alert("Görsel yüklenirken hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  // Şifre güncelleme
  const handlePasswordUpdate = async () => {
    const userId = localStorage.getItem("userId");

    if (!newPassword) {
      setPasswordMessage("Yeni şifre boş olamaz.");
      return;
    }

    try {
      const res = await fetch(`/api/employees/update_password/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword, // DTO’ya uygun alan ismi burada
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Şifre güncellenemedi.");
      }

      setPasswordMessage("Şifre başarıyla güncellendi.");
      setNewPassword("");
    } catch (err) {
      setPasswordMessage(`Hata: ${err.message}`);
    }
  };

  if (!profile) return null;

  return (
    <div className="bg-white shadow rounded p-6 max-w-xl mx-auto space-y-6">
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

      <div className="text-center mb-6">
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

      {/* Şifre Güncelleme Alanı */}
      <div className="mt-8 border-t pt-6">
        <h4 className="text-lg font-semibold mb-4">Şifre Güncelle</h4>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Yeni Şifre
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={handlePasswordUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Şifreyi Güncelle
          </button>
          {passwordMessage && (
            <p className="text-sm mt-2 text-center text-red-600">
              {passwordMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
