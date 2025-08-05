package com.medeasemanagement.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;
@Data
@Entity
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String type; // ICU, General, etc.

    private int totalRooms;
    private String status;

    @OneToMany(mappedBy = "ward", cascade = CascadeType.ALL)
    private List<Room> rooms;
}
