package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.LeaveRequestDTO;
import com.team.five.ikon.app.enums.LeaveStatus;
import com.team.five.ikon.app.services.ILeaveRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveRequestController {

    //DI
    private final ILeaveRequestService ILeaveRequestService;

    //İzin oluşturma
    @PostMapping
    public LeaveRequestDTO create(@RequestBody LeaveRequestDTO dto) {
        return ILeaveRequestService.createLeaveRequest(dto);
    }
    
    //İzini id ye göre çekme
    @GetMapping("/{id}")
    public LeaveRequestDTO getById(@PathVariable String id) {
        return ILeaveRequestService.getById(id);
    }


    //Bütün izinleri getiren endpoint
    @GetMapping
    public List<LeaveRequestDTO> getAll(
            @RequestParam(required = false) String employeeId,
            @RequestParam(required = false) LeaveStatus status
    ) {
        if (employeeId != null && status != null) {
            return ILeaveRequestService.getByEmployeeIdAndStatus(employeeId, status);
        } else if (employeeId != null) {
            return ILeaveRequestService.getByEmployeeId(employeeId);
        } else if (status != null) {
            return ILeaveRequestService.getByStatus(status);
        } else {
            return ILeaveRequestService.getAll();
        }
    }

    //Çalışanın id sine göre izinlerini getirmek
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequestDTO> getByEmployeeId(@PathVariable String employeeId) {
        return ILeaveRequestService.getByEmployeeId(employeeId);
    }



    // http://localhost:5000/api/leaves/{leaveId}/status?status=APPROVED&approverId={approverId}
    //Bunu web sitesinden çekiiceksiniz(Update method,PatchMapping)
    @PatchMapping("/{leaveId}/status")
    public LeaveRequestDTO updateStatus(
            @PathVariable String leaveId,
            @RequestParam LeaveStatus status,
            @RequestParam String approverId // onaylayan kişi
    ) {
        return ILeaveRequestService.updateLeaveStatus(leaveId, status, approverId);
    }





}