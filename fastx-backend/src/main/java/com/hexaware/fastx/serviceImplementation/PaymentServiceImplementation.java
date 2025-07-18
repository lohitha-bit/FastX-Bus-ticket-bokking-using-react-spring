package com.hexaware.fastx.serviceImplementation;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.fastx.dto.PaymentDTO;
import com.hexaware.fastx.entity.Booking;
import com.hexaware.fastx.entity.Payment;
import com.hexaware.fastx.exception.BookingNotFoundException;
import com.hexaware.fastx.exception.PaymentNotFoundException;
import com.hexaware.fastx.repository.BookingRepository;
import com.hexaware.fastx.repository.PaymentRepository;
import com.hexaware.fastx.service.PaymentService;

@Service
public class PaymentServiceImplementation implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private BookingRepository bookingRepo;

    @Override
    public PaymentDTO makePayment(int bookingId, String method) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found with ID: " + bookingId));

        if (paymentRepo.findByBookingId(bookingId).isPresent()) {
            throw new IllegalStateException("Payment already exists for this booking.");
        }

        double amount = booking.getBus().getFare() * booking.getSeats().size();

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setUser(booking.getUser());
        payment.setAmount(amount);
        payment.setMethod(method);
        payment.setStatus("SUCCESS");
        payment.setPaymentTime(LocalDateTime.now());

        paymentRepo.save(payment);

        return mapToDTO(payment);
    }

    @Override
    public PaymentDTO getPaymentByBookingId(int bookingId) {
        Payment payment = paymentRepo.findByBookingId(bookingId)
                .orElseThrow(() -> new PaymentNotFoundException("No payment found for booking ID: " + bookingId));

        return mapToDTO(payment);
    }

    private PaymentDTO mapToDTO(Payment payment) {
        return new PaymentDTO(
                payment.getPaymentId(),
                payment.getBooking().getBookingId(),
                payment.getMethod(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getPaymentTime()
        );
    }
}
