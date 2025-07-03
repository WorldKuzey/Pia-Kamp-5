package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.EmployeeSummaryDTO;
import com.team.five.ikon.app.dto.LoginRequestDTO;
import com.team.five.ikon.app.dto.RegisterRequestDTO;
import com.team.five.ikon.app.entity.Employee;
import com.team.five.ikon.app.repository.EmployeeRepository;
import com.team.five.ikon.app.services.IEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceIMPL implements IEmployeeService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO create(EmployeeDTO dto) {
        Employee employee = convertToEntity(dto);
        return convertToDTO(employeeRepository.save(employee));
    }

    @Override
    public void delete(String id) {
        employeeRepository.deleteById(id);
    }


    /*
    @Override
    public EmployeeDTO register(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDTO, employee);

        // Hash the password
        employee.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));

        // Default role (if none)
        if (employee.getRole() == null) {
            employee.setRole("HR");
        }

        // Save to DB
        Employee saved = employeeRepository.save(employee);

        return convertToDTO(saved);
    }

    */

    @Override
    public EmployeeDTO login(LoginRequestDTO loginRequest) {
        Employee employee = employeeRepository.findByEmail(loginRequest.getEmail());
        if (employee == null || !passwordEncoder.matches(loginRequest.getPassword(), employee.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return convertToDTO(employee);
    }

    @Override
    public EmployeeDTO HR_register(RegisterRequestDTO requestDTO) {
        if (employeeRepository.findByEmail(requestDTO.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }

        Employee employee = new Employee();
        employee.setFirstName(requestDTO.getFirstName());
        employee.setEmail(requestDTO.getEmail());
        employee.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
        employee.setRole("HR");// Encrypt password

        employee = employeeRepository.save(employee);

        EmployeeDTO response = new EmployeeDTO();
        BeanUtils.copyProperties(employee, response);
        return response;
    }




    private EmployeeDTO convertToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        BeanUtils.copyProperties(employee, dto);
        return dto;
    }


    private Employee convertToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(dto, employee);
        return employee;
    }




    /// ///TURAL 100-300 /////////////

































































































































































































    /// /////////ENES 300- 500///////
    @Override
    public List<EmployeeSummaryDTO> getAllEmployeeSummaries() {
        return employeeRepository.findAll().stream().map(employee -> {
            EmployeeSummaryDTO dto = new EmployeeSummaryDTO();
            dto.setFirstName(employee.getFirstName());
            dto.setLastName(employee.getLastName());
            dto.setRole(employee.getRole());
            return dto;
        }).collect(Collectors.toList());
    }








    /// /// BILGE 500+ ////////////////



















































































































































































    /// /// BILGE 500+ ////////////////


    //İnsan kaynakları yeni çalışan ekleme methodu

    @Override
    public EmployeeDTO register(EmployeeDTO dto) {

        Employee employee = new Employee();

        if (employeeRepository.findByEmail(dto.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setDepartment(dto.getDepartment());
        employee.setTitle(dto.getTitle());
        employee.setPhone(dto.getPhone());
        employee.setPassword(passwordEncoder.encode(dto.getPassword()));
        //employee.setRole(dto.getRole());
        employee.setRole("employee");
        Employee emp_saved = employeeRepository.save(employee);
        return convertToDTO(emp_saved);
    }









}