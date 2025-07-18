package com.hexaware.fastx.dto;

import java.time.LocalDateTime;

public class PaymentDTO {

    private int paymentId;
    private int bookingId;  
    private String paymentMode;
    private double amount;
    private String status;
    private LocalDateTime paymentTime;

    public PaymentDTO() {}

    public PaymentDTO(int paymentId, int bookingId, String paymentMode, double amount, String status, LocalDateTime paymentTime) {
        this.paymentId = paymentId;
        this.bookingId = bookingId;
        this.paymentMode = paymentMode;
        this.amount = amount;
        this.status = status;
        this.paymentTime = paymentTime;
    }

   

    public int getPaymentId() {
        return paymentId;
    }
    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }
    public int getBookingId() {
        return bookingId;
    }
    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }
    public String getPaymentMode() {
        return paymentMode;
    }
    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }
    public void setPaymentTime(LocalDateTime paymentTime) {
        this.paymentTime = paymentTime;
    }
}
