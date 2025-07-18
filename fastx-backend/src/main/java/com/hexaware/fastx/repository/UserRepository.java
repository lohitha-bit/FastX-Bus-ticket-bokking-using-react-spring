package com.hexaware.fastx.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.fastx.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

	boolean existsByEmail(String email);

	User findByEmailAndPassword(String email, String password);

	List<User> findByRole(String role);

	User findByEmail(String email);
	


}
	