package com.arsalaan.models;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arsalaan.enums.BookingStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
public class Bookings {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "Please enter slot date")
	private LocalDate slotDate;
	
	@NotNull(message = "Please enter slot time")
	private LocalTime slotTime;
	
//	@NotNull(message = "Please enter session duration in minutes")
//	private int durationMinute;
	
	@NotNull(message = "Please enter price")
	private double price;
	
	@Enumerated(EnumType.STRING)
	private BookingStatus status;
	
	private String meetingLink;
	
	@CreatedDate
	private Instant createdAt;
	
	@ManyToOne
	@JoinColumn(name = "learner_id")
	private User learner;
	
	@ManyToOne
	@JoinColumn(name = "mentor_id")
	private User mentor;
	
//	@OneToOne(mappedBy = "booking")
//	@JsonIgnore
//	private Payments payment;
	
	@OneToOne
	@JoinColumn(name = "slot_id")
	private MentorSlots slot;
}
