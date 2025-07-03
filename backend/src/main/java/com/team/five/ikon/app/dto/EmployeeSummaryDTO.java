package com.team.five.ikon.app.dto;

import com.team.five.ikon.app.enums.Gender;
import lombok.Data;

import java.util.Date;

@Data
public class EmployeeSummaryDTO {
    private String firstName;
    private String lastName;
    private String role;
    private Gender gender;
    private String address;
    private String phone;
    private String department;
    private long tc;
    private String title;
    private String email;
    private Date date_of_birth;
    private short age;




}