import { useEffect, useState } from "react";
import axios from "axios";

const useLeaves = (userId) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("Kullanıcı ID bulunamadı.");
      setLoading(false);
      return;
    }

    const fetchLeaves = async () => {
      try {
        console.log("API isteği için userId:", userId);
        // İsteği tam URL ile yap:
        const response = await axios.get(`/api/leaves/employee/${userId}`);
        setLeaves(response.data);
        setError("");
      } catch (err) {
        console.error("API Hatası:", err);
        setError("İzin verileri alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [userId]);

  return { leaves, loading, error };
};

export default useLeaves;
