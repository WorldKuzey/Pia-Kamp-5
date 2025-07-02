package com.team.five.ikon.app.services;

import com.team.five.ikon.app.dto.LeaveRequestDTO;

import java.util.List;

public interface ILeaveRequestService {
    LeaveRequestDTO createLeaveRequest(LeaveRequestDTO dto);

    List<LeaveRequestDTO> getAll();

    List<LeaveRequestDTO> getByEmployeeId(String employeeId);

    List<LeaveRequestDTO> getByStatus(String status);

    List<LeaveRequestDTO> getByEmployeeIdAndStatus(String employeeId, String status);

    LeaveRequestDTO getById(String id);
}
