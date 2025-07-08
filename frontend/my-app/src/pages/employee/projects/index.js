import React, { useEffect, useState } from "react";
import AppLayout from "../../../components/layout/AppLayout";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

// Helper to get initials from a name
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0];
  return parts[0][0] + parts[parts.length - 1][0];
};

const roleColors = {
  'Manager': 'bg-blue-100 text-blue-800',
  'Developer': 'bg-green-100 text-green-800',
  'Tester': 'bg-yellow-100 text-yellow-800',
  'Analyst': 'bg-purple-100 text-purple-800',
  // Add more as needed
  '': 'bg-gray-100 text-gray-800',
};

// Status label and color mapping
const statusMap = {
  'ON_HOLD': { label: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
  'ACTIVE': { label: 'Aktif', color: 'bg-green-100 text-green-800' },
  'COMPLETED': { label: 'Tamamlandı', color: 'bg-blue-100 text-blue-800' },
  'CANCELLED': { label: 'İptal Edildi', color: 'bg-red-100 text-red-800' },
  // Add more as needed
};

const ProjectDetailsModal = ({ project, onClose }) => {
  const [memberDetails, setMemberDetails] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [managerName, setManagerName] = useState("");
  const [loadingManager, setLoadingManager] = useState(false);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (!project || !project.members || project.members.length === 0) {
        setMemberDetails([]);
        return;
      }
      setLoadingMembers(true);
      try {
        const responses = await Promise.all(
          project.members.map((member) =>
            axios.get(`/api/employees/employee/${member.employeeId}`)
          )
        );
        setMemberDetails(
          responses.map((res, idx) => {
            const data = res.data;
            let name =
              (data.firstName && data.lastName)
                ? `${data.firstName} ${data.lastName}`
                : data.fullName || data.name || data.username || data.email || project.members[idx].employeeId;
            // Prefer title from DB, fallback to roleInProject
            let title = data.title || project.members[idx].roleInProject || '';
            return {
              ...project.members[idx],
              name,
              title,
            };
          })
        );
      } catch (err) {
        setMemberDetails(
          project.members.map((member) => ({
            ...member,
            name: 'Bilinmiyor',
            title: member.roleInProject || '',
          }))
        );
      } finally {
        setLoadingMembers(false);
      }
    };
    const fetchManagerName = async () => {
      if (!project || !project.projectManagerId) {
        setManagerName("");
        return;
      }
      setLoadingManager(true);
      try {
        const res = await axios.get(`/api/employees/employee/${project.projectManagerId}`);
        const data = res.data;
        let name =
          (data.firstName && data.lastName)
            ? `${data.firstName} ${data.lastName}`
            : data.fullName || data.name || data.username || data.email || project.projectManagerId;
        setManagerName(name);
      } catch (err) {
        setManagerName("Bilinmiyor");
      } finally {
        setLoadingManager(false);
      }
    };
    fetchMemberDetails();
    fetchManagerName();
  }, [project]);

  if (!project) return null;
  const statusInfo = statusMap[project.status] || { label: project.status, color: 'bg-gray-100 text-gray-800' };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl relative border border-gray-200">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-3xl font-bold mb-1 text-gray-900">{project.name}</h3>
        <p className="mb-4 text-gray-700 italic">{project.description}</p>
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <span className="font-semibold">Durum:</span> <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
          </div>
          <div>
            <span className="font-semibold">Başlangıç:</span> {project.startDate || '-'}
          </div>
          <div>
            <span className="font-semibold">Bitiş:</span> {project.endDate || '-'}
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-4 flex items-center gap-2">
          <span className="font-semibold">Yönetici:</span> {loadingManager ? <span className="text-gray-500">Yükleniyor...</span> : managerName}
        </div>
        <hr className="my-4" />
        <div>
          <span className="font-semibold">Üyeler:</span>
          {loadingMembers ? (
            <div className="ml-6 mt-1 text-gray-500 text-sm">Yükleniyor...</div>
          ) : (
            <ul className="ml-2 mt-2 space-y-3">
              {memberDetails.length > 0 ? (
                memberDetails.map((member, idx) => (
                  <li key={idx} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700 text-sm">
                      {getInitials(member.name)}
                    </div>
                    <span className="font-medium text-gray-800">{member.name}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold border ${roleColors[member.title] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>{member.title}</span>
                  </li>
                ))
              ) : (
                <li>Üye yok</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const EmployeeProjectsPage = () => {
  const { id, role } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [myTitle, setMyTitle] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/projects/employee/${id}`);
        setProjects(res.data);
      } catch (err) {
        setError("Projeler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProjects();
  }, [id]);

  // Fetch the current user's employee details to get the title
  useEffect(() => {
    const fetchMyTitle = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`/api/employees/employee/${id}`);
        setMyTitle(res.data.title || "");
      } catch (err) {
        setMyTitle("");
      }
    };
    fetchMyTitle();
  }, [id]);

  return (
    <AppLayout role={role}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Projelerim</h2>
        {loading && <p>Yükleniyor...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Proje Adı</th>
                <th className="py-2 px-4 border-b">Durum</th>
                <th className="py-2 px-4 border-b">Rolüm</th>
                <th className="py-2 px-4 border-b">Detay</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4">Projeye dahil değilsiniz.</td>
                </tr>
              )}
              {projects.map((project) => {
                const statusInfo = statusMap[project.status] || { label: project.status, color: 'bg-gray-100 text-gray-800' };
                return (
                  <tr key={project.id} className="hover:bg-gray-50 transition">
                    <td className="py-2 px-4 border-b align-middle font-semibold">{project.name}</td>
                    <td className="py-2 px-4 border-b align-middle text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
                    </td>
                    <td className="py-2 px-4 border-b align-middle text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${roleColors[myTitle] || 'bg-gray-100 text-gray-800'}`}>{myTitle}</span>
                    </td>
                    <td className="py-2 px-4 border-b align-middle text-center">
                      <button
                        className="text-blue-600 underline hover:text-blue-800"
                        onClick={() => setSelectedProject(project)}
                      >
                        Detay
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </AppLayout>
  );
};

export default EmployeeProjectsPage; 