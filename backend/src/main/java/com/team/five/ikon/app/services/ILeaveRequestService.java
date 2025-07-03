package com.team.five.ikon.app.services;

import com.team.five.ikon.app.dto.LeaveRequestDTO;
import com.team.five.ikon.app.enums.LeaveStatus;

import java.util.List;

public interface ILeaveRequestService {

    List<LeaveRequestDTO> getAll();

    List<LeaveRequestDTO> getByStatus(LeaveStatus status);

    List<LeaveRequestDTO> getByEmployeeIdAndStatus(String employeeId, LeaveStatus status);

    LeaveRequestDTO getById(String id);

    List<LeaveRequestDTO> getByEmployeeId(String employeeId);

    LeaveRequestDTO createLeaveRequest(LeaveRequestDTO dto);

    LeaveRequestDTO updateLeaveStatus(String leaveId, LeaveStatus status, String approverId);
}
