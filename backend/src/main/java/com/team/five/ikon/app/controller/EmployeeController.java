package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.LoginRequestDTO;
import com.team.five.ikon.app.dto.RegisterRequestDTO;
import com.team.five.ikon.app.services.impl.EmployeeServiceIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    //deneme

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
/*
    @PostMapping("/register")
    public EmployeeDTO register(@RequestBody EmployeeDTO dto) {
        return employeeService.register(dto);
    }

 */

    @PostMapping("/register")
    public ResponseEntity<EmployeeDTO> register(@RequestBody RegisterRequestDTO requestDTO) {
        EmployeeDTO registeredUser = employeeService.register(requestDTO);
        return ResponseEntity.ok(registeredUser);
    }

   /* @PostMapping("/login")
    public EmployeeDTO login(@RequestBody LoginRequestDTO loginRequest) {
        return employeeService.login(loginRequest);
    }
    */


    @PostMapping("/login")
    public ResponseEntity<EmployeeDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        EmployeeDTO dto = employeeService.login(loginRequest);
        return ResponseEntity.ok(dto);
    }
}
