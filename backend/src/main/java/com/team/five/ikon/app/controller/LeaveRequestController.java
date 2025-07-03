package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.LeaveRequestDTO;
import com.team.five.ikon.app.services.impl.LeaveRequestServiceIMPL;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveRequestController {

    //DI
    private final LeaveRequestServiceIMPL leaveService;

    //İzin oluşturma
    @PostMapping
    public LeaveRequestDTO create(@RequestBody LeaveRequestDTO dto) {
        return leaveService.createLeaveRequest(dto);
    }

    //İzini id ye göre çekme
    @GetMapping("/{id}")
    public LeaveRequestDTO getById(@PathVariable String id) {
        return leaveService.getById(id);
    }


    //Bütün izinleri getiren endpoint
    @GetMapping
    public List<LeaveRequestDTO> getAll(
            @RequestParam(required = false) String employeeId,
            @RequestParam(required = false) String status
    ) {
        if (employeeId != null && status != null) {
            return leaveService.getByEmployeeIdAndStatus(employeeId, status);
        } else if (employeeId != null) {
            return leaveService.getByEmployeeId(employeeId);
        } else if (status != null) {
            return leaveService.getByStatus(status);
        } else {
            return leaveService.getAll();
        }
    }

    //Çalışanın id sine göre izinlerini getirmek
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequestDTO> getByEmployeeId(@PathVariable String employeeId) {
        return leaveService.getByEmployeeId(employeeId);
    }

}