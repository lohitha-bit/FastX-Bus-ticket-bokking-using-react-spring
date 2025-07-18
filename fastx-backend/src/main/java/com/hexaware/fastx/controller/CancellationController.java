package com.hexaware.fastx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.fastx.dto.CancellationDTO;
import com.hexaware.fastx.service.CancellationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cancellations")
public class CancellationController {

    @Autowired
    private CancellationService cancellationService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{bookingId}")
    public ResponseEntity<CancellationDTO> cancelBooking(@PathVariable int bookingId, @RequestParam String reason) {
        return ResponseEntity.ok(cancellationService.cancelBooking(bookingId, reason));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{bookingId}")
    public ResponseEntity<CancellationDTO> getCancellation(@PathVariable int bookingId) {
        return ResponseEntity.ok(cancellationService.getCancellationByBookingId(bookingId));
    }
}
