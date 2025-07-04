package com.team.five.ikon.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.LeaveStatus;
import com.team.five.ikon.app.enums.LeaveType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "leaves")
@Data
public class LeaveRequest {
    @Id
    private String id;
    private String employeeId;
    private LeaveType leaveType;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;
    private String reason;
    private LeaveStatus status;

    private long days;

    private String approvedByFirstName;
    private String approvedByLastName;

}