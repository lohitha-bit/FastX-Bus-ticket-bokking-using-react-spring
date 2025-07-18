package com.hexaware.fastx.service;

import java.util.List;

import com.hexaware.fastx.dto.RouteDTO;

public interface RouteService {

	String addRoute(RouteDTO routeDTO);

	RouteDTO updateRoute(int id, RouteDTO routeDTO);

	String deleteRoute(int id);

	List<RouteDTO> getAllRoutes();

	RouteDTO getRouteById(int id);

	List<RouteDTO> searchRoutesByOriginAndDestination(String origin, String destination);
	

}
