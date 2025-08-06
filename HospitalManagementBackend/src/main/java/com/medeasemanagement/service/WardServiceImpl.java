package com.medeasemanagement.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medeasemanagement.dao.WardRepository;
import com.medeasemanagement.dto.WardDto;
import com.medeasemanagement.entity.Ward;

@Service
public class WardServiceImpl implements WardService {

    @Autowired
    private WardRepository wardRepository;

    @Override
    public WardDto addWard(WardDto wardDto) {
        Ward ward = new Ward();
        ward.setName(wardDto.getName());
        ward.setTotalRooms(wardDto.getTotalRooms());
        ward.setStatus(wardDto.getStatus());
        ward.setType(wardDto.getType());
        Ward saved = wardRepository.save(ward);

        WardDto dto = new WardDto();
        dto.setId(saved.getId());
        dto.setName(saved.getName());
        dto.setTotalRooms(saved.getTotalRooms());
        dto.setStatus(saved.getStatus());
        dto.setType(saved.getType());
        return dto;
    }

    @Override
    public List<WardDto> getAllWards() {
        List<Ward> wards = wardRepository.findAll();
        return wards.stream().map(ward -> {
            WardDto dto = new WardDto();
            dto.setId(ward.getId());
            dto.setName(ward.getName());
            dto.setTotalRooms(ward.getTotalRooms());
            dto.setStatus(ward.getStatus());
            dto.setType(ward.getType());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public WardDto getWardById(int id) {
        Ward ward = wardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ward not found with ID: " + id));
        WardDto dto = new WardDto();
        dto.setId(ward.getId());
        dto.setName(ward.getName());
        dto.setTotalRooms(ward.getTotalRooms());
        dto.setStatus(ward.getStatus());
        dto.setType(ward.getType());
        return dto;
    }

    @Override
    public WardDto updateWard(int id, WardDto wardDto) {
        Ward ward = wardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ward not found with ID: " + id));
        ward.setName(wardDto.getName());
        ward.setTotalRooms(wardDto.getTotalRooms());
        ward.setStatus(wardDto.getStatus());
        ward.setType(wardDto.getType());
        Ward updated = wardRepository.save(ward);

        WardDto dto = new WardDto();
        dto.setId(updated.getId());
        dto.setName(updated.getName());
        dto.setTotalRooms(updated.getTotalRooms());
        dto.setStatus(updated.getStatus());
        dto.setType(updated.getType());
        return dto;
    }

    @Override
    public void deleteWard(int id) {
        wardRepository.deleteById(id);
    }
}


