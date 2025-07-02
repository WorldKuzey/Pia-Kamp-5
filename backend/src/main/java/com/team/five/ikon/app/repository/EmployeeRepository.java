package com.team.five.ikon.app.repository;

import com.team.five.ikon.app.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

    Employee findByEmail(String email);
}
