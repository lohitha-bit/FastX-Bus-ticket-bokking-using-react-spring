package com.hexaware.fastx.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.fastx.dto.BusDTO;
import com.hexaware.fastx.entity.Amenity;
import com.hexaware.fastx.entity.Bus;
import com.hexaware.fastx.entity.Route;
import com.hexaware.fastx.exception.BusNotFoundException;
import com.hexaware.fastx.exception.RouteNotFoundException;
import com.hexaware.fastx.repository.AmenityRepository;
import com.hexaware.fastx.repository.BusRepository;
import com.hexaware.fastx.repository.RouteRepository;
import com.hexaware.fastx.service.BusService;

@Service
public class BusServiceImplementation implements BusService {
	
	  @Autowired 
	  private BusRepository busRepo;
	  @Autowired 
	  private RouteRepository routeRepo;
	  @Autowired 
	  private AmenityRepository amenityRepo;
	  @Autowired 
	  private ModelMapper modelMapper;

	@Override
	public String addBus(BusDTO dto) {
		Route route = routeRepo.findById(dto.getRouteId())
				.orElseThrow(() -> new RouteNotFoundException("Route not found with ID: " + dto.getRouteId()));
	        List<Amenity> amenities = amenityRepo.findByNameInIgnoreCase(dto.getAmenities());
	        Bus bus = new Bus();
	        bus.setBusName(dto.getBusName());
	        bus.setBusNumber(dto.getBusNumber());
	        bus.setBusType(dto.getBusType());
	        bus.setTotalSeats(dto.getSeatCount());
	        bus.setFare(dto.getFare());
	        bus.setRoute(route);
	        bus.setAmenities(amenities);
	        busRepo.save(bus);
	        return "Bus added with ID " + bus.getBusId();
	}

	@Override
	public BusDTO updateBus(int id, BusDTO dto) {
		 Bus bus = busRepo.findById(id)
	                .orElseThrow(() -> new BusNotFoundException("Bus not found with ID: " + id));

	        bus.setBusName(dto.getBusName());
	        bus.setBusNumber(dto.getBusNumber());
	        bus.setBusType(dto.getBusType());
	        bus.setTotalSeats(dto.getSeatCount());
	        bus.setFare(dto.getFare());

	        Route route = routeRepo.findById(dto.getRouteId())
	                .orElseThrow(() -> new RouteNotFoundException("Route not found with ID: " + dto.getRouteId()));
	        bus.setRoute(route);

	        List<Amenity> amenities = amenityRepo.findByNameInIgnoreCase(dto.getAmenities());
	        bus.setAmenities(amenities);

	        busRepo.save(bus);
	        return convertToDtoWithExtras(bus);
	}

	@Override
	public String deleteBus(int id) {
		if (!busRepo.existsById(id)) {
            throw new BusNotFoundException("Bus not found with ID: " + id);
        }
        busRepo.deleteById(id);
        return "Bus deleted successfully.";
	}

	 @Override
	    public List<BusDTO> getAllBuses() {
	        return busRepo.findAll().stream()
	                .map(this::convertToDtoWithExtras)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public BusDTO getBusById(int id) {
	        Bus bus = busRepo.findById(id)
	                .orElseThrow(() -> new BusNotFoundException("Bus not found with ID: " + id));
	        return convertToDtoWithExtras(bus);
	    }
	    
	    @Override
	    public List<BusDTO> getBusesByOriginAndDestination(String origin, String destination) {
	        return busRepo.findByRoute_OriginAndRoute_Destination(origin, destination).stream()
	                .map(this::convertToDtoWithExtras)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public List<BusDTO> getBusesByAmenities(List<String> amenities) {
	        return busRepo.findByAmenities_NameIn(amenities).stream()
	                .map(this::convertToDtoWithExtras)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public List<BusDTO> getBusesByRouteId(int routeId) {
	        return busRepo.findByRoute_RouteId(routeId).stream()
	                .map(this::convertToDtoWithExtras)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public List<BusDTO> searchByBusName(String name) {
	        return busRepo.findByBusNameContainingIgnoreCase(name).stream()
	                .map(this::convertToDtoWithExtras)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public List<BusDTO> searchByBusType(String type) {
	        return busRepo.findByBusTypeIgnoreCase(type).stream()
	                .map(this::convertToDtoWithExtras)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public List<BusDTO> filterByFare(double minFare, double maxFare) {
	        return busRepo.findByFareBetween(minFare, maxFare).stream()
	                .map(this::convertToDtoWithExtras)
	                .collect(Collectors.toList());
	    }  
	    
	    @Override
	    public List<BusDTO> searchBuses(String origin, String destination, Double minFare, Double maxFare, List<String> amenities, String type) {
	        // 1. Fetch by origin and destination
	        List<Bus> buses = busRepo.findByRoute_OriginAndRoute_Destination(origin, destination);
	       
	        // 2. Filter by fare range
	        if (minFare != null) {
	            buses = buses.stream()
	                .filter(bus -> bus.getFare() >= minFare)
	                .collect(Collectors.toList());
	           
	        }
	        if (maxFare != null) {
	            buses = buses.stream()
	                .filter(bus -> bus.getFare() <= maxFare)
	                .collect(Collectors.toList());
	           
	        }

	        // 3. Filter by type
	        if (type != null && !type.isBlank()) {
	            buses = buses.stream()
	                .filter(bus -> bus.getBusType() != null && bus.getBusType().trim().equalsIgnoreCase(type.trim()))
	                .collect(Collectors.toList());
	            
	        }

	        // 4. Filter by amenities — require ALL requested
	        if (amenities != null && !amenities.isEmpty()) {
	            List<String> requested = amenities.stream()
	                .map(String::trim)
	                .map(String::toLowerCase)
	                .toList();

	            buses = buses.stream()
	                .filter(bus -> {
	                    List<String> busAmenityNames = bus.getAmenities().stream()
	                        .map(a -> a.getName().trim().toLowerCase())
	                        .toList();
	                    return requested.stream().allMatch(busAmenityNames::contains);
	                })
	                .collect(Collectors.toList());

	            
	        }

	        // 5. Convert to DTO
	        return buses.stream()
	            .map(this::convertToDtoWithExtras)
	            .collect(Collectors.toList());
	    }

	
	    private BusDTO convertToDtoWithExtras(Bus bus) {
	        BusDTO dto = modelMapper.map(bus, BusDTO.class);
	        dto.setAmenities(bus.getAmenities().stream().map(a -> a.getName()).toList());
	        dto.setRouteId(bus.getRoute().getRouteId());
	        dto.setSeatCount(bus.getTotalSeats()); 
	        return dto;
	    }
}
