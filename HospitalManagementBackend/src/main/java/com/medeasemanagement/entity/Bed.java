package com.medeasemanagement.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class Bed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String bedNumber;
    private boolean occupied;
    private String status;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToOne
    private User patient; // Optional - Only if assigned
}
