package com.medeasemanagement.dto;

import lombok.Data;

@Data
public class WardDto {
    private int id;
    private String name;
    private String type;
    private int totalRooms;
    private String status;
}

