package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.ProjectDTO;
import com.team.five.ikon.app.dto.UpdateProjectMemberRoleDTO;
import com.team.five.ikon.app.services.IProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final IProjectService projectService;

    // Proje Oluştur
    @PostMapping
    public ResponseEntity<ProjectDTO> create(@RequestBody ProjectDTO dto) {
        return ResponseEntity.ok(projectService.createProject(dto));
    }

    // Proje Güncelle
    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> update(@PathVariable String id, @RequestBody ProjectDTO dto) {
        return ResponseEntity.ok(projectService.updateProject(id, dto));
    }

    // Proje Sil
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Proje başarıyla silindi.");
    }

    // Tüm Projeleri Getir
    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAll() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    // ID’ye Göre Proje Getir
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    // Yöneticinin Projeleri
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<ProjectDTO>> getByManager(@PathVariable String managerId) {
        return ResponseEntity.ok(projectService.getByManagerId(managerId));
    }

    // Aktif Projeleri Getir
    @GetMapping("/active")
    public ResponseEntity<List<ProjectDTO>> getActiveProjects() {
        return ResponseEntity.ok(projectService.getActiveProjects());
    }

    // Çalışanın Dahil Olduğu Projeler
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<ProjectDTO>> getByEmployee(@PathVariable String employeeId) {
        return ResponseEntity.ok(projectService.getProjectsByEmployee(employeeId));
    }


    @PatchMapping("/{projectId}/members/{employeeId}/role")
    public ResponseEntity<Void> updateMemberRole(
            @PathVariable String projectId,
            @PathVariable String employeeId,
            @RequestBody @Valid UpdateProjectMemberRoleDTO dto
    ) {
        projectService.updateMemberRole(projectId, employeeId, dto.getRoleInProject());
        return ResponseEntity.ok().build();
    }

}
