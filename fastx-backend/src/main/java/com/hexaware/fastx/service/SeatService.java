package com.hexaware.fastx.service;

import java.util.List;

import com.hexaware.fastx.dto.SeatDTO;

public interface SeatService {

	    SeatDTO addSeat(SeatDTO seatDTO);

	    SeatDTO updateSeat(int seatId, SeatDTO seatDTO);

	    void deleteSeat(int seatId);

	    SeatDTO getSeatById(int seatId);

	    List<SeatDTO> getAllSeats();

	    SeatDTO updateSeatStatus(int seatId, String status);

	    List<SeatDTO> getAvailableSeatsByBusId(int busId, String status);
	    
	    List<SeatDTO> getAvailableSeatsByBusName(String busName);
	    
	    List<SeatDTO> getSeatsByBusId(int busId);

}
