package com.team.five.ikon.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjectMemberDTO {

    @NotBlank(message = "Çalışan ID boş olamaz")
    private String employeeId;

    @NotBlank(message = "Projede çalışan rolü belirtilmelidir")
    private String roleInProject; //"Developer", "Tester", "Team Lead"
}
