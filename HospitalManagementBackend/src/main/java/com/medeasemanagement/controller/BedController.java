package com.medeasemanagement.controller;



import com.medeasemanagement.dto.BedDto;
import com.medeasemanagement.entity.Bed;
import com.medeasemanagement.service.BedService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beds")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for frontend
public class BedController {

    private final BedService bedService;

    // ✅ Add a new bed
    @PostMapping
    public ResponseEntity<BedDto> addBed(@RequestBody BedDto bedDto) {
        BedDto created = bedService.addBed(bedDto);
        return ResponseEntity.ok(created);
    }
    
    @GetMapping("/room/{roomId}")
    public List<Bed> getBedsByRoomId(@PathVariable Long roomId) {
        return bedService.getBedsByRoomId(roomId);
    }

    // ✅ Get all beds
    @GetMapping
    public ResponseEntity<List<BedDto>> getAllBeds() {
        return ResponseEntity.ok(bedService.getAllBeds());
    }

    // ✅ Get bed by ID
    @GetMapping("/{id}")
    public ResponseEntity<BedDto> getBedById(@PathVariable int id) {
        return ResponseEntity.ok(bedService.getBedById(id));
    }

    // ✅ Update bed by ID
    @PutMapping("/{id}")
    public ResponseEntity<BedDto> updateBed(@PathVariable int id, @RequestBody BedDto bedDto) {
        BedDto updated = bedService.updateBed(id, bedDto);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete bed by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBed(@PathVariable int id) {
        bedService.deleteBed(id);
        return ResponseEntity.ok("Bed deleted successfully with ID: " + id);
    }
}

