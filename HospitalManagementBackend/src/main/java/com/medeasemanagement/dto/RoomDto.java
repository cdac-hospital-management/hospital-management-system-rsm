package com.medeasemanagement.dto;

import lombok.Data;

@Data
public class RoomDto {
    private int id;
    private String number;
    private int capacity;
    private int wardId;
    
    // To link the room to a specific ward
}