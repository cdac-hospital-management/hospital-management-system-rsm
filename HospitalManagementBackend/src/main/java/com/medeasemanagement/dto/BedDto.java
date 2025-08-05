package com.medeasemanagement.dto;

import lombok.Data;

@Data
public class BedDto {
    private int id;
    private String bedNumber;
    private String status;
    private int roomId; // room this bed belongs to
}

