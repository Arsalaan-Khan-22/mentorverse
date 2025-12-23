package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arsalaan.models.Reviews;
import com.arsalaan.services.ReviewsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class ReviewsController {

	private final ReviewsService reviewsService;
	
	@PostMapping("/reviews/mentor/{mentorId}/learner/{learnerId}")
	public ResponseEntity<?> addReviewToMentor(@RequestBody Reviews review, @PathVariable long learnerId, @PathVariable long mentorId) {
		return reviewsService.addReviewToMentor(review, learnerId, mentorId);
	}
	
	@GetMapping("/reviews/mentor/{mentorId}")
	public ResponseEntity<?> getAllReviewsBymentorId(@PathVariable long mentorId) {
		return reviewsService.getAllReviewsBymentorId(mentorId);
	}
	
	
	@GetMapping("/reviews/course/{courseId}")
	public ResponseEntity<?> getAllReviewsByCourseId(@PathVariable long courseId) {
		return reviewsService.getAllReviewsByCourseId(courseId);
	}
	
	@PostMapping("/reviews/course/{courseId}/learner/{learnerId}")
	public ResponseEntity<?> addReviewToCourse(@RequestBody Reviews review, @PathVariable long courseId, @PathVariable long learnerId) {
		return reviewsService.addReviewToCourse(review, courseId, learnerId);
	}
}
