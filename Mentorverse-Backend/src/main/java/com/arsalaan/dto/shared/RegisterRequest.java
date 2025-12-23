package com.arsalaan.dto.shared;

import com.arsalaan.enums.UserRole;

import lombok.Data;

@Data
public class RegisterRequest {

	private String name;
    private String email;
    private String password;
    private UserRole role; 
	
}
