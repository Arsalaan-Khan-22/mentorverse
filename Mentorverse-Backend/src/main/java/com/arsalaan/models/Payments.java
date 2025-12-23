package com.arsalaan.models;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arsalaan.enums.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
public class Payments {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "Please enter payment amount")
	private double amount;
	
	@Enumerated(value = EnumType.STRING)
	private PaymentStatus status;
	
	@Column(unique = true)
	private String transactionId;

	@Column(nullable = false)
	private String razorpayOrderId;

	private String paymentMethod;
	
	@CreatedDate
	private Instant paymentDate;
	
	@OneToOne
	@JoinColumn(name = "enrollment_id")
	private Enrollments enrollment;
	
	@OneToOne
	@JoinColumn(name = "booking_id")
	private Bookings booking;
}
