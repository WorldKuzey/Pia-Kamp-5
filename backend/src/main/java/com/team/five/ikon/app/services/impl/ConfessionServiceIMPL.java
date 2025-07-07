package com.team.five.ikon.app.services.impl;

import com.team.five.ikon.app.dto.ConfessionDTO;
import com.team.five.ikon.app.entity.Confession;
import com.team.five.ikon.app.repository.ConfessionRepository;
import com.team.five.ikon.app.services.IConfessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConfessionServiceIMPL implements IConfessionService {

    private final ConfessionRepository confessionRepository;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");



    private ConfessionDTO convertToDTO(Confession confession) {
        ConfessionDTO dto = new ConfessionDTO();
        dto.setId(confession.getEmployeeId());
        dto.setNickname(confession.getNickname());
        dto.setConfession_text(confession.getConfession_text());
        dto.setAgeInterval(confession.getAgeInterval());
        dto.setDepartment(confession.getDepartment());

        if (confession.getCreation_time() != null) {
            dto.setCreatedAt(confession.getCreation_time().format(formatter));
        }

        return dto;
    }


    @Override
    public ConfessionDTO create(ConfessionDTO dto) {
        Confession confession = new Confession();


        confession.setEmployeeId(dto.getId());
        confession.setNickname(dto.getNickname());
        confession.setConfession_text(dto.getConfession_text());
        confession.setAgeInterval(dto.getAgeInterval());
        confession.setDepartment(dto.getDepartment());
        confession.setCreation_time(LocalDateTime.now());

        Confession saved = confessionRepository.save(confession);

        return convertToDTO(saved);
    }

}
