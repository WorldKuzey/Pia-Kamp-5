import { useState, useEffect } from "react";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Girişte kaydedilmiş olmalı

    if (!userId) {
      setError("Kullanıcı ID bulunamadı.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/employees/employee/${userId}`);
        if (!res.ok) throw new Error("Profil bilgileri alınamadı");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

export default useProfile;
