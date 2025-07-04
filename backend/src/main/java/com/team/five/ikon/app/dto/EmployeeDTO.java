package com.team.five.ikon.app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.Gender;
import lombok.Data;

import java.time.LocalDate;

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
    private long salary;
    private String address;



    /* LocalDate tür olarak doğum tarihini YIL-AY-GÜN (yyyy-MM-dd) şeklinde tutuyor.
    Kullanıcı da arayüzde ters girse bile kaydederken bu şekilde girmeli ki yaşını hesaplama
    işlemi doğru çalışabilsin */

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate date_of_birth;  // burayı Date'den LocalDate'e değiştirdik
    private short age;
    private short birth_year;



}