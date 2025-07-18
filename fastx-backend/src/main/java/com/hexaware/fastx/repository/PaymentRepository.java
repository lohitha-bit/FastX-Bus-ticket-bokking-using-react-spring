package com.hexaware.fastx.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hexaware.fastx.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query("SELECT p FROM Payment p WHERE p.booking.bookingId = :bookingId")
    Optional<Payment> findByBookingId(int bookingId);

    @Query(value = "SELECT * FROM payment WHERE booking_id = :bookingId", nativeQuery = true)
    Optional<Payment> findByBookingIdNative(int bookingId);
}
