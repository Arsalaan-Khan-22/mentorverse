package com.arsalaan.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arsalaan.dto.learner.AllMentors;
import com.arsalaan.dto.learner.MentorDetails;
import com.arsalaan.dto.mentor.EnrolledStudents;
import com.arsalaan.enums.UserRole;
import com.arsalaan.models.Courses;
import com.arsalaan.models.User;
import com.arsalaan.repositories.EnrollmentsRespository;
import com.arsalaan.repositories.ReviewsRespository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;
import com.arsalaan.specifications.UserSpecification;

import jakarta.validation.Valid;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MyResponseWrapper responseWrapper;
	
	@Autowired
	EnrollmentsRespository enrollmentsRespository;
	
	@Autowired
	ReviewsRespository reviewsRespository;
	
	// Registration Methods
	public ResponseEntity<?> registerMentor(User user) {
		
		Optional<User> findUser = userRepository.findByEmail(user.getEmail());
		
		if(findUser.isPresent()) 
		{
			return responseWrapper.response("User already exists", null, HttpStatus.FOUND);
		}
		else 
		{
			if(user.getBio() == null) 
				return responseWrapper.response("Please enter bio", null, HttpStatus.NOT_ACCEPTABLE);
			
			if(user.getSkills() == null)
				return responseWrapper.response("Please enter skills", null, HttpStatus.NOT_ACCEPTABLE);
			
			if(user.getExperience() == 0.0)
				return responseWrapper.response("Please enter experience", null, HttpStatus.NOT_ACCEPTABLE);
				
			user.setRole(UserRole.MENTOR);
			userRepository.save(user);
			return responseWrapper.response("User Registered Successfully", user, HttpStatus.OK);
		}
	}
	
	public ResponseEntity<?> registerLearner(User user) {
		
		Optional<User> findUser = userRepository.findByEmail(user.getEmail());
		
		if(findUser.isPresent()) 
		{
			return responseWrapper.response("User already exists", null, HttpStatus.FOUND);
		}
		else 
		{		
			user.setRole(UserRole.LEARNER);
			userRepository.save(user);
			return responseWrapper.response("User Registered Successfully", user, HttpStatus.OK);
		}
	}
	
	// Login Method
	
	
	// Get Methods
