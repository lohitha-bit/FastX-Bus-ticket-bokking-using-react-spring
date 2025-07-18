package com.hexaware.fastx.service;

import java.util.List;

import com.hexaware.fastx.dto.AmenityDTO;

public interface AmenityService {

    String addAmenity(AmenityDTO amenityDTO);

    AmenityDTO updateAmenity(int id, AmenityDTO amenityDTO);

    String deleteAmenity(int id);

    List<AmenityDTO> getAllAmenities();

    AmenityDTO getAmenityById(int id);

}
