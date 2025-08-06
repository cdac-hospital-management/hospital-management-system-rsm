package com.medeasemanagement.service;

import java.util.List;

import com.medeasemanagement.dto.WardDto;
import com.medeasemanagement.entity.Ward;

public interface WardService {
	 WardDto addWard(WardDto wardDto);
	    List<WardDto> getAllWards();
	    WardDto getWardById(int id);
	    WardDto updateWard(int id, WardDto wardDto);
	    void deleteWard(int id);
}
