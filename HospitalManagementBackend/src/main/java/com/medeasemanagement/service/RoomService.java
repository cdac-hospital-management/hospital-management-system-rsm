package com.medeasemanagement.service;

import java.util.List;

import com.medeasemanagement.dto.RoomDto;
import com.medeasemanagement.entity.Room;

public interface RoomService {
	RoomDto addRoom(RoomDto roomDto); // ✅ Must match exactly
    List<RoomDto> getAllRooms();
    RoomDto getRoomById(int id);
    RoomDto updateRoom(int id, RoomDto roomDto);
    void deleteRoom(int id);
    List<Room> getRoomsByWardId(Integer wardId);
    
}
