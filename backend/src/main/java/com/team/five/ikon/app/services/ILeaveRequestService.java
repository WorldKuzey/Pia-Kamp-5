package com.team.five.ikon.app.services;

import com.team.five.ikon.app.dto.LeaveRequestDTO;

import java.util.List;

public interface ILeaveRequestService {

    List<LeaveRequestDTO> getAll();

    List<LeaveRequestDTO> getByStatus(String status);

    List<LeaveRequestDTO> getByEmployeeIdAndStatus(String employeeId, String status);

    LeaveRequestDTO getById(String id);

    List<LeaveRequestDTO> getByEmployeeId(String employeeId);

    LeaveRequestDTO createLeaveRequest(LeaveRequestDTO dto);




}
