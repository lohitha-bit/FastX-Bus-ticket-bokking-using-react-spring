package com.hexaware.fastx.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.fastx.dto.CancellationDTO;
import com.hexaware.fastx.entity.Booking;
import com.hexaware.fastx.entity.Cancellation;
import com.hexaware.fastx.exception.BookingNotFoundException;
import com.hexaware.fastx.exception.CancellationNotFoundException;
import com.hexaware.fastx.repository.BookingRepository;
import com.hexaware.fastx.repository.CancellationRepository;
import com.hexaware.fastx.service.CancellationService;

import java.time.LocalDateTime;

@Service
public class CancellationServiceImplementation implements CancellationService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private CancellationRepository cancellationRepo;

    @Override
    public CancellationDTO cancelBooking(int bookingId, String reason) {

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found with ID: " + bookingId));

        if (booking.getStatus().equalsIgnoreCase("CANCELLED")) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

        booking.setStatus("CANCELLED");

        booking.getSeats().forEach(seat -> {
            seat.setStatus("AVAILABLE");
        });

        bookingRepo.save(booking); 

        Cancellation cancellation = new Cancellation();
        cancellation.setBooking(booking);
        cancellation.setCancellationDate(LocalDateTime.now());
        cancellation.setRefundAmount(booking.getTotalAmount() * 0.9); // 90% refund
        cancellationRepo.save(cancellation);

        return mapToDTO(cancellation, reason);
    }

    @Override
    public CancellationDTO getCancellationByBookingId(int bookingId) {
        Cancellation cancellation = cancellationRepo.findByBooking_BookingId(bookingId)
                .orElseThrow(() -> new CancellationNotFoundException("Cancellation not found for booking ID: " + bookingId));

        return mapToDTO(cancellation, "Booking cancelled");
    }

    private CancellationDTO mapToDTO(Cancellation cancellation, String reason) {
        return new CancellationDTO(
                cancellation.getCancellationId(),
                cancellation.getBooking().getBookingId(),
                reason,
                cancellation.getRefundAmount(),
                cancellation.getCancellationDate()
        );
    }
}
