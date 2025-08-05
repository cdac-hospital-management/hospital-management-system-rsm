package com.medeasemanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medeasemanagement.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Integer>{
	
	 List<Room> findByWardId(Integer wardId);
}
