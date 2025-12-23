package com.arsalaan.models;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arsalaan.enums.CourseLevel;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
public class Courses {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message = "Please enter course title")
	private String title;
	
	@NotNull(message = "Please enter course desciption")
	private String description;
	
	@NotNull(message = "Please enter course level")
	@Enumerated(EnumType.STRING)
	private CourseLevel level;
	
	@NotNull(message = "Please enter the price")
	private double price;
	
	private double avgRating;
	
	private String thumbnail;
	
	private String publicId;
	
	@CreatedDate
	private Instant createdAt;
	
	@LastModifiedDate
	private Instant updatedAt;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	
	@ManyToOne
	@JoinColumn(name = "mentor_id")
	private User mentor;
	
//	@OneToMany(mappedBy = "courses")
//	@JsonIgnore
//	private List<Enrollments> enrollments;
//	
	@OneToMany(mappedBy = "courses", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Videos> videos;
//	
	@OneToMany(mappedBy = "course")
	@JsonIgnore
	private List<Reviews> review;
	
}
