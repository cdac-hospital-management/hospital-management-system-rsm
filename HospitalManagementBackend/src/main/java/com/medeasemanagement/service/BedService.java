package com.medeasemanagement.service;

import java.util.List;

import com.medeasemanagement.dto.BedDto;
import com.medeasemanagement.entity.Bed;

public interface BedService {
	 BedDto addBed(BedDto bedDto);
	    List<BedDto> getAllBeds();
	    BedDto getBedById(int id);
	    BedDto updateBed(int id, BedDto bedDto);
	    void deleteBed(int id);
	    List<Bed> getBedsByRoomId(Long roomId);
}
