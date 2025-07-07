package com.team.five.ikon.app.controller;

import com.team.five.ikon.app.dto.ConfessionDTO;
import com.team.five.ikon.app.services.IConfessionService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


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


}
