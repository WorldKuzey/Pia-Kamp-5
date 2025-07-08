package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.ProjectDTO;
import com.team.five.ikon.app.dto.ProjectMemberDTO;
import com.team.five.ikon.app.entity.Project;
import com.team.five.ikon.app.entity.ProjectMember;
import com.team.five.ikon.app.enums.ProjectStatus;
import com.team.five.ikon.app.repository.IProjectRepository;
import com.team.five.ikon.app.services.IProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceIMPL implements IProjectService {

    private final IProjectRepository projectRepository;

    @Override
    public ProjectDTO createProject(ProjectDTO dto) {
        Project project = convertToEntity(dto);
            Project saved = projectRepository.save(project);
        return convertToDTO(saved);
    }

    @Override
    public ProjectDTO updateProject(String id, ProjectDTO dto) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proje bulunamadı: " + id));

        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setStatus(dto.getStatus());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setProjectManagerId(dto.getProjectManagerId());
        existing.setMembers(dto.getMembers().stream().map(this::convertToEntity).collect(Collectors.toList()));

        Project updated = projectRepository.save(existing);
        return convertToDTO(updated);
    }

    @Override
    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }

    @Override
    public ProjectDTO getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proje bulunamadı: " + id));
        return convertToDTO(project);
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectDTO> getByManagerId(String managerId) {
        return projectRepository.findByProjectManagerId(managerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectDTO> getActiveProjects() {
        return projectRepository.findByStatus(ProjectStatus.ACTIVE).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    @Override
    public List<ProjectDTO> getProjectsByEmployee(String employeeId) {
        return projectRepository.findByMembersEmployeeId(employeeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    @Override
    public void updateMemberRole(String projectId, String employeeId, String newRole) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Proje bulunamadı."));

        boolean updated = false;

        for (ProjectMember member : project.getMembers()) {
            if (member.getEmployeeId().equals(employeeId)) {
                member.setRole(newRole);
                updated = true;
                break;
            }
        }

        if (!updated) {
            throw new RuntimeException("Çalışan bu projeye dahil değil.");
        }

        projectRepository.save(project);
    }


    // --- Yardımcı dönüşüm metotları ---
    private ProjectDTO convertToDTO(Project entity) {
        ProjectDTO dto = new ProjectDTO();
        BeanUtils.copyProperties(entity, dto);
        if (entity.getMembers() != null) {
            List<ProjectMemberDTO> members = entity.getMembers().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            dto.setMembers(members);
        }
        return dto;
    }

    private Project convertToEntity(ProjectDTO dto) {
        Project entity = new Project();
        BeanUtils.copyProperties(dto, entity);
        if (dto.getMembers() != null) {
            List<ProjectMember> members = dto.getMembers().stream()
                    .map(this::convertToEntity)
                    .collect(Collectors.toList());
            entity.setMembers(members);
        }
        return entity;
    }

    private ProjectMemberDTO convertToDTO(ProjectMember member) {
        ProjectMemberDTO dto = new ProjectMemberDTO();
        BeanUtils.copyProperties(member, dto);
        return dto;
    }

    private ProjectMember convertToEntity(ProjectMemberDTO dto) {
        ProjectMember member = new ProjectMember();
        BeanUtils.copyProperties(dto, member);
        return member;
    }
}
