package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.ConfessionDTO;
import com.team.five.ikon.app.services.IConfessionService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/api/confessions")

public class ConfessionController {

    private final IConfessionService IConfessionService;

    @PostMapping("/submit")
    public ConfessionDTO createConfession(@RequestBody ConfessionDTO dto) {
        return IConfessionService.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        IConfessionService.deleteById(id);
    }








































    // 1. Get all confessions
    @GetMapping
    public ResponseEntity<List<ConfessionDTO>> getAllConfessions() {
        List<ConfessionDTO> confessions = IConfessionService.getAllConfessions();
        return ResponseEntity.ok(confessions);
    }


    // 2. Get confessions by employeeId
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<ConfessionDTO>> getConfessionsByEmployeeId(@PathVariable String employeeId) {
        List<ConfessionDTO> confessions = IConfessionService.getConfessionsByEmployeeId(employeeId);
        return ResponseEntity.ok(confessions);
    }












}
