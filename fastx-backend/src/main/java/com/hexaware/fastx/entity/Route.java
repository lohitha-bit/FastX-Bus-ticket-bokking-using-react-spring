package com.hexaware.fastx.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Route {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int routeId;
	
	@NotBlank(message = "Origin is required")
	private String origin;
	
	@NotBlank(message = "Destination is required")
	private String destination;
	
	@NotNull(message = "Departure time is required")
	private LocalDateTime departureTime;
	
	@NotNull(message = "Arrival time is required")
	private LocalDateTime arrivalTime;
	
	@NotNull(message = "Distance is required")
	@Min(value = 1,message = "Distance should be atleast 1km")
	private int distanceInKm;
	
	@JsonIgnore
	@OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Bus> buses;
	
	@OneToMany(mappedBy = "route", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<Booking> bookings;

	
	public Route() {
        super();
    }

    public Route(int routeId, String origin, String destination,
    		LocalDateTime departureTime, LocalDateTime arrivalTime,
                 int distanceInKm) {
        this.routeId = routeId;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.distanceInKm = distanceInKm;
    }

    // Getters and Setters
    public int getRouteId() {
        return routeId;
    }

    public void setRouteId(int routeId) {
        this.routeId = routeId;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDateTime  getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public LocalDateTime  getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime  arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public int getDistanceInKm() {
        return distanceInKm;
    }

    public void setDistanceInKm(int distanceInKm) {
        this.distanceInKm = distanceInKm;
    }

    public List<Bus> getBuses() {
        return buses;
    }

    public void setBuses(List<Bus> buses) {
        this.buses = buses;
    }

    @Override
    public String toString() {
        return "Route [routeId=" + routeId + ", origin=" + origin +
                ", destination=" + destination +
                ", departureTime=" + departureTime +
                ", arrivalTime=" + arrivalTime +
                ", distanceInKm=" + distanceInKm + "]";
    }

}
