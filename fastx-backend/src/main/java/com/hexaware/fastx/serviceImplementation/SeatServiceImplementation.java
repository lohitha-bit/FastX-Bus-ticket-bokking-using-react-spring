package com.hexaware.fastx.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.fastx.dto.SeatDTO;
import com.hexaware.fastx.entity.Bus;
import com.hexaware.fastx.entity.Seat;
import com.hexaware.fastx.exception.SeatNotFoundException;
import com.hexaware.fastx.exception.BusNotFoundException;
import com.hexaware.fastx.repository.BusRepository;
import com.hexaware.fastx.repository.SeatRepository;
import com.hexaware.fastx.service.SeatService;

@Service
public class SeatServiceImplementation implements SeatService {

    @Autowired
    private SeatRepository seatRepo;

    @Autowired
    private BusRepository busRepo;
    
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public SeatDTO addSeat(SeatDTO seatDTO) {
        Bus bus = busRepo.findById(seatDTO.getBusId())
                .orElseThrow(() -> new BusNotFoundException("Bus not found with id: " + seatDTO.getBusId()));

        Seat seat = new Seat();
        seat.setSeatNumber(seatDTO.getSeatNumber());
        seat.setSeatType(seatDTO.getSeatType());
        seat.setStatus(seatDTO.getStatus()); 
        seat.setBus(bus);

        seatRepo.save(seat);
        return convertToDTO(seat);
    }

    @Override
    public SeatDTO updateSeat(int seatId, SeatDTO seatDTO) {
        Seat seat = seatRepo.findById(seatId)
                .orElseThrow(() -> new SeatNotFoundException("Seat not found with id: " + seatId));

        seat.setSeatNumber(seatDTO.getSeatNumber());
        seat.setSeatType(seatDTO.getSeatType());
        seat.setStatus(seatDTO.getStatus());

        if (seat.getBus().getBusId() != seatDTO.getBusId()) {
            Bus bus = busRepo.findById(seatDTO.getBusId())
                    .orElseThrow(() -> new BusNotFoundException("Bus not found with id: " + seatDTO.getBusId()));
            seat.setBus(bus);
        }

        seatRepo.save(seat);
        return convertToDTO(seat);
    }

    @Override
    public void deleteSeat(int seatId) {
        if (!seatRepo.existsById(seatId)) {
            throw new SeatNotFoundException("Seat not found with id: " + seatId);
        }
        seatRepo.deleteById(seatId);
    }

    @Override
    public SeatDTO getSeatById(int seatId) {
        Seat seat = seatRepo.findById(seatId)
                .orElseThrow(() -> new SeatNotFoundException("Seat not found with id: " + seatId));
        return convertToDTO(seat);
    }

    @Override
    public List<SeatDTO> getAllSeats() {
        return seatRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SeatDTO updateSeatStatus(int seatId, String status) {
        Seat seat = seatRepo.findById(seatId)
                .orElseThrow(() -> new SeatNotFoundException("Seat not found with id: " + seatId));

        if (!status.equalsIgnoreCase("BOOKED") && !status.equalsIgnoreCase("PENDING") && !status.equalsIgnoreCase("AVAILABLE")) {
            throw new IllegalArgumentException("Status must be BOOKED, PENDING, or AVAILABLE");
        }

        seat.setStatus(status.toUpperCase());
        seatRepo.save(seat);

        return convertToDTO(seat);
    }

    @Override
    public List<SeatDTO> getAvailableSeatsByBusId(int busId,String status) {
        List<Seat> seats = seatRepo.findByBus_BusIdAndStatus(busId,status);
        return seats.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<SeatDTO> getAvailableSeatsByBusName(String busName) {
        List<Seat> seats = seatRepo.findAvailableSeatsByBusName(busName);
        return seats.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<SeatDTO> getSeatsByBusId(int busId) {
        List<Seat> seats = seatRepo.findByBus_BusId(busId);
        return seats.stream().map(seat -> modelMapper.map(seat, SeatDTO.class)).toList();
    }


    

    private SeatDTO convertToDTO(Seat seat){
        SeatDTO dto = new SeatDTO();
        dto.setSeatId(seat.getSeatId());
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setSeatType(seat.getSeatType());
        dto.setStatus(seat.getStatus());
        dto.setBusId(seat.getBus().getBusId());
        return dto;
    }
}
