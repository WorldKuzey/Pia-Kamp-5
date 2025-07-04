package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.EmployeeDTO;
import com.team.five.ikon.app.dto.EmployeeSummaryDTO;
import com.team.five.ikon.app.dto.LoginRequestDTO;
import com.team.five.ikon.app.dto.RegisterRequestDTO;
import com.team.five.ikon.app.enums.Gender;
import com.team.five.ikon.app.services.IEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {



    private final IEmployeeService IEmployeeService;

    @GetMapping
    public List<EmployeeDTO> getAll() {
        return IEmployeeService.getAllEmployees();
    }

    @PostMapping
    public EmployeeDTO create(@RequestBody EmployeeDTO dto) {
        return IEmployeeService.create(dto);
    }



    @PostMapping("/login")
    public ResponseEntity<EmployeeDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        EmployeeDTO dto = IEmployeeService.login(loginRequest);
        return ResponseEntity.ok(dto);
    }




//////// TURAL 66- 150///////////////

@PostMapping("/hr_register")
public ResponseEntity<EmployeeDTO> register(@RequestBody RegisterRequestDTO requestDTO) {
    EmployeeDTO registeredUser = IEmployeeService.HR_register(requestDTO);
    return ResponseEntity.ok(registeredUser);
}



    //Çalışanı id ye göre çekme
    @GetMapping("/employee/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable String id) {
        EmployeeDTO employee = IEmployeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);

            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            String fileUrl = "http://localhost:5000/uploads/" + fileName;
            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }




























































































////////////////////////// ENES 150-250 ////////////////////////////////////////////////

@GetMapping("/summaries")
public List<EmployeeSummaryDTO> getAllSummaries() {
    return IEmployeeService.getAllEmployeeSummaries();
}

@GetMapping("/summaries/filter")
public List<EmployeeSummaryDTO> filterEmployees(
        @RequestParam(required = false) Gender gender,
        @RequestParam(required = false) String department,
        @RequestParam(required = false) String role,
        @RequestParam(required = false) String title
        ) {
        return IEmployeeService.filterEmployees(gender, department, role, title);
        }




































































































//////////////////////////////////////// BILGE 250-350////////////////////////////////////////////////////////////

//yeni çalışan ekleme request (postman)

@PostMapping("/register")
public EmployeeDTO register(@RequestBody EmployeeDTO dto) {
    return IEmployeeService.register(dto);
}


//çalışan silme request (postman)
@DeleteMapping("/delete/{id}")
public ResponseEntity<String> delete(@PathVariable String id) {
    IEmployeeService.delete(id);
    return ResponseEntity.ok("Employee with ID " + id + " has been successfully deleted.");
}


//çalışan bilgilerini güncelleme request (postman)

    @PatchMapping("/update_employee/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(
            @PathVariable String id,
            @RequestBody EmployeeDTO dto) {

        EmployeeDTO updated_employee = IEmployeeService.updateEmployee(id, dto);
        return ResponseEntity.ok(updated_employee);
    }



/// / DSKDSKDSKDSK
}

