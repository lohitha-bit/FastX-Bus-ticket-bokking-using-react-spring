package com.hexaware.fastx.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Cancellation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cancellationId;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    @NotNull(message = "Booking is required for cancellation")
    private Booking booking;

    @NotNull(message = "Cancellation date and time is required")
    private LocalDateTime cancellationDate;

    @PositiveOrZero(message = "Refund amount cannot be negative")
    private double refundAmount;

    public Cancellation() {}

    public Cancellation(int cancellationId, Booking booking, LocalDateTime cancellationDate, double refundAmount) {
        this.cancellationId = cancellationId;
        this.booking = booking;
        this.cancellationDate = cancellationDate;
        this.refundAmount = refundAmount;
    }


    public int getCancellationId() {
        return cancellationId;
    }

    public void setCancellationId(int cancellationId) {
        this.cancellationId = cancellationId;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public LocalDateTime getCancellationDate() {
        return cancellationDate;
    }

    public void setCancellationDate(LocalDateTime cancellationDate) {
        this.cancellationDate = cancellationDate;
    }

    public double getRefundAmount() {
        return refundAmount;
    }

    public void setRefundAmount(double refundAmount) {
        this.refundAmount = refundAmount;
    }

    @Override
    public String toString() {
        return "Cancellation [cancellationId=" + cancellationId
                + ", bookingId=" + (booking != null ? booking.getBookingId() : "null")
                + ", cancellationDate=" + cancellationDate
                + ", refundAmount=" + refundAmount + "]";
    }
}