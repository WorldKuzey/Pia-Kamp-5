package com.team.five.ikon.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employees")
@Data

@AllArgsConstructor
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

    public Employee() {}

    public Employee(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}