package com.arsalaan.models;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
public class Reviews {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private double rating; //Add check constraint later
	
	private String comment;
	
	@CreatedDate
	private Instant createdAt;
	
	@ManyToOne
	@JoinColumn(name = "learner_id")
	private User learner;
	
	@ManyToOne
	@JoinColumn(name = "mentor_id")
	private User mentor;
	
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Courses course;
}
