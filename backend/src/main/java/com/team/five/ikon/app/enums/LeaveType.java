package com.team.five.ikon.app.enums;

import lombok.Getter;

@Getter
public enum LeaveType {
    FATHER_LEAVE(14),
    MARRIAGE_LEAVE(14),
    ANNUAL_LEAVE(14),
    SICK_LEAVE(14);

    private final int defaultDays;

    LeaveType(int defaultDays) {
        this.defaultDays = defaultDays;
    }
}
