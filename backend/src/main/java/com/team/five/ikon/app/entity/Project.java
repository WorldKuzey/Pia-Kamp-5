package com.team.five.ikon.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "projects")
@Data
public class Project {

    @Id
    private String id;

    @NotBlank(message = "Proje adı boş olamaz")
    private String name;

    private String description;

    @NotNull(message = "Proje durumu boş olamaz")
    private ProjectStatus status;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotBlank(message = "Proje yöneticisi belirtilmelidir")
    private String projectManagerId;

    private List<@NotNull ProjectMember> members;
}
