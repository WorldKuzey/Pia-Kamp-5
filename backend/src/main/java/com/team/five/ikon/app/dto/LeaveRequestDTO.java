package com.team.five.ikon.app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.LeaveStatus;
import com.team.five.ikon.app.enums.LeaveType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
@Data
public class LeaveRequestDTO {
    private String id;
    private String employeeId;
    @NotBlank(message = "Leave type is required")
    private LeaveType leaveType;
    @NotNull(message = "Start date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @NotNull(message = "End date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private String reason;
    private LeaveStatus status;

    private long days;

    private String approvedByFirstName;
    private String approvedByLastName;

}