//	public ResponseEntity<?> getAllMentors() {
//
//		List<AllMentors> users = userRepository.findByRole(UserRole.MENTOR)
//				.stream()
//				.map(mentor -> new AllMentors(
//						mentor.getId(),
//						mentor.getProfilePic(), 
//						mentor.getName(), 
//						reviewsRespository.findAvgRatingByMentorId(mentor.getId()),
//						reviewsRespository.countDistinctLearnerIdByMentorId(mentor.getId()),
//						mentor.getBio(), 
//						mentor.getSkills(), 
//						mentor.getExperience(), 
//						userRepository.countTotalStudentsByMentorId(mentor.getId()), 
//						mentor.getRatePerHour()))
//				.toList();
//		
//		return responseWrapper.response("Following are all mentors", users, HttpStatus.OK);
//	}
	
	public ResponseEntity<?> getAllMentors(String search, String skill, String sortBy, int page, int size) {
		
		Specification<User> spec = Specification.where(UserSpecification.hasRole(UserRole.MENTOR))
												.and(UserSpecification.nameOrSkillContains(search))
												.and(UserSpecification.hasSkill(skill))
												.and(UserSpecification.sortby(sortBy));
		
//		List<User> mentors = userRepository.findAll(spec);
		
		Pageable pageable = PageRequest.of(page, size); 
	    Page<User> mentorsPage = userRepository.findAll(spec, pageable);

		List<AllMentors> users = mentorsPage.getContent()
				.stream()
				.map(mentor -> new AllMentors(
						mentor.getId(),
						mentor.getProfilePic(), 
						mentor.getName(), 
						mentor.getEmail(),
						mentor.getAvgRating(),
						reviewsRespository.countDistinctLearnerIdByMentorId(mentor.getId()),
						mentor.getBio(), 
						mentor.getSkills(), 
						mentor.getExperience(), 
						userRepository.countTotalStudentsByMentorId(mentor.getId()), 
						mentor.getRatePerHour()))
				.toList();
		
		return responseWrapper.response("Following are all mentors", mentorsPage, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getAllSkills() {
	    List<String> skills = userRepository.findAllMentorSkills();

	    // Flatten comma-separated skills
	    Set<String> uniqueSkills = skills.stream()
	        .flatMap(s -> Arrays.stream(s.split(",")))
	        .map(String::trim)
	        .filter(s -> !s.isEmpty())
	        .collect(Collectors.toSet());

	    List<String> finalSkills = new ArrayList<>(uniqueSkills);
	    Collections.sort(finalSkills);

	    return responseWrapper.response("All skills fetched successfully", finalSkills, HttpStatus.OK);
	}
	
//	public ResponseEntity<?> getAllLearners() {
//			List<User> users = userRepository.findByRole(UserRole.LEARNER);
//			return responseWrapper.response("Following are all learners", users, HttpStatus.OK);
//	}
	
	public ResponseEntity<?> getMentorById(long id) {
		
		if(userRepository.existsById(id) && userRepository.findById(id).get().getRole().toString() == "MENTOR") {
			User mentor = userRepository.findById(id).get();
			AllMentors mentorDetails = new AllMentors(
							mentor.getId(),
							mentor.getProfilePic(), 
							mentor.getName(), 
							mentor.getEmail(),
							mentor.getAvgRating(),
							reviewsRespository.countDistinctLearnerIdByMentorId(mentor.getId()),
							mentor.getBio(), 
							mentor.getSkills(), 
							mentor.getExperience(), 
							userRepository.countTotalStudentsByMentorId(mentor.getId()), 
							mentor.getRatePerHour());
			return responseWrapper.response("Following mentor found with id " + id, mentorDetails, HttpStatus.OK);
		}
		else 
		{
			return responseWrapper.response("There is no mentor with id " + id, null, HttpStatus.NOT_FOUND);
		}
		
	}
	
	public ResponseEntity<?> getLearnerById(long id) {
		
		if(userRepository.existsById(id) && userRepository.findById(id).get().getRole().name() == "LEARNER")
		{
			User user = userRepository.findById(id).get();
			return responseWrapper.response("Following learner found with id " + id, user, HttpStatus.OK);
		}
		else 
		{
			return responseWrapper.response("There is no learner with id " + id, null, HttpStatus.NOT_FOUND);
		}
		
	}
	
	// Update Methods
	public ResponseEntity<?> updateMentor(long id, @Valid User user) {
		Optional<User> findUser = userRepository.findById(id);
		if(findUser.isPresent() && findUser.get().getRole().toString() == "MENTOR") 
		{
			user.setId(id);
			user.setRole(UserRole.MENTOR);
			user.setPassword(findUser.get().getPassword());
			user.setCreatedAt(findUser.get().getCreatedAt());
			userRepository.save(user);
			return responseWrapper.response("Mentor updated successfully", user, HttpStatus.OK);
		}
		else
		{
			return responseWrapper.response("There is no mentor with id " + id, null, HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> updateLearner(long id, User user) {
		Optional<User> findUser = userRepository.findById(id);
		if(findUser.isPresent() && findUser.get().getRole().name() == "LEARNER") 
		{
			user.setId(id);
			user.setRole(UserRole.LEARNER);
			user.setPassword(findUser.get().getPassword());
			user.setCreatedAt(findUser.get().getCreatedAt());
			userRepository.save(user);
			return responseWrapper.response("Learner updated successfully", user, HttpStatus.OK);
		}
		else
		{
			return responseWrapper.response("There is no learner with id " + id, null, HttpStatus.NOT_FOUND);
		}
	}
	
	// Get all students of specific mentor
	public ResponseEntity<?> getAllStudentsByMentorId(long mentorId) {
		List<EnrolledStudents> enrolledStudents = userRepository.findAllStudentsByMentorId(mentorId).stream()
				.map(student -> new EnrolledStudents(
						student.getId(), 
						student.getName(), 
						student.getEmail(), 
						enrollmentsRespository.countCoursesEnrolledByLearner(student.getId(), mentorId)))
				.toList();
		return responseWrapper.response("Following students found with mentor id", enrolledStudents, HttpStatus.OK);
	}
	
	
	
}
