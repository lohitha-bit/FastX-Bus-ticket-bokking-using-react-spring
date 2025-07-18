package com.hexaware.fastx.mapper;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.hexaware.fastx.dto.BookingDTO;
import com.hexaware.fastx.entity.Booking;
import com.hexaware.fastx.entity.Seat;

@Component
public class BookingMapper {

    public BookingDTO toDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setUserId(booking.getUser().getUserId());
        dto.setRouteId(booking.getRoute().getRouteId());
        dto.setBusId(booking.getBus().getBusId());
        dto.setSeatIds(booking.getSeats().stream().map(Seat::getSeatId).collect(Collectors.toList()));
        dto.setTotalamount(booking.getTotalAmount());
        dto.setBookingTime(booking.getBookingTime());
        dto.setTicketNumber(booking.getTicketNumber());
        dto.setStatus(booking.getStatus());
        return dto;
    }
}
