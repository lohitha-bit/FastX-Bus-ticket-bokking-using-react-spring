package com.hexaware.fastx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.fastx.dto.RouteDTO;
import com.hexaware.fastx.service.RouteService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/routes")
public class RouteController {
	
	@Autowired
    private RouteService routeService;
	
	@PreAuthorize("hasAnyRole('ADMIN', 'BUS_OPERATOR')")
	 @PostMapping
	    public ResponseEntity<String> addRoute(@RequestBody RouteDTO routeDTO) {
	        String message = routeService.addRoute(routeDTO);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("info", "Route added successfully");
	        return new ResponseEntity<>(message, headers, HttpStatus.CREATED);
	    }
	 
	@PreAuthorize("hasAnyRole('ADMIN', 'BUS_OPERATOR')")
	 @PutMapping("/{id}")
	    public ResponseEntity<RouteDTO> updateRoute(@PathVariable int id, @RequestBody RouteDTO routeDTO) {
	        RouteDTO updatedRoute = routeService.updateRoute(id, routeDTO);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("info", "Route updated successfully");
	        return new ResponseEntity<>(updatedRoute, headers, HttpStatus.OK);
	    }
	 
	@PreAuthorize("hasAnyRole('ADMIN', 'BUS_OPERATOR')")
	 @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteRoute(@PathVariable int id) {
	        String message = routeService.deleteRoute(id);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("info", "Route deleted successfully");
	        return new ResponseEntity<>(message, headers, HttpStatus.NO_CONTENT);
	    }
	 
	@PreAuthorize("hasAnyRole('USER', 'ADMIN', 'BUS_OPERATOR')")
	 @GetMapping
	    public ResponseEntity<List<RouteDTO>> getAllRoutes() {
	        List<RouteDTO> routes = routeService.getAllRoutes();
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("info", "All routes fetched successfully");
	        return new ResponseEntity<>(routes, headers, HttpStatus.OK);
	    }
	
	 @GetMapping("/{id}")
	    public ResponseEntity<RouteDTO> getRouteById(@PathVariable int id) {
	        RouteDTO routeDTO = routeService.getRouteById(id);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("info", "Route fetched successfully");
	        return new ResponseEntity<>(routeDTO, headers, HttpStatus.OK);
	    }

	    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'BUS_OPERATOR')")
	    @GetMapping("/search")
	    public ResponseEntity<List<RouteDTO>> searchRoutes(
	            @RequestParam String origin,
	            @RequestParam String destination) {

	        List<RouteDTO> routes = routeService.searchRoutesByOriginAndDestination(origin, destination);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("info", "Routes fetched by origin and destination");
	        return new ResponseEntity<>(routes, headers, HttpStatus.OK);
	    }
	    
	
	
	
	
}
