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

import com.hexaware.fastx.dto.BusDTO;
import com.hexaware.fastx.service.BusService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/buses")
public class BusController {
	
	@Autowired
    private BusService busService;

	@PreAuthorize("hasAnyRole('ADMIN', 'BUS_OPERATOR')")
    @PostMapping
    public ResponseEntity<String> addBus(@RequestBody BusDTO dto) {
        String message = busService.addBus(dto);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Bus added successfully");
        return new ResponseEntity<>(message, headers, HttpStatus.CREATED);
    }

	@PreAuthorize("hasAnyRole('ADMIN', 'BUS_OPERATOR')")
    @PutMapping("/{id}")
    public ResponseEntity<BusDTO> updateBus(@PathVariable int id, @RequestBody BusDTO dto) {
        BusDTO updatedBus = busService.updateBus(id, dto);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Bus updated successfully");
        return new ResponseEntity<>(updatedBus, headers, HttpStatus.OK);
    }
    
	@PreAuthorize("hasAnyRole('ADMIN', 'BUS_OPERATOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBus(@PathVariable int id)
    {
    	String message = busService.deleteBus(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Bus deleted successfully");
        return new ResponseEntity<>(message, headers, HttpStatus.NO_CONTENT);
    }
    
	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<BusDTO>> getAllBuses() {
        List<BusDTO> buses = busService.getAllBuses();
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "All buses fetched successfully");
        return new ResponseEntity<>(buses, headers, HttpStatus.OK);
    }

	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<BusDTO> getBusById(@PathVariable int id) {
        BusDTO bus = busService.getBusById(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Bus fetched successfully");
        return new ResponseEntity<>(bus, headers, HttpStatus.OK);
    }
    
	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
    @GetMapping("/route")
    public ResponseEntity<List<BusDTO>> getBusesByOriginAndDestination(@RequestParam String origin,
            @RequestParam String destination) {
        List<BusDTO> buses = busService.getBusesByOriginAndDestination(origin, destination);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Buses fetched by origin and destination");
        return new ResponseEntity<>(buses, headers, HttpStatus.OK);
    }

	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
    @GetMapping("/amenities")
    public ResponseEntity<List<BusDTO>> getBusesByAmenities(@RequestParam List<String> amenities) {
        List<BusDTO> buses = busService.getBusesByAmenities(amenities);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Buses fetched by amenities");
        return new ResponseEntity<>(buses, headers, HttpStatus.OK);
    }

	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
    @GetMapping("/route/{routeId}")
    public ResponseEntity<List<BusDTO>> getBusesByRouteId(@PathVariable int routeId) {
        List<BusDTO> buses = busService.getBusesByRouteId(routeId);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Buses fetched by routeId");
        return new ResponseEntity<>(buses, headers, HttpStatus.OK);
    }

	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
    @GetMapping("/search/name")
    public ResponseEntity<List<BusDTO>> searchByBusName(@RequestParam String name) {
        List<BusDTO> buses = busService.searchByBusName(name);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Buses fetched by bus name");
        return new ResponseEntity<>(buses, headers, HttpStatus.OK);
    }

	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
    @GetMapping("/search/type")
    public ResponseEntity<List<BusDTO>> searchByBusType(@RequestParam String type) {
        List<BusDTO> buses = busService.searchByBusType(type);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Buses fetched by bus type");
        return new ResponseEntity<>(buses, headers, HttpStatus.OK);
    }

	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
    @GetMapping("/search/fare")
    public ResponseEntity<List<BusDTO>> filterByFare(@RequestParam double minFare, @RequestParam double maxFare) {
        List<BusDTO> buses = busService.filterByFare(minFare, maxFare);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "Buses fetched by fare range");
        return new ResponseEntity<>(buses, headers, HttpStatus.OK);
    }
	
	@PreAuthorize("hasAnyRole('USER', 'BUS_OPERATOR', 'ADMIN')")
	@GetMapping("/search")
	public ResponseEntity<List<BusDTO>> searchBuses(
	    @RequestParam String origin,
	    @RequestParam String destination,
	    @RequestParam(required = false) Double minFare,
	    @RequestParam(required = false) Double maxFare,
	    @RequestParam(required = false) List<String> amenities,
	    @RequestParam(required = false) String type
	) {
	    List<BusDTO> buses = busService.searchBuses(origin, destination, minFare, maxFare, amenities, type);
	    HttpHeaders headers = new HttpHeaders();
	    headers.add("info", "Buses fetched with filters");
	    return new ResponseEntity<>(buses, headers, HttpStatus.OK);
	}

    
}
