package com.hexaware.fastx.serviceImplementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.fastx.dto.UserDTO;
import com.hexaware.fastx.entity.User;
import com.hexaware.fastx.exception.EmailAlreadyExistsException;
import com.hexaware.fastx.exception.UserNotFoundException;
import com.hexaware.fastx.repository.UserRepository;
import com.hexaware.fastx.service.UserService;

@Service
public class UserServiceImplementation implements UserService {
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
    private ModelMapper modelMapper;
	
	@Override
	public String registerUser(UserDTO userDTO)
	{
		if(repo.existsByEmail(userDTO.getEmail()))
		{
			throw new EmailAlreadyExistsException("Email already exists.");
		}
		User user=modelMapper.map(userDTO,User.class);
		 user.setEmail(userDTO.getEmail());
		 // encode password before saving
		 user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		  // set other fields like role, name etc.
		  user.setRole(userDTO.getRole());
		  repo.save(user);
		return "USER REGISTERED SUCESSFULLY";
	}
	
	@Override
	public String loginUser(String email,String password)
	{
		User user=repo.findByEmailAndPassword(email,password);
		if (user == null) {
            throw new UserNotFoundException("Invalid email or password.");
        }
        return "Login successful.";
	}
	
	@Override
	public UserDTO getUserById(int userId) {
        User user = repo.findById(userId).orElseThrow(()->new UserNotFoundException("USER NOT FOUND WITH ID: "+userId));
        return modelMapper.map(user, UserDTO.class);
	}
	
	@Override
    public UserDTO updateUser(int userId, UserDTO userDTO) {
        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setGender(userDTO.getGender());
        user.setContactNumber(userDTO.getContactNumber());
        user.setRole(userDTO.getRole());

        repo.save(user);
        return modelMapper.map(user, UserDTO.class);
    }
	
	 @Override
	    public String deleteUser(int userId) {
	        if (!repo.existsById(userId)) {
	            throw new UserNotFoundException("User not found with ID: " + userId);
	        }
	        repo.deleteById(userId);
	        return "User deleted successfully.";
	    }
	 
	 @Override
	    public List<UserDTO> getAllUsers() {
	        return repo.findAll().stream()
	                .map(user -> modelMapper.map(user, UserDTO.class))
	                .collect(Collectors.toList());
	    }

	 @Override
	    public List<UserDTO> getUsersByRole(String role) {
	        return repo.findByRole(role).stream()
	                .map(user -> modelMapper.map(user, UserDTO.class))
	                .collect(Collectors.toList());
	    }
	 
	 @Override
	 public String resetPassword(String email, String newPassword) {
	     User user = repo.findByEmail(email);  
	     if (user == null) {
	         throw new UserNotFoundException("User with email " + email + " not found.");
	     }

	     user.setPassword(passwordEncoder.encode(newPassword));
	     repo.save(user);
	     return "Password reset successfully";
	 }
	 
	 @Override
	 public UserDTO updateUserProfile(int userId, UserDTO userDTO) {
	     User existingUser = repo.findById(userId)
	         .orElseThrow(() -> new UserNotFoundException("User not found with id " + userId));

	     
	     existingUser.setName(userDTO.getName());
	     existingUser.setEmail(userDTO.getEmail());
	     existingUser.setGender(userDTO.getGender());
	     existingUser.setContactNumber(userDTO.getContactNumber());
	     existingUser.setRole(userDTO.getRole());

	     User updatedUser = repo.save(existingUser);
	     return modelMapper.map(updatedUser, UserDTO.class);
	 }


}

