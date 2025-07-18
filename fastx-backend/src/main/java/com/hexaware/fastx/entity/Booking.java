package com.hexaware.fastx.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bookingId;
	
	@ManyToOne
	@JoinColumn(name="userId",nullable=false)
	@NotNull(message = "User is required")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="routeId",nullable=false)
	@NotNull(message = "Route is required")
	private Route route;
	
	@ManyToOne
	@JoinColumn(name = "busId", nullable = false)
	@NotNull(message = "Bus is required")
	private Bus bus;
	

    @ManyToMany
    @JoinTable(
        name = "booking_seats",
        joinColumns = @JoinColumn(name = "booking_id"),
        inverseJoinColumns = @JoinColumn(name = "seat_id")
    )
    @NotEmpty(message = "At least one seat must be selected")
	private List<Seat> seats;
    
    @DecimalMin(value = "0.0", message = "Total amount must be a positive value")
    private double totalAmount;
    
	private LocalDateTime bookingTime;
    
    @Column(unique = true, nullable = false)
	private String ticketNumber;
    
    @NotBlank(message = "Status is required")
    @Pattern(regexp = "CONFIRMED|CANCELLED", flags = Pattern.Flag.CASE_INSENSITIVE, message = "Status must be CONFIRMED or CANCELLED")
	private String status;
    
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
	private Cancellation cancellation;
	
    public Booking() {}

    public Booking(int bookingId, User user, Route route, Bus bus, List<Seat> seats,
                   LocalDateTime bookingTime, double totalAmount, String ticketNumber, String status) {
        this.bookingId = bookingId;
        this.user = user;
        this.route = route;
        this.bus = bus;
        this.seats = seats;
        this.bookingTime = bookingTime;
        this.totalAmount = totalAmount;
        this.ticketNumber = ticketNumber;
        this.status = status;
    }

    // === Getters and Setters ===

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status.toUpperCase();
    }

    public Cancellation getCancellation() {
        return cancellation;
    }

    public void setCancellation(Cancellation cancellation) {
        this.cancellation = cancellation;
    }

    @Override
    public String toString() {
        return "Booking [bookingId=" + bookingId + ", user=" + (user != null ? user.getUserId() : "null") +
                ", route=" + (route != null ? route.getRouteId() : "null") +
                ", bus=" + (bus != null ? bus.getBusId() : "null") +
                ", seats=" + (seats != null ? seats.size() : 0) +
                ", bookingTime=" + bookingTime +
                ", totalAmount=" + totalAmount +
                ", ticketNumber=" + ticketNumber +
                ", status=" + status + "]";
    }

}
