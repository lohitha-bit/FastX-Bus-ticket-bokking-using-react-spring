package com.hexaware.fastx.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.hexaware.fastx.dto.UserDTO;
import com.hexaware.fastx.entity.User;

public class UserMapper {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public UserDTO toDTO(User user)
	{
		return modelMapper.map(user, UserDTO.class);
	}
	
	public User toEntity(UserDTO userDTO)
	{
		return modelMapper.map(userDTO, User.class);
	}

}
