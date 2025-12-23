package com.arsalaan.dto.shared;

import lombok.Data;

@Data
public class LoginRequest {

	private String email;
    private String password;
    private String role;
	
}
