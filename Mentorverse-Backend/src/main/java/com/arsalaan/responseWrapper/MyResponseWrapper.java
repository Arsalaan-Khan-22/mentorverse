package com.arsalaan.responseWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class MyResponseWrapper {

	private String message;
	private Object data;
	
	public ResponseEntity<?> response(String message, Object data, HttpStatus httpStatus) {
		MyResponseWrapper responseWrapper = new MyResponseWrapper();
		responseWrapper.setMessage(message);
		responseWrapper.setData(data);
		return new ResponseEntity<>(responseWrapper, httpStatus);
	}
	
}


