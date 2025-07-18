package com.hexaware.fastx.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.fastx.dto.BookingDTO;
import com.hexaware.fastx.dto.BookingSummaryDTO;
import com.hexaware.fastx.dto.RouteDTO;
import com.hexaware.fastx.service.BookingService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        BookingDTO created = bookingService.createBooking(bookingDTO);
        return ResponseEntity.ok(created);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable int id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking cancelled successfully.");
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable int id) {
        BookingDTO booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByUser(@PathVariable int userId) {
        List<BookingDTO> bookings = bookingService.getBookingsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/date")
    public ResponseEntity<List<BookingDTO>> getBookingsByDate(@RequestParam String date) {
        List<BookingDTO> bookings = bookingService.getBookingsByDate(LocalDate.parse(date));
        return ResponseEntity.ok(bookings);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/ticket/{ticketNumber}")
    public ResponseEntity<BookingDTO> getBookingByTicket(@PathVariable String ticketNumber) {
        BookingDTO booking = bookingService.getBookingByTicket(ticketNumber);
        return ResponseEntity.ok(booking);
    }

    @PostMapping("/notifications")
    public ResponseEntity<String> sendNotification(@RequestParam int userId, @RequestParam String message) {
        bookingService.sendNotification(userId, message);
        return ResponseEntity.ok("Notification sent to user.");
    }
    
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/user/{userId}/frequent-routes")
    public ResponseEntity<List<RouteDTO>> getFrequentRoutes(@PathVariable int userId) {
        List<RouteDTO> routes = bookingService.getFrequentRoutesByUser(userId);
        return ResponseEntity.ok(routes);
    }
    
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/user/{userId}/summary")
    public ResponseEntity<List<BookingSummaryDTO>> getUserBookingSummary(@PathVariable int userId) {
        List<BookingSummaryDTO> summaries = bookingService.getBookingSummariesByUserId(userId);
        return ResponseEntity.ok(summaries);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'BUS_OPERATOR')")
    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        List<BookingDTO> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/status")
    public ResponseEntity<List<BookingDTO>> getBookingsByStatus(@RequestParam String status) {
        List<BookingDTO> bookings = bookingService.getBookingsByStatus(status.toUpperCase());
        return ResponseEntity.ok(bookings);
    }

}
