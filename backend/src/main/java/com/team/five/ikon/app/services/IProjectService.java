package com.team.five.ikon.app.services;

import com.team.five.ikon.app.dto.ProjectDTO;

import java.util.List;

public interface IProjectService {
    ProjectDTO createProject(ProjectDTO dto);

    ProjectDTO updateProject(String id, ProjectDTO dto);

    void updateMemberRole(String projectId, String employeeId, String newRole);


    void deleteProject(String id);

    ProjectDTO getProjectById(String id);

    List<ProjectDTO> getAllProjects();

    // Bu metotları vaktimiz kalırsa frontende çekelim ama öncelik CRUD larda
    List<ProjectDTO> getByManagerId(String managerId);
    List<ProjectDTO> getActiveProjects();
    List<ProjectDTO> getProjectsByEmployee(String employeeId);
}
