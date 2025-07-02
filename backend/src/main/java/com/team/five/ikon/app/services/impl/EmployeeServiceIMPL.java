package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.LoginRequestDTO;
import com.team.five.ikon.app.entity.Employee;
import com.team.five.ikon.app.repository.EmployeeRepository;
import com.team.five.ikon.app.services.IEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceIMPL implements IEmployeeService {

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

    @Override
    public EmployeeDTO register(EmployeeDTO dto) {
        if (employeeRepository.findByEmail(dto.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        Employee employee = convertToEntity(dto);
        return convertToDTO(employeeRepository.save(employee));
    }

    @Override
    public EmployeeDTO login(LoginRequestDTO loginRequest) {
        Employee employee = employeeRepository.findByEmail(loginRequest.getEmail());
        if (employee == null || !employee.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return convertToDTO(employee);
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
}