package com.medeasemanagement.controller;



import com.medeasemanagement.dao.RoomRepository;
import com.medeasemanagement.dto.RoomDto;
import com.medeasemanagement.entity.Room;
import com.medeasemanagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:3000") // Optional: for frontend requests
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;
    // Create Room
    @PostMapping
    public ResponseEntity<RoomDto> addRoom(@RequestBody RoomDto roomDto) {
        RoomDto createdRoom = roomService.addRoom(roomDto);
        return ResponseEntity.ok(createdRoom);
    }
    
    @GetMapping("/ward/{wardId}")
    public ResponseEntity<?> getRoomsByWardId(@PathVariable Integer wardId) {
        try {
            List<Room> rooms = roomService.getRoomsByWardId(wardId);
            return ResponseEntity.ok(rooms);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching rooms for wardId: " + wardId + " - " + e.getMessage());
        }
    }



    // Get all rooms
    @GetMapping
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    // Get room by ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable int id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    // Update room
    @PutMapping("/{id}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable int id, @RequestBody RoomDto roomDto) {
        return ResponseEntity.ok(roomService.updateRoom(id, roomDto));
    }

    // Delete room
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable int id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}

