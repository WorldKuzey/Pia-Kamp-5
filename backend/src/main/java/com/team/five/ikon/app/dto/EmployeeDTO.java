package com.team.five.ikon.app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team.five.ikon.app.enums.Gender;
import com.team.five.ikon.app.enums.LeaveType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private String imageUrl;



    /* LocalDate tür olarak doğum tarihini YIL-AY-GÜN (yyyy-MM-dd) şeklinde tutuyor.
    Kullanıcı da arayüzde ters girse bile kaydederken bu şekilde girmeli ki yaşını hesaplama
    işlemi doğru çalışabilsin */

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate date_of_birth;  // burayı Date'den LocalDate'e değiştirdik
    private short age;
    private short birth_year;


    // İzin türlerine göre kalan günler
    private int remainingAnnualLeave = LeaveType.ANNUAL_LEAVE.getDefaultDays();
    private int remainingSickLeave = LeaveType.SICK_LEAVE.getDefaultDays();
    private int remainingMarriageLeave = LeaveType.MARRIAGE_LEAVE.getDefaultDays();
    private int remainingFatherLeave = LeaveType.FATHER_LEAVE.getDefaultDays();



}