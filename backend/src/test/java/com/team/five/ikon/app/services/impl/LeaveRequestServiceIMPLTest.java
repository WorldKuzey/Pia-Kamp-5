package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.LeaveRequestDTO;
import com.team.five.ikon.app.entity.Employee;
import com.team.five.ikon.app.entity.LeaveRequest;
import com.team.five.ikon.app.enums.LeaveStatus;
import com.team.five.ikon.app.enums.LeaveType;
import com.team.five.ikon.app.repository.EmployeeRepository;
import com.team.five.ikon.app.repository.LeaveRequestRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class LeaveRequestServiceIMPLTest {

    private LeaveRequestRepository leaveRequestRepository;
    private EmployeeRepository employeeRepository;
    private LeaveRequestServiceIMPL leaveService;

    @BeforeEach
    void setUp() {
        leaveRequestRepository = mock(LeaveRequestRepository.class);
        employeeRepository = mock(EmployeeRepository.class);
        leaveService = new LeaveRequestServiceIMPL(leaveRequestRepository, employeeRepository);
    }

    @Test
    void testGetAll() {
        LeaveRequest leave1 = new LeaveRequest();
        LeaveRequest leave2 = new LeaveRequest();
        when(leaveRequestRepository.findAll()).thenReturn(List.of(leave1, leave2));

        List<LeaveRequestDTO> result = leaveService.getAll();
        assertEquals(2, result.size());
    }

    @Test
    void testGetByStatus() {
        LeaveRequest leave = new LeaveRequest();
        leave.setStatus(LeaveStatus.PENDING);
        when(leaveRequestRepository.findByStatus(LeaveStatus.PENDING)).thenReturn(List.of(leave));

        List<LeaveRequestDTO> result = leaveService.getByStatus(LeaveStatus.PENDING);
        assertEquals(1, result.size());
        assertEquals(LeaveStatus.PENDING, result.get(0).getStatus());
    }

    @Test
    void testGetByEmployeeIdAndStatus() {
        LeaveRequest leave = new LeaveRequest();
        leave.setEmployeeId("emp123");
        leave.setStatus(LeaveStatus.APPROVED);
        when(leaveRequestRepository.findByEmployeeIdAndStatus("emp123", LeaveStatus.APPROVED))
                .thenReturn(List.of(leave));

        List<LeaveRequestDTO> result = leaveService.getByEmployeeIdAndStatus("emp123", LeaveStatus.APPROVED);
        assertEquals(1, result.size());
        assertEquals("emp123", result.get(0).getEmployeeId());
    }

    @Test
    void testGetById() {
        LeaveRequest leave = new LeaveRequest();
        leave.setId("id123");
        when(leaveRequestRepository.findById("id123")).thenReturn(Optional.of(leave));

        LeaveRequestDTO result = leaveService.getById("id123");
        assertEquals("id123", result.getId());
    }

    @Test
    void testGetByEmployeeId() {
        LeaveRequest leave = new LeaveRequest();
        leave.setEmployeeId("emp1");
        when(leaveRequestRepository.findByEmployeeId("emp1")).thenReturn(List.of(leave));

        List<LeaveRequestDTO> result = leaveService.getByEmployeeId("emp1");
        assertEquals(1, result.size());
        assertEquals("emp1", result.get(0).getEmployeeId());
    }

    @Test
    void testCreateLeaveRequest() {
        LeaveRequestDTO dto = new LeaveRequestDTO();
        dto.setEmployeeId("emp1");
        dto.setStartDate(LocalDate.now());
        dto.setEndDate(LocalDate.now().plusDays(2));
        dto.setLeaveType(LeaveType.ANNUAL_LEAVE);

        Employee employee = new Employee();
        employee.setId("emp1");
        employee.setRemainingAnnualLeave(10);  // bu önemli

        LeaveRequest leave = new LeaveRequest();
        leave.setId("lr1");

        when(employeeRepository.findById("emp1")).thenReturn(Optional.of(employee));
        when(leaveRequestRepository.save(any())).thenReturn(leave);

        LeaveRequestDTO result = leaveService.createLeaveRequest(dto);
        assertEquals("lr1", result.getId());
    }


    @Test
    void testUpdateLeaveStatus() {
        LeaveRequest leave = new LeaveRequest();
        leave.setId("lr1");
        leave.setStatus(LeaveStatus.PENDING);
        leave.setEmployeeId("emp1");
        leave.setLeaveType(LeaveType.ANNUAL_LEAVE); // ✅ bu satır kritik

        Employee approver = new Employee();
        approver.setId("hr123");
        approver.setRole("hr");

        Employee employee = new Employee();
        employee.setId("emp1");

        when(leaveRequestRepository.findById("lr1")).thenReturn(Optional.of(leave));
        when(employeeRepository.findById("hr123")).thenReturn(Optional.of(approver));
        when(employeeRepository.findById("emp1")).thenReturn(Optional.of(employee));
        when(leaveRequestRepository.save(any())).thenReturn(leave);

        LeaveRequestDTO result = leaveService.updateLeaveStatus("lr1", LeaveStatus.APPROVED, "hr123");
        assertEquals(LeaveStatus.APPROVED, result.getStatus());
    }



}
