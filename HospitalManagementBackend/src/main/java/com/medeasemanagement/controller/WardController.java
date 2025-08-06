package com.medeasemanagement.controller;



import com.medeasemanagement.dto.WardDto;
import com.medeasemanagement.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wards")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS from all domains — adjust as needed
public class WardController {

    @Autowired
    private WardService wardService;

    // Create a new ward
    @PostMapping
    public ResponseEntity<WardDto> addWard(@RequestBody WardDto wardDto) {
        WardDto created = wardService.addWard(wardDto);
        return ResponseEntity.ok(created);
    }

    // Get all wards
    @GetMapping
    public ResponseEntity<List<WardDto>> getAllWards() {
        List<WardDto> wards = wardService.getAllWards();
        return ResponseEntity.ok(wards);
    }

    // Get ward by ID
    @GetMapping("/{id}")
    public ResponseEntity<WardDto> getWardById(@PathVariable int id) {
        WardDto ward = wardService.getWardById(id);
        return ResponseEntity.ok(ward);
    }

    // Update ward by ID
    @PutMapping("/{id}")
    public ResponseEntity<WardDto> updateWard(@PathVariable int id, @RequestBody WardDto wardDto) {
        WardDto updated = wardService.updateWard(id, wardDto);
        return ResponseEntity.ok(updated);
    }

    // Delete ward by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWard(@PathVariable int id) {
        wardService.deleteWard(id);
        return ResponseEntity.noContent().build();
    }
}

