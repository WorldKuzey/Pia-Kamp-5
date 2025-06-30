package com.team.five.ikon.app.adapter;

import com.team.five.ikon.app.domain.entity.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        employeeRepository.deleteById(id);
    }

    @PostMapping("/register")
    public Employee register(@RequestBody Employee employee) {
        // Basit kontrol: kullanıcı var mı
        if (employeeRepository.findByEmail(employee.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        return employeeRepository.save(employee);
    }


}
