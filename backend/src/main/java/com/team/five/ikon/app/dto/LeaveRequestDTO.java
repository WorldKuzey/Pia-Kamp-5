package com.team.five.ikon.app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.LeaveStatus;
import com.team.five.ikon.app.enums.LeaveType;
import lombok.Data;

import java.time.LocalDate;
@Data
public class LeaveRequestDTO {
    private String id;
    private String employeeId;
    private LeaveType leaveType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private String reason;
    private LeaveStatus status;
}
