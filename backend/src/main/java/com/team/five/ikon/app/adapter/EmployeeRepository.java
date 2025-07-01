package com.team.five.ikon.app.adapter;

import com.team.five.ikon.app.domain.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

    Employee findByEmail(String email);
}
