package com.arsalaan.dto.shared;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

	private String token;
    private Long id;
    private String name;
    private String email;
    private String role;
    private String message;
	
}
