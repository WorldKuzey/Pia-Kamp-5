package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.LoginRequestDTO;
import com.team.five.ikon.app.repository.EmployeeRepository;
import com.team.five.ikon.app.entity.Employee;
import com.team.five.ikon.app.services.impl.EmployeeServiceIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeServiceIMPL employeeService;

    @GetMapping
    public List<EmployeeDTO> getAll() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public EmployeeDTO create(@RequestBody EmployeeDTO dto) {
        return employeeService.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        employeeService.delete(id);
    }

    @PostMapping("/register")
    public EmployeeDTO register(@RequestBody EmployeeDTO dto) {
        return employeeService.register(dto);
    }

    @PostMapping("/login")
    public EmployeeDTO login(@RequestBody LoginRequestDTO loginRequest) {
        return employeeService.login(loginRequest);
    }
}
