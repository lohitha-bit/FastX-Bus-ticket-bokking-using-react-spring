package com.hexaware.fastx.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Seat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seatId;
	
	@NotBlank(message = "Seat number is required")
	@Size(max = 5, message = "Seat number can't exceed 5 characters")
	private String seatNumber;
	
	 @NotBlank(message = "Seat status is required")
	    @Pattern(regexp = "AVAILABLE|BOOKED|RESERVED", flags = Pattern.Flag.CASE_INSENSITIVE,
	             message = "Status must be AVAILABLE, BOOKED or RESERVED")
	private String status;
	 
	private String seatType;
	
	@ManyToOne
	@JoinColumn(name = "bus_id", nullable = false)
	private Bus bus;
	
	public Seat() {}

    public Seat(int seatId, String seatNumber, String status, String seatType, Bus bus) {
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.status = status.toUpperCase();
        this.seatType = seatType;
        this.bus = bus;
    }



    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status.toUpperCase();
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    @Override
    public String toString() {
        return "Seat [seatId=" + seatId + ", seatNumber=" + seatNumber + ", status=" + status
                + ", seatType=" + seatType + ", bus=" + (bus != null ? bus.getBusId() : "null") + "]";
    }
}