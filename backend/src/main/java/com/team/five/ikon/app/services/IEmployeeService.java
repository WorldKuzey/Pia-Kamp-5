package com.team.five.ikon.app.services;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.LoginRequestDTO;

import java.util.List;

public interface IEmployeeService {
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO create(EmployeeDTO dto);
    void delete(String id);
    EmployeeDTO register(EmployeeDTO dto);
    EmployeeDTO login(LoginRequestDTO loginRequest);
}