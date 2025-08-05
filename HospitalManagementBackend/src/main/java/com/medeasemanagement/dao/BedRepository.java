package com.medeasemanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medeasemanagement.entity.Bed;

public interface BedRepository extends JpaRepository<Bed, Integer>{
	List<Bed> findByRoomId(Long roomId);
}
