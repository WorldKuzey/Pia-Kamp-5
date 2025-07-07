package com.team.five.ikon.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.Gender;
import com.team.five.ikon.app.enums.LeaveType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "confessions")
public class Confession {

    @Id
    private String id;

    private String employeeId;
    private String nickname;
    private String confession_text;
    private LocalDateTime creation_time;
    private String ageInterval;
    private String department;




}
