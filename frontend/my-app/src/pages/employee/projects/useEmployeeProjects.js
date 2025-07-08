import { useEffect, useState } from "react";
import axios from "axios";

const useEmployeeProjects = (employeeId) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/projects/employee/${employeeId}`);
        setProjects(res.data);
      } catch (err) {
        setError("Projeler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    if (employeeId) fetchProjects();
  }, [employeeId]);

  return { projects, loading, error };
};

export default useEmployeeProjects; 