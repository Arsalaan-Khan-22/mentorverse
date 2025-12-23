package com.arsalaan.dto.shared;

import java.time.LocalTime;

import com.arsalaan.enums.WeekDay;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorSlotsDto {

	private long id;
	private WeekDay dayOfWeek;
	private LocalTime startTime;
	private LocalTime endTime;
	private boolean isAvailable;
	
	
	
	public MentorSlotsDto(long id, WeekDay dayOfWeek, LocalTime startTime, LocalTime endTime, boolean isAvailable) {
		this.id = id;
		this.dayOfWeek = dayOfWeek;
		this.startTime = startTime;
		this.endTime = endTime;
		this.isAvailable = isAvailable;
	}
	
	
	
	
}
