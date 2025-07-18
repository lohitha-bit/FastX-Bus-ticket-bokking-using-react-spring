package com.hexaware.fastx.dto;

import jakarta.validation.constraints.Size;

public class UserDTO {
	private int userId;
	private String name;
	private String gender;
	private String contactNumber;
	private String email;
	@Size(min=5, max=20, message = "Password must be between 5 and 20 characters")
	private String password;
	private String role;
	
	public UserDTO() {
	
	}

	public UserDTO(int userId, String name, String gender, String contactNumber, String address, String email,
			String password, String role) {
		super();
		this.userId = userId;
		this.name = name;
		this.gender = gender;
		this.contactNumber = contactNumber;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UserDTO [userId=" + userId + ", name=" + name + ", gender=" + gender + ", contactNumber="
				+ contactNumber + ", email=" + email + ", password=" + password + ", role="
				+ role + "]";
	}
	
	
}
