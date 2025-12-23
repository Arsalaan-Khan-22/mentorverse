package com.arsalaan.models;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arsalaan.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@EntityListeners(value = AuditingEntityListener.class)
@Data
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotBlank(message = "Please enter the name")
	@Size(min = 3)
	private String name;
	
	@Email
	@NotBlank(message = "Please enter email")
	@Column(unique = true)
	private String email;
	
	@NotBlank(message = "Please enter password") //will add pattern and encryption later
	private String password;
	
	@Enumerated(EnumType.STRING)
	@NotNull(message = "Please enter role")
	private UserRole role;
	
	private String bio; //Compulsory for mentors
	
	private String profilePic;
	
	private String skills; //Comma separated skills for mentors only
	
	private String interests; //Comma separated interests for learners only
	
	private double experience; //Only for mentors
	
//	private int totalStudents; //Only for mentors
	
	private double avgRating; //Only for mentors
	
//	private int totalReviews; //Only for mentors
	
	private int ratePerHour; //Only for mentors
	
	@CreatedDate
	private Instant createdAt;
	
	
//	
//	@OneToMany(mappedBy = "mentor")
//	@JsonIgnore
//	private List<Courses> courses;
//	
//	@OneToMany(mappedBy = "learner")
//	@JsonIgnore
//	private List<Bookings> learnerBooking;
//	
//	@OneToMany(mappedBy = "mentor")
//	@JsonIgnore
//	private List<Bookings> mentorBooking;
//	
//	@OneToMany(mappedBy = "learner")
//	@JsonIgnore
//	private List<Enrollments> learnerEnrollment;
//	
//	@OneToMany(mappedBy = "learner")
//	@JsonIgnore
//	private List<Reviews> learnerReview;
//	
//	@OneToMany(mappedBy = "mentor")
//	@JsonIgnore
//	private List<Reviews> mentorReview;
//	
//	@OneToMany(mappedBy = "mentor")
//	@JsonIgnore
//	private List<MentorSlots> mentorSlots;
}
