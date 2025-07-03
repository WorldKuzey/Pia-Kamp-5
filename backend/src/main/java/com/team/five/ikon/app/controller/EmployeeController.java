package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.EmployeeSummaryDTO;
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


    @PostMapping("/login")
    public ResponseEntity<EmployeeDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        EmployeeDTO dto = employeeService.login(loginRequest);
        return ResponseEntity.ok(dto);
    }




//////// TURAL 66- 150///////////////

@PostMapping("/hr_register")
public ResponseEntity<EmployeeDTO> register(@RequestBody RegisterRequestDTO requestDTO) {
    EmployeeDTO registeredUser = employeeService.HR_register(requestDTO);
    return ResponseEntity.ok(registeredUser);
}
































































































////////////////////////// ENES 150-250 ////////////////////////////////////////////////

@GetMapping("/summaries")
public List<EmployeeSummaryDTO> getAllSummaries() {
    return employeeService.getAllEmployeeSummaries();
}



































































































//////////////////////////////////////// BILGE 250-350////////////////////////////////////////////////////////////

//yeni çalışan ekleme request (postman)

@PostMapping("/register")
public EmployeeDTO register(@RequestBody EmployeeDTO dto) {
    return employeeService.register(dto);
}








/// / DSKDSKDSKDSK
}

