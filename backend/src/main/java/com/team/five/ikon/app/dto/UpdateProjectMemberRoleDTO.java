package com.team.five.ikon.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateProjectMemberRoleDTO {

    @NotBlank(message = "Projedeki rol boş bırakılamaz.")
    private String roleInProject;

}
