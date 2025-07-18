package com.hexaware.fastx.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hexaware.fastx.entity.Route;

@Repository
public interface RouteRepository extends JpaRepository<Route,Integer> {

	List<Route> findByOriginAndDestination(String origin, String destination);

	@Query(value = "SELECT DISTINCT origin FROM route WHERE LOWER(origin) LIKE :q " +
            "UNION SELECT DISTINCT destination FROM route WHERE LOWER(destination) LIKE :q", 
    nativeQuery = true)
	List<String> findDistinctOriginsOrDestinations(@Param("q") String q);

	

}
