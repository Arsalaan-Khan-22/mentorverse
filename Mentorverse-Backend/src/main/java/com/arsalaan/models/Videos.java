package com.arsalaan.models;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
public class Videos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "Please enter video title")
	private String title;
	
	@NotNull(message = "Please enter video url")
	private String videoUrl;

	@NotNull(message = "Please enter video duration in minutes")
	private String durationMinute;
	
	@NotNull(message = "Please enter video order")
	private int videoOrder;
	
	private String thumbnail;
	
	private String videoPublicId;
	
	private String thumbnailPublicId;
	
	@CreatedDate
	private Instant createdAt;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "course_id")
	private Courses courses;
}
