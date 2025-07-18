package com.hexaware.fastx.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hexaware.fastx.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Integer> {

	@Query("SELECT b FROM Bus b WHERE b.route.origin = :origin AND b.route.destination = :destination")
	List<Bus> findByRoute_OriginAndRoute_Destination(@Param("origin") String origin, @Param("destination") String destination);


    @Query("SELECT DISTINCT b FROM Bus b JOIN b.amenities a WHERE a.name IN :names")
    List<Bus> findByAmenities_NameIn(@Param("names") List<String> names);

    @Query("SELECT b FROM Bus b WHERE b.route.routeId = :routeId")
    List<Bus> findByRoute_RouteId(@Param("routeId") int routeId);

    @Query("SELECT b FROM Bus b WHERE LOWER(b.busName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Bus> findByBusNameContainingIgnoreCase(@Param("name") String name);

    @Query("SELECT b FROM Bus b WHERE LOWER(b.busType) = LOWER(:type)")
    List<Bus> findByBusTypeIgnoreCase(@Param("type") String type);

    @Query(value = "SELECT * FROM bus WHERE fare BETWEEN :minFare AND :maxFare", nativeQuery = true)
    List<Bus> findByFareBetween(@Param("minFare") double minFare, @Param("maxFare") double maxFare);

}
