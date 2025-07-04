package com.team.five.ikon.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "employees")
@Data

@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
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
    private long salary;
    private String address;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate date_of_birth;  // burayı Date'den LocalDate'e değiştirdik
    private short age;
    private short birth_year;


}