package com.team.five.ikon.app.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjectMember {

    @NotBlank(message = "Çalışan ID boş olamaz")
    private String employeeId;

    @NotBlank(message = "Projede rol belirtilmelidir")
    private String role; // örnek: Developer, QA, Designer
}
