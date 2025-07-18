package com.hexaware.fastx.dto;

import java.time.LocalDateTime;

public class CancellationDTO {

    private int cancellationId;
    private int bookingId;   
    private String reason;
    private double refundAmount;
    private LocalDateTime cancelledAt;

    public CancellationDTO() {}

    public CancellationDTO(int cancellationId, int bookingId, String reason, double refundAmount, LocalDateTime cancelledAt) {
        this.cancellationId = cancellationId;
        this.bookingId = bookingId;
        this.reason = reason;
        this.refundAmount = refundAmount;
        this.cancelledAt = cancelledAt;
    }

    

    public int getCancellationId() {
        return cancellationId;
    }
    public void setCancellationId(int cancellationId) {
        this.cancellationId = cancellationId;
    }
    public int getBookingId() {
        return bookingId;
    }
    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }
    public String getReason() {
        return reason;
    }
    public void setReason(String reason) {
        this.reason = reason;
    }
    public double getRefundAmount() {
        return refundAmount;
    }
    public void setRefundAmount(double refundAmount) {
        this.refundAmount = refundAmount;
    }
    public LocalDateTime getCancelledAt() {
        return cancelledAt;
    }
    public void setCancelledAt(LocalDateTime cancelledAt) {
        this.cancelledAt = cancelledAt;
    }

	@Override
	public String toString() {
		return "CancellationDTO [cancellationId=" + cancellationId + ", bookingId=" + bookingId + ", reason=" + reason
				+ ", refundAmount=" + refundAmount + ", cancelledAt=" + cancelledAt + "]";
	}
    
    
}
