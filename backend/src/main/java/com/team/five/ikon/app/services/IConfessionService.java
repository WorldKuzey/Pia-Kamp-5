package com.team.five.ikon.app.services;
import com.team.five.ikon.app.dto.ConfessionDTO;


public interface IConfessionService


{// Create a new confession
    ConfessionDTO create(ConfessionDTO dto);

    // List all confessions
    //List<ConfessionDTO> getAll();

    // get by ID
    //ConfessionDTO getById(String id);

    //  delete
    void deleteById(String id);

}
