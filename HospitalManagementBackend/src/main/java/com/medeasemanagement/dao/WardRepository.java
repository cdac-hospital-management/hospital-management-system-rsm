package com.medeasemanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medeasemanagement.entity.Ward;

public interface WardRepository extends JpaRepository<Ward, Integer>{

}
