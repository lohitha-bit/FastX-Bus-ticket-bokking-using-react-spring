package com.hexaware.fastx.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;
    
    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Positive(message = "Payment amount must be positive")
    private double amount;

    @NotBlank(message = "Payment method is required")
    @Pattern(regexp = "CARD|UPI|NETBANKING", flags = Pattern.Flag.CASE_INSENSITIVE,
             message = "Payment method must be CARD, UPI, or NETBANKING")
    private String method;

    @NotBlank(message = "Payment status is required")
    @Pattern(regexp = "SUCCESS|FAILED|PENDING", flags = Pattern.Flag.CASE_INSENSITIVE,
             message = "Payment status must be SUCCESS, FAILED, or PENDING")
    private String status;

    @NotNull(message = "Payment time is required")
    private LocalDateTime paymentTime;

    public Payment() {}

    public Payment(int paymentId, Booking booking, User user, double amount, String method, String status, LocalDateTime paymentTime) {
        this.paymentId = paymentId;
        this.booking = booking;
        this.user = user;
        this.amount = amount;
        this.method = method.toUpperCase();
        this.status = status.toUpperCase();
        this.paymentTime = paymentTime;
    }


    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method.toUpperCase();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status.toUpperCase();
    }

    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(LocalDateTime paymentTime) {
        this.paymentTime = paymentTime;
    }

    @Override
    public String toString() {
        return "Payment [paymentId=" + paymentId
                + ", bookingId=" + (booking != null ? booking.getBookingId() : "null")
                + ", userId=" + (user != null ? user.getUserId() : "null")
                + ", amount=" + amount
                + ", method=" + method
                + ", status=" + status
                + ", paymentTime=" + paymentTime + "]";
    }
}
