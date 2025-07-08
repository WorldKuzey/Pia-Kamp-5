// pages/hr/projects/index.js
import React, { useState } from "react";
import ProjectsTable from "./ProjectsTable";
import AddProjectForm from "./AddProjectForm";
import AppLayout from "../../../components/layout/AppLayout";
import { Button, Box, Typography, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useProjects from "./useProjects";

const ProjectsPage = () => {
  const role = localStorage.getItem("role");
  const [showAddForm, setShowAddForm] = useState(false);
  const {
    projects,
    employees,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    fetchProjects,
  } = useProjects();

  const handleAddProject = async (projectData) => {
    const result = await createProject(projectData);
    if (result.success) {
      setShowAddForm(false);
    } else {
      alert(`Proje oluşturma hatası: ${result.error}`);
    }
  };

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

  return (
    <AppLayout role={role}>
      <div className="p-6">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h2" className="text-gray-700">
            Projeler
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowAddForm(true)}
            sx={{ backgroundColor: "#1976d2" }}
          >
            Yeni Proje Ekle
          </Button>
        </Box>
        
        {showAddForm && (
          <AddProjectForm
            employees={employees}
            onSubmit={handleAddProject}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        
        <ProjectsTable 
          projects={projects} 
          employees={employees}
          fetchProjects={fetchProjects}
          updateProject={updateProject}
          deleteProject={deleteProject}
        />
      </div>
    </AppLayout>
  );
};

export default ProjectsPage; 