package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.LeaveRequestDTO;
import com.team.five.ikon.app.entity.Employee;
import com.team.five.ikon.app.entity.LeaveRequest;
import com.team.five.ikon.app.enums.LeaveStatus;
import com.team.five.ikon.app.repository.EmployeeRepository;
import com.team.five.ikon.app.repository.LeaveRequestRepository;
import com.team.five.ikon.app.services.ILeaveRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveRequestServiceIMPL implements ILeaveRequestService {

    private final LeaveRequestRepository repository;
    private final EmployeeRepository employeeRepository;

    @Override
    public List<LeaveRequestDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<LeaveRequestDTO> getByStatus(LeaveStatus status) {
        return repository.findByStatus(status).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<LeaveRequestDTO> getByEmployeeIdAndStatus(String employeeId, LeaveStatus status) {
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

        // Çalışanı bul
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Çalışan bulunamadı."));

        // Kalan gün kontrolü
        long dayCount = leave.getDays();

        int remainingDays = switch (dto.getLeaveType()) {
            case ANNUAL_LEAVE -> employee.getRemainingAnnualLeave();
            case SICK_LEAVE -> employee.getRemainingSickLeave();
            case FATHER_LEAVE -> employee.getRemainingFatherLeave();
            case MARRIAGE_LEAVE -> employee.getRemainingMarriageLeave();
        };


        if (dayCount > remainingDays) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Yetersiz izin hakkı. Kalan gün: " + remainingDays
            );
        }

        leave.setStatus(LeaveStatus.PENDING); // default statü
        LeaveRequest saved = repository.save(leave);

        LeaveRequestDTO response = new LeaveRequestDTO();
        BeanUtils.copyProperties(saved, response);
        return response;
    }


    @Override
    public LeaveRequestDTO updateLeaveStatus(String leaveId, LeaveStatus status, String approverId) {
        LeaveRequest leave = repository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("İzin talebi bulunamadı."));

        // Onaylayan çalışanın bilgilerini çek
        Employee approver = employeeRepository.findById(approverId)
                .orElseThrow(() -> new RuntimeException("Onaylayan çalışan bulunamadı."));

        // Rol kontrolü
        if (!"HR".equalsIgnoreCase(approver.getRole())) {
            throw new RuntimeException("Sadece İnsan Kaynakları (HR) izin talebini onaylayabilir veya reddedebilir.");
        }

        leave.setStatus(status);
        leave.setApprovedByFirstName(approver.getFirstName());
        leave.setApprovedByLastName(approver.getLastName());

        // Eğer izin onaylandıysa, çalışan bilgilerini bul ve kalan günleri azalt
        if (status == LeaveStatus.APPROVED) {
            Employee employee = employeeRepository.findById(leave.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("İzin sahibi çalışan bulunamadı."));

            long usedDays = leave.getDays(); // Kaç gün izin kullandıysa

            switch (leave.getLeaveType()) {
                case ANNUAL_LEAVE -> employee.setRemainingAnnualLeave(
                        employee.getRemainingAnnualLeave() - (int) usedDays
                );
                case SICK_LEAVE -> employee.setRemainingSickLeave(
                        employee.getRemainingSickLeave() - (int) usedDays
                );
                case FATHER_LEAVE -> employee.setRemainingFatherLeave(
                        employee.getRemainingFatherLeave() - (int) usedDays
                );
                case MARRIAGE_LEAVE -> employee.setRemainingMarriageLeave(
                        employee.getRemainingMarriageLeave() - (int) usedDays
                );
            }

            employeeRepository.save(employee); // çalışan güncellenmiş haliyle kaydedilir
        }

        LeaveRequest updated = repository.save(leave);
        LeaveRequestDTO dto = new LeaveRequestDTO();
        BeanUtils.copyProperties(updated, dto);
        return dto;
    }







}
