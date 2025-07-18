package com.hexaware.fastx.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hexaware.fastx.entity.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {

	List<Seat> findByBus_BusIdAndStatus(int busId, String string);

	@Query("SELECT s FROM Seat s WHERE s.bus.busName = :busName AND s.status = 'AVAILABLE'")
	List<Seat> findAvailableSeatsByBusName(@Param("busName") String busName);

	List<Seat> findByBus_BusId(int busId); 

}
