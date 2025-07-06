package com.team.five.ikon.app.services;

import com.team.five.ikon.app.dto.*;
import com.team.five.ikon.app.enums.Gender;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IEmployeeService {
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO create(EmployeeDTO dto);
    void delete(String id);
    //EmployeeDTO register(EmployeeDTO dto);
    EmployeeDTO login(LoginRequestDTO loginRequest);
    EmployeeDTO HR_register(RegisterRequestDTO requestDTO);




    /// /// Tural 20-40//////

    EmployeeDTO getEmployeeById(String id);
    EmployeeDTO register(EmployeeDTO dto, MultipartFile file) throws IOException;

















    /// ////ENES 40-60////////////,
    List<EmployeeSummaryDTO> getAllEmployeeSummaries();// Tüm çalışanları listeler
    List<EmployeeSummaryDTO> filterEmployees(Gender gender, String department, String role, String title);



















    /// ////////////BILGE 60+////////////////


    EmployeeDTO updateEmployee(String id, EmployeeDTO dto);
    EmployeeDTO updatePasswordForEmployee(String id, UpdatePasswordRequestDTO request);
    EmployeeDTO updateEmployeeImage(String id, MultipartFile imageFile) throws IOException;



}