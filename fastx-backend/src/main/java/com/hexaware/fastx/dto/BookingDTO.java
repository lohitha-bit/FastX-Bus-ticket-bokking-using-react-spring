package com.hexaware.fastx.dto;

import java.time.LocalDateTime;
import java.util.List;

public class BookingDTO {

    private int bookingId;
    private int userId;
    private int routeId;
    private int busId;
    private List<Integer> seatIds;
    private double totalamount;
    private LocalDateTime bookingTime;
    private String ticketNumber;
    private String status;

    public BookingDTO() {}

    public BookingDTO(int bookingId, int userId, int routeId, int busId, List<Integer> seatIds, double totalamount,
                      LocalDateTime bookingTime, String ticketNumber, String status) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.routeId = routeId;
        this.busId = busId;
        this.seatIds = seatIds;
        this.totalamount = totalamount;
        this.bookingTime = bookingTime;
        this.ticketNumber = ticketNumber;
        this.status = status;
    }

    

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getRouteId() {
        return routeId;
    }

    public void setRouteId(int routeId) {
        this.routeId = routeId;
    }

    public int getBusId() {
        return busId;
    }

    public void setBusId(int busId) {
        this.busId = busId;
    }

    public List<Integer> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<Integer> seatIds) {
        this.seatIds = seatIds;
    }

    public double getTotalamount() {
        return totalamount;
    }

    public void setTotalamount(double totalamount) {
        this.totalamount = totalamount;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
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
        this.status = status;
    }

    @Override
    public String toString() {
        return "BookingDTO [bookingId=" + bookingId + ", userId=" + userId + ", routeId=" + routeId + ", busId=" + busId
                + ", seatIds=" + seatIds + ", totalamount=" + totalamount + ", bookingTime=" + bookingTime
                + ", ticketNumber=" + ticketNumber + ", status=" + status + "]";
    }
}
