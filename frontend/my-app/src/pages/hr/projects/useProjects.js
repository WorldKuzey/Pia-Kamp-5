import { useState, useEffect } from "react";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      if (!res.ok) {
        throw new Error("Proje verisi çekilemedi");
      }
      const data = await res.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error("Proje verisi çekme hatası:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      if (!res.ok) {
        throw new Error("Çalışan verisi çekilemedi");
      }
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Çalışan verisi çekme hatası:", err);
    }
  };

  const createProject = async (projectData) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        throw new Error("Proje oluşturulamadı");
      }

      await fetchProjects();
      return { success: true };
    } catch (err) {
      console.error("Proje oluşturma hatası:", err);
      return { success: false, error: err.message };
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        throw new Error("Proje güncellenemedi");
      }

      await fetchProjects();
      return { success: true };
    } catch (err) {
      console.error("Proje güncelleme hatası:", err);
      return { success: false, error: err.message };
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Proje silinemedi");
      }

      await fetchProjects();
      return { success: true };
    } catch (err) {
      console.error("Proje silme hatası:", err);
      return { success: false, error: err.message };
    }
  };

  const updateMemberRole = async (projectId, employeeId, newRole) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/members/${employeeId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roleInProject: newRole }),
      });

      if (!res.ok) {
        throw new Error("Üye rolü güncellenemedi");
      }

      await fetchProjects();
      return { success: true };
    } catch (err) {
      console.error("Üye rolü güncelleme hatası:", err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  return {
    projects,
    employees,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    updateMemberRole,
  };
};

export default useProjects; 