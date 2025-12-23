package com.arsalaan.dto.shared;

import java.time.LocalDate;
import java.time.LocalTime;

import com.arsalaan.enums.BookingStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequests {
	
	private long id;
	private String profilePicture;
	private String userName;
	private LocalDate slotDate;
	private LocalTime slotTime;
	private double price;
	private BookingStatus status;
	
	
	
	public BookingRequests(long id, String profilePicture, String userName, LocalDate slotDate, LocalTime slotTime, double price, BookingStatus status) {
		this.id = id;
		this.profilePicture = profilePicture;
		this.userName = userName;
		this.slotDate = slotDate;
		this.slotTime = slotTime;
		this.price = price;
		this.status = status;
	}
	
}
