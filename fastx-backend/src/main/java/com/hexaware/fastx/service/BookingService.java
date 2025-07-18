package com.hexaware.fastx.service;

import com.hexaware.fastx.dto.BookingDTO;
import com.hexaware.fastx.dto.BookingSummaryDTO;
import com.hexaware.fastx.dto.RouteDTO;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    BookingDTO createBooking(BookingDTO bookingDTO);

    void cancelBooking(int bookingId);

    BookingDTO getBookingById(int bookingId);

    List<BookingDTO> getBookingsByUserId(int userId);

    List<BookingDTO> getBookingsByDate(LocalDate date);

    BookingDTO getBookingByTicket(String ticketNumber);

    void sendNotification(int userId, String message);

	List<RouteDTO> getFrequentRoutesByUser(int userId);

	List<BookingSummaryDTO> getBookingSummariesByUserId(int userId);

	List<BookingDTO> getAllBookings();

	List<BookingDTO> getBookingsByStatus(String status);
}
