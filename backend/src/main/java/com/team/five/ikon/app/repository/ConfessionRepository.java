package com.team.five.ikon.app.repository;

import com.team.five.ikon.app.entity.Confession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConfessionRepository extends MongoRepository<Confession, String> {


    List<Confession> findByEmployeeId(String employeeId);

}
