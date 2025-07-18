package com.hexaware.fastx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.fastx.entity.Cancellation;
import java.util.Optional;

public interface CancellationRepository extends JpaRepository<Cancellation, Integer> {

    Optional<Cancellation> findByBooking_BookingId(int bookingId);
}
