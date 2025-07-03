package com.team.five.ikon.app.repository;

import com.team.five.ikon.app.entity.LeaveRequest;
import com.team.five.ikon.app.enums.LeaveStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends MongoRepository<LeaveRequest, String> {

    List<LeaveRequest> findByEmployeeId(String employeeId);

    List<LeaveRequest> findByStatus(LeaveStatus status);

    List<LeaveRequest> findByEmployeeIdAndStatus(String employeeId, LeaveStatus status);
}

