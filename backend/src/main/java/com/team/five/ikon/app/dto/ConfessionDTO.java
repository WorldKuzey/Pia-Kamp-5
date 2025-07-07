package com.team.five.ikon.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
    public class ConfessionDTO {
        private String id;
        private String nickname;
        private String confession_text;
        private String createdAt;
        private String ageInterval;
        private String department;


}
