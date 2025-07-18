package com.hexaware.fastx.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Pattern.Flag;
import jakarta.validation.constraints.Size;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	
	@NotBlank(message="Name is required")
	private String name;
	
	@NotBlank(message="Email is mandatory")
	@Email(message="Invalid Email format")
	private String email;
	
	@NotBlank(message = "Password is required")
	@Size(min=5, max=100, message = "Password length invalid")
	private String password;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore 
	private List<Booking> bookings;


	
	@NotBlank(message="Gender is required")
	@Pattern(regexp = "(?i)Male|Female|Other",message="Gender must be Male, Female or Other")
	private String gender;
	
	@NotNull(message = "Contact number is required")
	@Pattern(regexp = "\\d{10}", message = "Contact number must be exactly 10 digits")
	private String contactNumber;
	
	@NotBlank(message = "Role is required")
    @Pattern(
        regexp = "passenger|admin|bus operator",
        flags = Pattern.Flag.CASE_INSENSITIVE,
        message = "Role must be either passenger, admin, or bus operator"
    )
    private String role;

	public User(int userId, @NotBlank(message = "Name is required") String name,
			@NotBlank(message = "Email is mandatory") @Email(message = "Invalid Email format") String email,
			@NotBlank(message = "Password is required") @Size(min = 5, max = 20, message = "make a Strong password") String password,
			List<Booking> bookings,
			@NotBlank(message = "Gender is required") @Pattern(regexp = "(?i)Male|Female|Other", message = "Gender must be Male, Female or Other") String gender,
			@NotNull(message = "Contact number is required") @Pattern(regexp = "\\d{10}", message = "Contact number must be exactly 10 digits") String contactNumber,
			@NotBlank(message = "Role is required") @Pattern(regexp = "passenger|admin|bus operator", flags = Flag.CASE_INSENSITIVE, message = "Role must be either passenger, admin, or bus operator") String role) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.bookings = bookings;
		this.gender = gender;
		this.contactNumber = contactNumber;
		this.role = role;
	}

	public User() {
		super();
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

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", name=" + name + ", email=" + email + ", password=" + password
				+ ", bookings=" + bookings + ", gender=" + gender + ", contactNumber=" + contactNumber + ", role="
				+ role + "]";
	}

	
	 
}
