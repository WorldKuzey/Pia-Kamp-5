package com.team.five.ikon.app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ProjectDTO {

    private String id; // Güncelleme işlemlerinde kullanılabilir

    @NotBlank(message = "Proje adı boş olamaz")
    private String name;

    private String description;

    @NotNull(message = "Proje durumu belirtilmelidir")
    private ProjectStatus status;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotBlank(message = "Proje yöneticisinin ID’si zorunludur")
    private String projectManagerId;

    @NotNull(message = "Proje üyeleri listesi boş olamaz")
    private List<ProjectMemberDTO> members;
}