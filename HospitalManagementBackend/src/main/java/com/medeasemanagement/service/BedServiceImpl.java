package com.medeasemanagement.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medeasemanagement.dao.BedRepository;
import com.medeasemanagement.dao.RoomRepository;
import com.medeasemanagement.dto.BedDto;
import com.medeasemanagement.entity.Bed;
import com.medeasemanagement.entity.Room;

@Service
public class BedServiceImpl implements BedService {

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public BedDto addBed(BedDto bedDto) {
        Room room = roomRepository.findById(bedDto.getRoomId())
            .orElseThrow(() -> new RuntimeException("Room not found with ID: " + bedDto.getRoomId()));

        Bed bed = new Bed();
        bed.setBedNumber(bedDto.getBedNumber());
        bed.setStatus(bedDto.getStatus());
        bed.setRoom(room);

        Bed saved = bedRepository.save(bed);

        BedDto dto = new BedDto();
        dto.setId(saved.getId());
        dto.setBedNumber(saved.getBedNumber());
        dto.setStatus(saved.getStatus());
        dto.setRoomId(saved.getRoom().getId());

        return dto;
    }

    @Override
    public List<BedDto> getAllBeds() {
        List<Bed> beds = bedRepository.findAll();
        return beds.stream().map(bed -> {
            BedDto dto = new BedDto();
            dto.setId(bed.getId());
            dto.setBedNumber(bed.getBedNumber());
            dto.setStatus(bed.getStatus());
            dto.setRoomId(bed.getRoom().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public BedDto getBedById(int id) {
        Bed bed = bedRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Bed not found with ID: " + id));

        BedDto dto = new BedDto();
        dto.setId(bed.getId());
        dto.setBedNumber(bed.getBedNumber());
        dto.setStatus(bed.getStatus());
        dto.setRoomId(bed.getRoom().getId());

        return dto;
    }

    @Override
    public BedDto updateBed(int id, BedDto bedDto) {
        Bed bed = bedRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Bed not found with ID: " + id));

        Room room = roomRepository.findById(bedDto.getRoomId())
            .orElseThrow(() -> new RuntimeException("Room not found with ID: " + bedDto.getRoomId()));

        bed.setBedNumber(bedDto.getBedNumber());
        bed.setStatus(bedDto.getStatus());
        bed.setRoom(room);

        Bed updated = bedRepository.save(bed);

        BedDto dto = new BedDto();
        dto.setId(updated.getId());
        dto.setBedNumber(updated.getBedNumber());
        dto.setStatus(updated.getStatus());
        dto.setRoomId(updated.getRoom().getId());

        return dto;
    }

    @Override
    public void deleteBed(int id) {
        bedRepository.deleteById(id);
    }
    
    @Override
    public List<Bed> getBedsByRoomId(Long roomId) {
        return bedRepository.findByRoomId(roomId);
    }
}

