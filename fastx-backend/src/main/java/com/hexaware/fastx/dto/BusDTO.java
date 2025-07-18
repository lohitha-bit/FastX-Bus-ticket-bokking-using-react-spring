package com.hexaware.fastx.dto;

import java.util.List;

public class BusDTO {
    private int busId;
    private String busName;
    private String busNumber;
    private String busType;
    private int seatCount;
    private double fare;
    private int routeId;
    private List<String> amenities;

    public BusDTO() {}

    public BusDTO(int busId, String busName, String busNumber, String busType, int seatCount, double fare, int routeId, List<String> amenities) {
        this.busId = busId;
        this.busName = busName;
        this.busNumber = busNumber;
        this.busType = busType;
        this.seatCount = seatCount;
        this.fare = fare;
        this.routeId = routeId;
        this.amenities = amenities;
    }

    // Getters & Setters

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
    public int getSeatCount() {
        return seatCount;
    }
    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }
    public double getFare() {
        return fare;
    }
    public void setFare(double fare) {
        this.fare = fare;
    }
    public int getRouteId() {
        return routeId;
    }
    public void setRouteId(int routeId) {
        this.routeId = routeId;
    }
    public List<String> getAmenities() {
        return amenities;
    }
    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    @Override
    public String toString() {
        return "BusDTO [busId=" + busId + ", busName=" + busName + ", busNumber=" + busNumber + ", busType=" + busType
                + ", seatCount=" + seatCount + ", fare=" + fare + ", routeId=" + routeId + ", amenities=" + amenities + "]";
    }
}
