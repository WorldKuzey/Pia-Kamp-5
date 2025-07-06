package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.*;
import com.team.five.ikon.app.entity.Employee;
import com.team.five.ikon.app.enums.Gender;
import com.team.five.ikon.app.repository.EmployeeRepository;
import com.team.five.ikon.app.services.IEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceIMPL implements IEmployeeService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO create(EmployeeDTO dto) {
        Employee employee = convertToEntity(dto);
        return convertToDTO(employeeRepository.save(employee));
    }

    /*
    @Override
    public void delete(String id) {
        employeeRepository.deleteById(id);
    }

     */


    /*
    @Override
    public EmployeeDTO register(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDTO, employee);

        // Hash the password
        employee.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));

        // Default role (if none)
        if (employee.getRole() == null) {
            employee.setRole("HR");
        }

        // Save to DB
        Employee saved = employeeRepository.save(employee);

        return convertToDTO(saved);
    }

    */

    @Override
    public EmployeeDTO login(LoginRequestDTO loginRequest) {
        Employee employee = employeeRepository.findByEmail(loginRequest.getEmail());
        if (employee == null || !passwordEncoder.matches(loginRequest.getPassword(), employee.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return convertToDTO(employee);
    }

    @Override
    public EmployeeDTO HR_register(RegisterRequestDTO requestDTO) {
        if (employeeRepository.findByEmail(requestDTO.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }

        Employee employee = new Employee();
        employee.setFirstName(requestDTO.getFirstName());
        employee.setEmail(requestDTO.getEmail());
        employee.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
        employee.setRole("HR");// Encrypt password

        employee = employeeRepository.save(employee);

        EmployeeDTO response = new EmployeeDTO();
        BeanUtils.copyProperties(employee, response);
        return response;
    }


    private EmployeeDTO convertToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        BeanUtils.copyProperties(employee, dto);
        return dto;
    }


    private Employee convertToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(dto, employee);
        return employee;
    }




    /// ///TURAL 100-300 /////////////

    /// Secilmis kisinin bilgilerini ceker ////
    @Override
    public EmployeeDTO getEmployeeById(String id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        return convertToDTO(employee); // This is your method to map Employee -> EmployeeDTO
    }


































































    //employee'nin istenen özelliklerini update etme methodu

    /// /////////ENES 300- 500///////

    @Override
    public List<EmployeeSummaryDTO> getAllEmployeeSummaries() {
        return employeeRepository.findAll().stream().map(employee -> {
            EmployeeSummaryDTO dto = new EmployeeSummaryDTO();
            dto.setFirstName(employee.getFirstName());
            dto.setLastName(employee.getLastName());
            dto.setDepartment(employee.getDepartment());
            dto.setTitle(employee.getTitle());
            dto.setEmail(employee.getEmail());
            dto.setRole(employee.getRole());
            return dto;
        }).collect(Collectors.toList());
    }



    @Override
    public List<EmployeeSummaryDTO> filterEmployees(Gender gender, String department, String role, String title) {
        return employeeRepository.findAll().stream()
                .filter(emp -> gender == null || (emp.getGender() != null && emp.getGender().equals(gender)))
                .filter(emp -> department == null || emp.getDepartment().equalsIgnoreCase(department))
                .filter(emp -> role == null || emp.getRole().equalsIgnoreCase(role))
                .filter(emp -> title == null || emp.getTitle().equalsIgnoreCase(title))
                .map(emp -> {
                    EmployeeSummaryDTO dto = new EmployeeSummaryDTO();
                    dto.setFirstName(emp.getFirstName());
                    dto.setLastName(emp.getLastName());
                    dto.setDepartment(emp.getDepartment());
                    dto.setTitle(emp.getTitle());
                    dto.setGender(emp.getGender());
                    return dto;
                })
                .collect(Collectors.toList());
    }




























































































































































































































    /// /// BILGE 500+ ////////////////

























































































































    public EmployeeDTO updateEmployee(String id, EmployeeDTO dto) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

        if (dto.getFirstName() != null) existing.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) existing.setLastName(dto.getLastName());
        if (dto.getEmail() != null) existing.setEmail(dto.getEmail());
        if (dto.getDepartment() != null) existing.setDepartment(dto.getDepartment());
        if (dto.getTitle() != null) existing.setTitle(dto.getTitle());
        if (dto.getPhone() != null) existing.setPhone(dto.getPhone());
        if (dto.getGender() != null) existing.setGender(dto.getGender());
        if (dto.getTc() != 0) existing.setTc(dto.getTc());
        if (dto.getSalary() != 0) existing.setSalary(dto.getSalary());
        if (dto.getAddress() != null) existing.setAddress(dto.getAddress());



        Employee saved_employee = employeeRepository.save(existing);
        return convertToDTO(saved_employee);
    }








    //İnsan kaynakları yeni çalışan ekleme methodu

    @Override
    public EmployeeDTO register(EmployeeDTO dto, MultipartFile imageFile) throws IOException {

        Employee employee = new Employee();

        if (employeeRepository.findByEmail(dto.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setDepartment(dto.getDepartment());
        employee.setTitle(dto.getTitle());
        employee.setPhone(dto.getPhone());
        employee.setPassword(passwordEncoder.encode(dto.getPassword()));
        //employee.setRole(dto.getRole());

        String departmentName = "İnsan Kaynakları";

        if (dto.getDepartment() != null && dto.getDepartment().trim().equalsIgnoreCase(departmentName)) {
            employee.setRole("HR");
        } else {
            employee.setRole("Employee");
        }

        /////yeni eklenen özellikler

        employee.setGender(dto.getGender());
        employee.setTc(dto.getTc());
        employee.setSalary(dto.getSalary());
        employee.setAddress(dto.getAddress());
        employee.setDate_of_birth(dto.getDate_of_birth());
        employee.setImageUrl(dto.getImageUrl());

        ///// Handle file upload

        handleImageUpload(employee, imageFile);



        ///// doğum yılı ve yaşı utility (yardımcı) methodları kullanarak oluşturma

        // LocalDate ile hesaplamalar:
        LocalDate birthDate = dto.getDate_of_birth();
        employee.setBirth_year(calculateBirthYear(birthDate));
        employee.setAge(calculateAge(birthDate));

        Employee emp_saved = employeeRepository.save(employee);
        return convertToDTO(emp_saved);
    }






// çalışanın date türündeki doğum tarihinden doğum yılını bulma methodu

    //date'i local date'e çeviriyor. ardından shorta cast edip, db'de employee'nin
    // birth year değerini dolduruyor.

    public short calculateBirthYear(LocalDate birthDate) {
        if (birthDate == null) throw new IllegalArgumentException("birthDate boş olamaz");
        return (short) birthDate.getYear();
    }

    //çalışanın birth year değişkenini ve anlık tarihi kullanarak yaşını hesaplayan method

    public short calculateAge(LocalDate birthDate) {
        if (birthDate == null) throw new IllegalArgumentException("birthDate boş olamaz");
        LocalDate today = LocalDate.now();
        return (short) Period.between(birthDate, today).getYears();
    }


    ///upload image methodu:

    private void handleImageUpload(Employee employee, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String uploadDir = "uploads/employee-images/";
            String filename = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            employee.setImageUrl("/" + uploadDir + filename);
        } else {
            employee.setImageUrl(null);
        }
    }





    //silinmek istenen user yoksa uyarı methodu (postman body message uyarısı)
    public void delete(String id) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));
        employeeRepository.delete(emp);
    }

    // çalışanın kendi profilinde sadece şifresini update edebilmesi için method:

    @Override
    public EmployeeDTO updatePasswordForEmployee(String id, UpdatePasswordRequestDTO request) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        existing.setPassword(passwordEncoder.encode(request.getPassword()));
        Employee saved = employeeRepository.save(existing);

        return convertToDTO(saved);
    }


    @Override
    public EmployeeDTO updateEmployeeImage(String id, MultipartFile imageFile) throws IOException {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        // Use your existing utility
        handleImageUpload(employee, imageFile);

        Employee saved = employeeRepository.save(employee);

        return convertToDTO(saved);
    }




}