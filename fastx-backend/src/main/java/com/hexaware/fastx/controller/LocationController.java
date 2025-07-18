package com.hexaware.fastx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.fastx.repository.RouteRepository;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/locations")
public class LocationController {
  @Autowired
  private RouteRepository routeRepo;

  @GetMapping("/search")
  public List<String> searchLocations(@RequestParam String query) {
    return routeRepo.findDistinctOriginsOrDestinations("%" + query.toLowerCase() + "%");
  }
}
