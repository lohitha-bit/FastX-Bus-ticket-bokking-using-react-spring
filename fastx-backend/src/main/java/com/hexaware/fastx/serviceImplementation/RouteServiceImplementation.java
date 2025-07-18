package com.hexaware.fastx.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.fastx.dto.RouteDTO;
import com.hexaware.fastx.entity.Route;
import com.hexaware.fastx.exception.RouteNotFoundException;
import com.hexaware.fastx.repository.RouteRepository;
import com.hexaware.fastx.service.RouteService;


@Service
public class RouteServiceImplementation implements RouteService {
	
	@Autowired
    private RouteRepository routeRepo;

    @Autowired
    private ModelMapper modelMapper;

	@Override
	public String addRoute(RouteDTO routeDTO) {
		 Route route = modelMapper.map(routeDTO, Route.class);
	        routeRepo.save(route);
	        return "Route added successfully.";
	}

	@Override
	public RouteDTO updateRoute(int routeId, RouteDTO routeDTO) {
		Route route = routeRepo.findById(routeId)
                .orElseThrow(() -> new RouteNotFoundException("Route not found with ID: " + routeId));

        route.setOrigin(routeDTO.getOrigin());
        route.setDestination(routeDTO.getDestination());
        route.setDepartureTime(routeDTO.getDepartureTime());
        route.setArrivalTime(routeDTO.getArrivalTime());
        route.setDistanceInKm(routeDTO.getDistanceInKm());

        routeRepo.save(route);
        return modelMapper.map(route, RouteDTO.class);
	}

	@Override
	public String deleteRoute(int routeId) {
		 if (!routeRepo.existsById(routeId)) {
	            throw new RouteNotFoundException("Route not found with ID: " + routeId);
	        }
	        routeRepo.deleteById(routeId);
	        return "Route deleted successfully.";
	}
 
	@Override
	public List<RouteDTO> getAllRoutes() {
		return routeRepo.findAll().stream()
                .map(route -> modelMapper.map(route, RouteDTO.class))
                .collect(Collectors.toList());
	}

	@Override
	public RouteDTO getRouteById(int routeId) {
		Route route = routeRepo.findById(routeId)
                .orElseThrow(() -> new RouteNotFoundException("Route not found with ID: " + routeId));
        return modelMapper.map(route, RouteDTO.class);
	}

	@Override
	public List<RouteDTO> searchRoutesByOriginAndDestination(String origin, String destination) {
		 return routeRepo.findByOriginAndDestination(origin, destination).stream()
	                .map(route -> modelMapper.map(route, RouteDTO.class))
	                .collect(Collectors.toList());
	}
	
	

}
