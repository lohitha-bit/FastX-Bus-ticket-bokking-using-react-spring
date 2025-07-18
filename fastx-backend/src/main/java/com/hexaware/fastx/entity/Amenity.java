package com.hexaware.fastx.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int amenityId;

    @NotBlank(message = "Amenity name is required")
    @Size(max = 100, message = "Amenity name can't exceed 100 characters")
    private String name;

    @Size(max = 250, message = "Amenity description can't exceed 250 characters")
    private String description;

    public Amenity() {}

    public Amenity(int amenityId, String name, String description) {
        this.amenityId = amenityId;
        this.name = name;
        this.description = description;
    }

    public int getAmenityId() {
        return amenityId;
    }

    public void setAmenityId(int amenityId) {
        this.amenityId = amenityId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Amenity [amenityId=" + amenityId + ", name=" + name + ", description=" + description + "]";
    }
}