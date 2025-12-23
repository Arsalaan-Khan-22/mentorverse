package com.arsalaan.dto.shared;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpcomingSessions {

	long bookingId;
	String userName;
	LocalDate sessionDate;
	LocalTime sessionTime;
	
	public UpcomingSessions(long bookingId, String userName, LocalDate sessionDate, LocalTime sessionTime) {
		this.bookingId = bookingId;
		this.userName = userName;
		this.sessionDate = sessionDate;
		this.sessionTime = sessionTime;
	}
	
}
