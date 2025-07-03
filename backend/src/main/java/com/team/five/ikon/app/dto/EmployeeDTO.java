package com.team.five.ikon.app.dto;

import com.team.five.ikon.app.enums.Gender;
import lombok.Data;

@Data
public class EmployeeDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String department;
    private String title;
    private String email;
    private String phone;
    private String role;
    private String password;
    private Gender gender;
    private long tc;
    private short salary;
    private String address;

}