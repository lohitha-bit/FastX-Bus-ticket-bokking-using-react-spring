package com.hexaware.fastx.dto;

public class AmenityDTO {
    private int amenityId;
    private String name;
    private String description;

    public AmenityDTO() {}

    public AmenityDTO(int amenityId, String name, String description) {
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
}
