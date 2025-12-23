package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.arsalaan.models.User;
import com.arsalaan.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class UserController {

	private final UserService userService;
	
	@PostMapping("/mentors/register")
	public ResponseEntity<?> registerMentor(@RequestBody User user) {
		return userService.registerMentor(user);
	}
	
	@PostMapping("/learners/register")
	public ResponseEntity<?> registerLearner(@RequestBody User user) {
		return userService.registerLearner(user);
	}
	
//	@GetMapping("/mentors")
//	public ResponseEntity<?> getAllMentors() {
//		return userService.getAllMentors();
//	}
	
//	@GetMapping("/mentors")
//	public ResponseEntity<?> getAllMentors(@RequestParam(required = false) String search,
//											@RequestParam(required = false) String skill,
//											@RequestParam(required = false) String sortBy) {
//		return userService.getAllMentors(search, skill, sortBy);
//	}
	
	@GetMapping("/mentors")
	public ResponseEntity<?> getAllMentors(@RequestParam(required = false) String search,
											@RequestParam(required = false) String skill,
											@RequestParam(required = false) String sortBy,
											@RequestParam(defaultValue = "0") int page,
										    @RequestParam(defaultValue = "10") int size) {
		return userService.getAllMentors(search, skill, sortBy, page, size);
	}
	
//	@GetMapping("/learners")
//	public ResponseEntity<?> getAllLearners() {
//		return userService.getAllLearners();
//	}
	
	@GetMapping("/mentors/profile/{id}")
	public ResponseEntity<?> getMentorById(@PathVariable long id) {
		return userService.getMentorById(id);
	}
	
	@GetMapping("/learners/profile/{id}")
	public ResponseEntity<?> getLearnerById(@PathVariable long id) {
		return userService.getLearnerById(id);
	}
	
	@PutMapping("/mentors/profile/{id}")
	public ResponseEntity<?> updateMentor(@PathVariable long id, @RequestBody User user) {
		return userService.updateMentor(id, user);
	}
	
	@PutMapping("/learners/profile/{id}")
	public ResponseEntity<?> updateLearner(@PathVariable long id, @RequestBody User user) {
		return userService.updateLearner(id, user);
	}
	
	@GetMapping("/mentors/students/{mentorId}")
	public ResponseEntity<?> getAllStudentsByMentorId(@PathVariable long mentorId) {
		return userService.getAllStudentsByMentorId(mentorId);
	}
	
	@GetMapping("/learners/mentors/skills")
	public ResponseEntity<?> getAllSkills() {
	    return userService.getAllSkills();
	}

	
}
