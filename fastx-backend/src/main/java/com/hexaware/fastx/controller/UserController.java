package com.hexaware.fastx.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.fastx.dto.ForgotPasswordDTO;
import com.hexaware.fastx.dto.UserDTO;
import com.hexaware.fastx.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody UserDTO userDTO)
	{
		String message=userService.registerUser(userDTO);
		HttpHeaders headers=new HttpHeaders();
		headers.add("info","User registered sucessfully");
		return new ResponseEntity<>(message,headers,HttpStatus.CREATED);	
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password)
	{
		String message=userService.loginUser(email,password);
		HttpHeaders headers=new HttpHeaders();
		headers.add("info","User logged in sucessfully");
		return new ResponseEntity<>(message,headers,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable int id)
	{
		UserDTO userDTO=userService.getUserById(id);
		HttpHeaders headers = new HttpHeaders();
        headers.add("info", "User fetched successfully");
        return new ResponseEntity<>(userDTO,headers,HttpStatus.OK);
	}
	
	 @PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable int id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "User updated successfully");
        return new ResponseEntity<>(updatedUser, headers, HttpStatus.OK);
    }
	
	 @PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        String message = userService.deleteUser(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("info", "User deleted successfully");
        return new ResponseEntity<>(message, headers, HttpStatus.NO_CONTENT);
    }
	
	 @PreAuthorize("hasRole('ADMIN')")
	 @GetMapping("getAllUsers")
	    public ResponseEntity<List<UserDTO>> getAllUsers() {
	        List<UserDTO> users = userService.getAllUsers();
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("info", "Users fetched by role");
	        return new ResponseEntity<>(users, headers, HttpStatus.OK);
	    }
	 
	 @PreAuthorize("hasRole('ADMIN')")
	 @GetMapping("/role/{role}")
	    public ResponseEntity<List<UserDTO>> getUsersByRole(@PathVariable String role) {
	        List<UserDTO> users = userService.getUsersByRole(role);
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("info", "Users fetched by role");
	        return new ResponseEntity<>(users, headers, HttpStatus.OK);
	    }
	 
	 @PreAuthorize("hasRole('USER')")
	 @PutMapping("/profile/{userId}")
	 public ResponseEntity<UserDTO> updateProfile(@PathVariable int userId, @RequestBody UserDTO userDTO) {
	     UserDTO updatedUser = userService.updateUserProfile(userId, userDTO);
	     return ResponseEntity.ok(updatedUser);
	 }

	 @PostMapping("/forgot-password")
	 public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordDTO dto) {
	     String message = userService.resetPassword(dto.getEmail(), dto.getNewPassword());
	     HttpHeaders headers = new HttpHeaders();
	     headers.add("info", "Password reset logic");
	     return new ResponseEntity<>(message, headers, HttpStatus.OK);
	 }


}
