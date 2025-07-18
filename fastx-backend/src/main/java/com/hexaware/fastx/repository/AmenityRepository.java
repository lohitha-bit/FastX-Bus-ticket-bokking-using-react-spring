package com.hexaware.fastx.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hexaware.fastx.entity.Amenity;

public interface AmenityRepository extends JpaRepository<Amenity, Integer> {
	
	@Query("SELECT a FROM Amenity a WHERE LOWER(a.name) IN :names")
	List<Amenity> findByNameInIgnoreCase(@Param("names") List<String> names);

}
