package com.arsalaan.models;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
public class Enrollments {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@CreatedDate
	private Instant enrollmentDate;
	
	@ManyToOne
	@JoinColumn(name = "learner_id")
	private User learner;
	
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Courses courses;
	
	@OneToOne(mappedBy = "enrollment")
	@JsonIgnore
	private Payments payment;
}
