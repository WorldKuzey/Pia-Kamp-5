package com.team.five.ikon.app.services;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.EmployeeSummaryDTO;
import com.team.five.ikon.app.dto.LoginRequestDTO;
import com.team.five.ikon.app.dto.RegisterRequestDTO;
import com.team.five.ikon.app.enums.Gender;

import java.util.List;

public interface IEmployeeService {
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO create(EmployeeDTO dto);
    void delete(String id);
    EmployeeDTO register(EmployeeDTO dto);
    EmployeeDTO login(LoginRequestDTO loginRequest);
    EmployeeDTO HR_register(RegisterRequestDTO requestDTO);




    /// /// Tural 20-40//////

    EmployeeDTO getEmployeeById(String id);


















    /// ////ENES 40-60////////////,
    List<EmployeeSummaryDTO> getAllEmployeeSummaries();// Tüm çalışanları listeler
    List<EmployeeSummaryDTO> filterEmployees(Gender gender, String department, String role, String title);



















    /// ////////////BILGE 60+////////////////


    EmployeeDTO updateEmployee(String id, EmployeeDTO dto);



}