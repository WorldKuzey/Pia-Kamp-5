package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.*;
import com.team.five.ikon.app.entity.Employee;
import com.team.five.ikon.app.enums.Gender;
import com.team.five.ikon.app.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EmployeeServiceIMPLTest {

    private EmployeeRepository employeeRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private EmployeeServiceIMPL employeeService;

    @BeforeEach
    void setUp() {
        employeeRepository = mock(EmployeeRepository.class);
        passwordEncoder = mock(BCryptPasswordEncoder.class);
        employeeService = new EmployeeServiceIMPL(passwordEncoder, employeeRepository);
    }

    @Test
    void testCreate() {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setFirstName("Ali");
        dto.setPassword("1234");

        Employee saved = new Employee();
        saved.setId("1");
        saved.setFirstName("Ali");

        when(passwordEncoder.encode("1234")).thenReturn("enc");
        when(employeeRepository.save(any(Employee.class))).thenReturn(saved);

        EmployeeDTO result = employeeService.create(dto);
        assertEquals("Ali", result.getFirstName());
    }

    @Test
    void testGetAllEmployees() {
        when(employeeRepository.findAll()).thenReturn(List.of(new Employee(), new Employee()));
        List<EmployeeDTO> list = employeeService.getAllEmployees();
        assertEquals(2, list.size());
    }


    @Test
    void testGetEmployeeById() {
        Employee emp = new Employee();
        emp.setId("1");
        emp.setFirstName("Mehmet");

        when(employeeRepository.findById("1")).thenReturn(Optional.of(emp));
        EmployeeDTO result = employeeService.getEmployeeById("1");
        assertEquals("Mehmet", result.getFirstName());
    }

    @Test
    void testCalculateAge() {
        LocalDate birth = LocalDate.now().minusYears(30);
        assertEquals(30, employeeService.calculateAge(birth));
    }

    @Test
    void testCalculateBirthYear() {
        LocalDate birth = LocalDate.of(1995, 5, 1);
        assertEquals(1995, employeeService.calculateBirthYear(birth));
    }


    @Test
    void testLoginSuccess() {
        Employee emp = new Employee();
        emp.setEmail("ali@test.com");
        emp.setPassword("encoded");

        when(employeeRepository.findByEmail("ali@test.com")).thenReturn(emp);
        when(passwordEncoder.matches("1234", "encoded")).thenReturn(true);

        LoginRequestDTO request = new LoginRequestDTO();
        request.setEmail("ali@test.com");
        request.setPassword("1234");

        EmployeeDTO result = employeeService.login(request);
        assertEquals("ali@test.com", result.getEmail());
    }

    @Test
    void testLoginFailureWrongPassword() {
        Employee emp = new Employee();
        emp.setEmail("ali@test.com");
        emp.setPassword("encoded");

        when(employeeRepository.findByEmail("ali@test.com")).thenReturn(emp);
        when(passwordEncoder.matches("wrong", "encoded")).thenReturn(false);

        LoginRequestDTO request = new LoginRequestDTO();
        request.setEmail("ali@test.com");
        request.setPassword("wrong");

        assertThrows(RuntimeException.class, () -> employeeService.login(request));
    }


    @Test
    void testHRRegisterSuccess() {
        RegisterRequestDTO request = new RegisterRequestDTO();
        request.setFirstName("Fatma");
        request.setEmail("fatma@hr.com");
        request.setPassword("1234");

        when(employeeRepository.findByEmail("fatma@hr.com")).thenReturn(null);
        when(passwordEncoder.encode("1234")).thenReturn("encoded123");

        Employee saved = new Employee();
        saved.setFirstName("Fatma");
        saved.setEmail("fatma@hr.com");
        saved.setPassword("encoded123");
        saved.setRole("HR");

        when(employeeRepository.save(any())).thenReturn(saved);

        EmployeeDTO result = employeeService.HR_register(request);
        assertEquals("Fatma", result.getFirstName());
        assertEquals("HR", result.getRole());
    }


    @Test
    void testUpdateEmployee() {
        Employee existing = new Employee();
        existing.setId("1");
        existing.setFirstName("Mehmet");

        EmployeeDTO updateDTO = new EmployeeDTO();
        updateDTO.setFirstName("Kemal");
        updateDTO.setEmail("kemal@test.com");

        when(employeeRepository.findById("1")).thenReturn(Optional.of(existing));
        when(employeeRepository.save(any())).thenReturn(existing);

        EmployeeDTO result = employeeService.updateEmployee("1", updateDTO);

        assertEquals("Kemal", result.getFirstName());
        assertEquals("kemal@test.com", result.getEmail());
    }

    @Test
    void testUpdatePasswordForEmployee() {
        Employee existing = new Employee();
        existing.setId("1");
        existing.setPassword("old");

        UpdatePasswordRequestDTO dto = new UpdatePasswordRequestDTO();
        dto.setPassword("newPass");

        when(employeeRepository.findById("1")).thenReturn(Optional.of(existing));
        when(passwordEncoder.encode("newPass")).thenReturn("encodedNew");
        when(employeeRepository.save(any())).thenReturn(existing);

        EmployeeDTO result = employeeService.updatePasswordForEmployee("1", dto);
        assertNotNull(result);
    }


    @Test
    void testDeleteEmployee() {
        Employee emp = new Employee();
        emp.setId("1");

        when(employeeRepository.findById("1")).thenReturn(Optional.of(emp));
        doNothing().when(employeeRepository).delete(emp);

        assertDoesNotThrow(() -> employeeService.delete("1"));
    }

    @Test
    void testGetAllEmployeeSummaries() {
        Employee emp = new Employee();
        emp.setFirstName("Ayşe");
        emp.setLastName("Yılmaz");
        emp.setDepartment("IT");
        emp.setTitle("Developer");
        emp.setEmail("ayse@test.com");
        emp.setRole("employee");

        when(employeeRepository.findAll()).thenReturn(List.of(emp));

        List<EmployeeSummaryDTO> summaries = employeeService.getAllEmployeeSummaries();

        assertEquals(1, summaries.size());
        assertEquals("Ayşe", summaries.get(0).getFirstName());
    }



    @Test
    void testFilterEmployees() {
        Employee emp1 = new Employee();
        emp1.setId("1");
        emp1.setGender(Gender.FEMALE);
        emp1.setDepartment("IT");
        emp1.setRole("employee");
        emp1.setTitle("Developer");

        when(employeeRepository.findAll()).thenReturn(List.of(emp1));

        List<EmployeeSummaryDTO> result = employeeService.filterEmployees("1", Gender.FEMALE, "IT", "employee", "Developer");

        assertEquals(1, result.size());
        assertEquals("1", result.get(0).getId());
    }











}
