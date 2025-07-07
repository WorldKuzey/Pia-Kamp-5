package com.team.five.ikon.app.repository;

import com.team.five.ikon.app.entity.Confession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfessionRepository extends MongoRepository<Confession, String> {



}
