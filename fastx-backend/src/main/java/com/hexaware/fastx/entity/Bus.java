package com.hexaware.fastx.entity;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int busId;

    @NotBlank(message = "Bus name is required")
    private String busName;

    @NotBlank(message = "Bus number is required")
    private String busNumber;

    @NotBlank(message = "Bus type is required (e.g., Sleeper AC, Seater Non-AC)")
    private String busType;

    @Min(value = 10, message = "Minimum number of seats must be at least 10")
    private int totalSeats;

    @Min(value = 0, message = "Fare must be non-negative")
    private double fare;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
        name = "bus_amenities",
        joinColumns = @JoinColumn(name = "bus_id"),
        inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private List<Amenity> amenities;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Seat> seats;
    
    @OneToMany(mappedBy = "bus", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Booking> bookings;


    public Bus() {}

    public Bus(int busId, String busName, String busNumber, String busType, int totalSeats, double fare, Route route, List<Amenity> amenities) {
        this.busId = busId;
        this.busName = busName;
        this.busNumber = busNumber;
        this.busType = busType;
        this.totalSeats = totalSeats;
        this.fare = fare;
        this.route = route;
        this.amenities = amenities;
    }

    // === Getters & Setters ===

    public int getBusId() {
        return busId;
    }

    public void setBusId(int busId) {
        this.busId = busId;
    }

    public String getBusName() {
        return busName;
    }

    public void setBusName(String busName) {
        this.busName = busName;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getBusType() {
        return busType;
    }

    public void setBusType(String busType) {
        this.busType = busType;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public List<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<Amenity> amenities) {
        this.amenities = amenities;
    }


    @Override
    public String toString() {
        return "Bus [busId=" + busId + ", busName=" + busName + ", busNumber=" + busNumber
                + ", busType=" + busType + ", totalSeats=" + totalSeats + ", fare=" + fare
                + ", route=" + (route != null ? route.getRouteId() : "null") + "]";
    }
}
