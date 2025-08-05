package com.medeasemanagement.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.medeasemanagement.dao.RoomRepository;
import com.medeasemanagement.dao.WardRepository;
import com.medeasemanagement.dto.RoomDto;
import com.medeasemanagement.entity.Room;
import com.medeasemanagement.entity.Ward;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final WardRepository wardRepository;

    @Override
    public RoomDto addRoom(RoomDto roomDto) {
        Ward ward = wardRepository.findById(roomDto.getWardId())
                .orElseThrow(() -> new RuntimeException("Ward not found"));

        Room room = new Room();
        room.setNumber(roomDto.getNumber());
        room.setCapacity(roomDto.getCapacity());
        room.setWard(ward);

        Room saved = roomRepository.save(room);
        roomDto.setId(saved.getId());
        return roomDto;
    }

    @Override
    public List<RoomDto> getAllRooms() {
        return roomRepository.findAll().stream().map(room -> {
            RoomDto dto = new RoomDto();
            dto.setId(room.getId());
            dto.setNumber(room.getNumber());
            dto.setCapacity(room.getCapacity());
            dto.setWardId(room.getWard().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteRoom(int roomId) {
        roomRepository.deleteById(roomId);
    }

   
    @Override
    public RoomDto getRoomById(int id) {
        Room room = roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found with ID: " + id));

        RoomDto dto = new RoomDto();
        dto.setId(room.getId());
        dto.setNumber(room.getNumber());
        dto.setCapacity(room.getCapacity());
        dto.setWardId(room.getWard().getId()); // ✅ correct usage
        return dto;
    }



    @Override
    public RoomDto updateRoom(int id, RoomDto roomDto) {
        Room room = roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found with ID: " + id));

        room.setNumber(roomDto.getNumber());
        room.setCapacity(roomDto.getCapacity());

        Ward ward = wardRepository.findById(roomDto.getWardId())
            .orElseThrow(() -> new RuntimeException("Ward not found with ID: " + roomDto.getWardId()));
        room.setWard(ward);

        Room updatedRoom = roomRepository.save(room);

        RoomDto dto = new RoomDto();
        dto.setId(updatedRoom.getId());
        dto.setNumber(updatedRoom.getNumber());
        dto.setCapacity(updatedRoom.getCapacity());
        dto.setWardId(updatedRoom.getWard().getId());
        return dto;
    }

    @Override
    public List<Room> getRoomsByWardId(Integer wardId) {
        return roomRepository.findByWardId(wardId);
    }

}

