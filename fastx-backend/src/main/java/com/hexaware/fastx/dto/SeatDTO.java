package com.hexaware.fastx.dto;

public class SeatDTO {

    private int seatId;
    private String seatNumber;
    private String seatType;
    private String status;   
    private int busId;

    public SeatDTO() {}

    public SeatDTO(int seatId, String seatNumber, String seatType, String status, int busId) {
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.status = status;
        this.busId = busId;
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

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getBusId() {
        return busId;
    }

    public void setBusId(int busId) {
        this.busId = busId;
    }

    @Override
    public String toString() {
        return "SeatDTO [seatId=" + seatId + ", seatNumber=" + seatNumber + ", seatType=" + seatType +
               ", status=" + status + ", busId=" + busId + "]";
    }
}
