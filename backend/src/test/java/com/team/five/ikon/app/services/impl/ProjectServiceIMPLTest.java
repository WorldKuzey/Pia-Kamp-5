package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.ProjectDTO;
import com.team.five.ikon.app.entity.Project;
import com.team.five.ikon.app.entity.ProjectMember;
import com.team.five.ikon.app.enums.ProjectStatus;
import com.team.five.ikon.app.repository.IProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProjectServiceIMPLTest {

    private IProjectRepository projectRepository;
    private ProjectServiceIMPL projectService;

    @BeforeEach
    void setUp() {
        projectRepository = mock(IProjectRepository.class);
        projectService = new ProjectServiceIMPL(projectRepository);
    }

    @Test
    void testCreateProject() {
        ProjectDTO dto = new ProjectDTO();
        dto.setName("Test Project");
        dto.setDescription("Desc");
        dto.setStatus(ProjectStatus.ACTIVE);
        dto.setStartDate(LocalDate.now());
        dto.setEndDate(LocalDate.now().plusDays(5));
        dto.setProjectManagerId("pm1");
        dto.setMembers(new ArrayList<>());

        Project saved = new Project();
        saved.setId("p1");
        saved.setName("Test Project");

        when(projectRepository.save(any())).thenReturn(saved);

        ProjectDTO result = projectService.createProject(dto);
        assertEquals("Test Project", result.getName());
    }

    @Test
    void testUpdateProject() {
        String id = "p1";

        ProjectDTO dto = new ProjectDTO();
        dto.setName("Updated Project");
        dto.setDescription("Updated desc");
        dto.setStatus(ProjectStatus.ACTIVE);
        dto.setStartDate(LocalDate.now());
        dto.setEndDate(LocalDate.now().plusDays(10));
        dto.setProjectManagerId("m1");
        dto.setMembers(new ArrayList<>());

        Project existing = new Project();
        existing.setId(id);

        when(projectRepository.findById(id)).thenReturn(Optional.of(existing));
        when(projectRepository.save(any())).thenReturn(existing);

        ProjectDTO result = projectService.updateProject(id, dto);
        assertEquals("Updated Project", result.getName());
    }

    @Test
    void testDeleteProject() {
        doNothing().when(projectRepository).deleteById("p1");
        projectService.deleteProject("p1");
        verify(projectRepository, times(1)).deleteById("p1");
    }

    @Test
    void testGetProjectById() {
        Project project = new Project();
        project.setId("p1");
        project.setName("MyProject");

        when(projectRepository.findById("p1")).thenReturn(Optional.of(project));

        ProjectDTO result = projectService.getProjectById("p1");
        assertEquals("MyProject", result.getName());
    }

    @Test
    void testGetAllProjects() {
        when(projectRepository.findAll()).thenReturn(List.of(new Project(), new Project()));
        List<ProjectDTO> result = projectService.getAllProjects();
        assertEquals(2, result.size());
    }

    @Test
    void testGetByManagerId() {
        Project p = new Project();
        p.setProjectManagerId("m1");

        when(projectRepository.findByProjectManagerId("m1")).thenReturn(List.of(p));

        List<ProjectDTO> result = projectService.getByManagerId("m1");
        assertEquals(1, result.size());
        assertEquals("m1", result.get(0).getProjectManagerId());
    }

    @Test
    void testGetActiveProjects() {
        Project p = new Project();
        p.setStatus(ProjectStatus.ACTIVE);

        when(projectRepository.findByStatus(ProjectStatus.ACTIVE)).thenReturn(List.of(p));

        List<ProjectDTO> result = projectService.getActiveProjects();
        assertEquals(1, result.size());
        assertEquals(ProjectStatus.ACTIVE, result.get(0).getStatus());
    }

    @Test
    void testGetProjectsByEmployee() {
        ProjectMember member = new ProjectMember();
        member.setEmployeeId("e1");

        Project project = new Project();
        project.setMembers(List.of(member));

        when(projectRepository.findByMembersEmployeeId("e1")).thenReturn(List.of(project));

        List<ProjectDTO> result = projectService.getProjectsByEmployee("e1");

        assertEquals(1, result.size());
    }




    @Test
    void testUpdateMemberRole() {
        String projectId = "p1";
        String employeeId = "e1";
        String newRole = "Dev";

        Project project = new Project();
        ProjectMember member = new ProjectMember();
        member.setEmployeeId("e1");
        member.setRole("Old");

        project.setMembers(new ArrayList<>(List.of(member)));

        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectRepository.save(any())).thenReturn(project);

        assertDoesNotThrow(() -> projectService.updateMemberRole(projectId, employeeId, newRole));
        assertEquals("Dev", project.getMembers().get(0).getRole());
    }
}
