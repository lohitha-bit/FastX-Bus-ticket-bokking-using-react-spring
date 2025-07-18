package com.hexaware.fastx.serviceImplementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.fastx.dto.AmenityDTO;
import com.hexaware.fastx.entity.Amenity;
import com.hexaware.fastx.exception.AmenityNotFoundException;
import com.hexaware.fastx.repository.AmenityRepository;
import com.hexaware.fastx.service.AmenityService;

@Service
public class AmenityServiceImplementation implements AmenityService {

    @Autowired
    private AmenityRepository amenityRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String addAmenity(AmenityDTO amenityDTO) {
        Amenity amenity = modelMapper.map(amenityDTO, Amenity.class);
        amenityRepo.save(amenity);
        return "Amenity added successfully.";
    }

    @Override
    public AmenityDTO updateAmenity(int id, AmenityDTO amenityDTO) {
        Amenity amenity = amenityRepo.findById(id)
            .orElseThrow(() -> new AmenityNotFoundException("Amenity not found with ID: " + id));

        amenity.setName(amenityDTO.getName());
        amenity.setDescription(amenityDTO.getDescription());

        amenityRepo.save(amenity);
        return modelMapper.map(amenity, AmenityDTO.class);
    }

    @Override
    public String deleteAmenity(int id) {
        if (!amenityRepo.existsById(id)) {
            throw new AmenityNotFoundException("Amenity not found with ID: " + id);
        }
        amenityRepo.deleteById(id);
        return "Amenity deleted successfully.";
    }

    @Override
    public List<AmenityDTO> getAllAmenities() {
        return amenityRepo.findAll().stream()
                .map(amenity -> modelMapper.map(amenity, AmenityDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AmenityDTO getAmenityById(int id) {
        Amenity amenity = amenityRepo.findById(id)
                .orElseThrow(() -> new AmenityNotFoundException("Amenity not found with ID: " + id));
        return modelMapper.map(amenity, AmenityDTO.class);
    }
}
