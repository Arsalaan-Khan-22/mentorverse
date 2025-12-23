package com.arsalaan.models;


import java.time.LocalTime;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arsalaan.enums.WeekDay;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class MentorSlots {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Enumerated(EnumType.STRING)
	private WeekDay dayOfWeek;
	
	@NotNull(message = "Please enter start time")
	private LocalTime startTime;
	
	@NotNull(message = "Please enter end time")
	private LocalTime endTime;
	
	private Boolean isBooked;
	
	@ManyToOne
	@JoinColumn(name = "mentor_id")
	private User mentor;
	
//	@OneToOne(mappedBy = "slot")
//	private Bookings booking;
	
	@Transient
	private boolean available;
}
