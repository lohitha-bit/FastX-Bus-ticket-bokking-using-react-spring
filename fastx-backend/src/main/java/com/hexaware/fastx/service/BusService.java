package com.hexaware.fastx.service;

import java.util.List;

import com.hexaware.fastx.dto.BusDTO;

public interface BusService {

	String addBus(BusDTO dto);

	BusDTO updateBus(int id, BusDTO dto);

	String deleteBus(int id);

	List<BusDTO> getAllBuses();

	BusDTO getBusById(int id);
	
	List<BusDTO> getBusesByOriginAndDestination(String origin, String destination);

    List<BusDTO> getBusesByAmenities(List<String> amenities);

    List<BusDTO> getBusesByRouteId(int routeId);

    List<BusDTO> searchByBusName(String name);

    List<BusDTO> searchByBusType(String type);

    List<BusDTO> filterByFare(double minFare, double maxFare);

    List<BusDTO> searchBuses(String origin, String destination, Double minFare, Double maxFare, List<String> amenities, String type);

}
