package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arsalaan.services.EnrollmentsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class EnrollmentsController {

	private final EnrollmentsService enrollmentsService;
	
	@GetMapping("/enrollments/learner/{learnerId}/course/{courseId}")
	public ResponseEntity<?> getEnrollmentCountByLearnerAndCourseId(@PathVariable long learnerId, @PathVariable long courseId) {
		return enrollmentsService.getEnrollmentCountByLearnerAndCourseId(learnerId, courseId);
	}
	
	@PostMapping("/enrollments/course/{courseId}/learner/{learnerId}")
	public ResponseEntity<?> enrollLearnerInCourse(
	        @PathVariable long learnerId,
	        @PathVariable long courseId) {
	    return enrollmentsService.enrollLearnerInCourse(learnerId, courseId);
	}

	
}
