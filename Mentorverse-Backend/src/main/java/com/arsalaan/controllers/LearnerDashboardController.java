package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arsalaan.services.LearnerDashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class LearnerDashboardController {

	private final LearnerDashboardService learnerDashboardService;
	
	@GetMapping("/learners/dashboard-stats/{learnerId}")
	public ResponseEntity<?> getAllDashboardStats(@PathVariable long learnerId) {
		return learnerDashboardService.getAllDashboardStats(learnerId);
	}
	
	@GetMapping("/learners/dashboard-upcoming-sessions/{learnerId}")
	public ResponseEntity<?> getUpcomingSessionDetails(@PathVariable long learnerId) {
		return learnerDashboardService.getUpcomingSessionDetails(learnerId);
	}
	
	@GetMapping("/learners/dashboard-courses/{learnerId}")
	public ResponseEntity<?> getTop3CoursesByLearnerId(@PathVariable long learnerId) {
		return learnerDashboardService.getTop3CoursesByLearnerId(learnerId);
	}
}
