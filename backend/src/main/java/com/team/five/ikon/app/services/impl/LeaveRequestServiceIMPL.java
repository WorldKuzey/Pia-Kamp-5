package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.LeaveRequestDTO;
import com.team.five.ikon.app.entity.LeaveRequest;
import com.team.five.ikon.app.enums.LeaveStatus;
import com.team.five.ikon.app.repository.LeaveRequestRepository;
import com.team.five.ikon.app.services.ILeaveRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveRequestServiceIMPL implements ILeaveRequestService {

    private final LeaveRequestRepository repository;

    @Override
    public List<LeaveRequestDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<LeaveRequestDTO> getByStatus(String status) {
        return repository.findByStatus(status).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<LeaveRequestDTO> getByEmployeeIdAndStatus(String employeeId, String status) {
        return repository.findByEmployeeIdAndStatus(employeeId, status).stream().map(this::toDTO).collect(Collectors.toList());
    }

    private LeaveRequestDTO toDTO(LeaveRequest entity) {
        LeaveRequestDTO dto = new LeaveRequestDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }

    @Override
    public LeaveRequestDTO getById(String id) {
        LeaveRequest leave = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        LeaveRequestDTO dto = new LeaveRequestDTO();
        BeanUtils.copyProperties(leave, dto);
        return dto;
    }

    @Override
    public List<LeaveRequestDTO> getByEmployeeId(String employeeId) {
        List<LeaveRequest> leaves = repository.findByEmployeeId(employeeId);

        return leaves.stream().map(leave -> {
            LeaveRequestDTO dto = new LeaveRequestDTO();
            BeanUtils.copyProperties(leave, dto);
            return dto;
        }).toList();
    }


    //Kaç gün izin kullandığını hesaplayan service
    @Override
    public LeaveRequestDTO createLeaveRequest(LeaveRequestDTO dto) {
        LeaveRequest leave = new LeaveRequest();
        BeanUtils.copyProperties(dto, leave);

        // Gün farkını hesapla
        if (dto.getStartDate() != null && dto.getEndDate() != null) {
            long dayCount = ChronoUnit.DAYS.between(dto.getStartDate(), dto.getEndDate()) + 1; // her iki gün dahilse +1
            leave.setDays(dayCount);
        } else {
            leave.setDays(0);
        }

        leave.setStatus(LeaveStatus.PENDING); // default statü
        LeaveRequest saved = repository.save(leave);

        LeaveRequestDTO response = new LeaveRequestDTO();
        BeanUtils.copyProperties(saved, response);
        return response;
    }




}
