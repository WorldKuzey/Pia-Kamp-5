package com.team.five.ikon.app.repository;

import com.team.five.ikon.app.entity.Project;
import com.team.five.ikon.app.enums.ProjectStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProjectRepository extends MongoRepository<Project, String> {

    //Belirli bir yöneticinin projelerini getirir.
    List<Project> findByProjectManagerId(String managerId);

    List<Project> findByStatus(ProjectStatus status);

    //Embedded List<ProjectMember> içinde employeeId alanını arar.
    List<Project> findByMembersEmployeeId(String employeeId);

}
