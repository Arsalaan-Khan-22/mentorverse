package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arsalaan.models.User;
import com.arsalaan.services.MentorDashboardService;
import com.arsalaan.user.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/mentors")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class MentorDashboardController {

    private final MentorDashboardService mentorDashboardService;

    @GetMapping("/dashboard-stats")
    public ResponseEntity<?> getAllDashboardStats(@AuthenticationPrincipal CustomUserDetails userDetails) {

        User user = userDetails.getUser();

        if (!user.getRole().name().equals("MENTOR")) {
            return ResponseEntity.status(403).body("Access Denied: Not a mentor");
        }

        return mentorDashboardService.getAllDashboardStats(user.getId());
    }

    @GetMapping("/dashboard-courses-stats")
    public ResponseEntity<?> getRecentCourseDetails(@AuthenticationPrincipal CustomUserDetails userDetails) {

        User user = userDetails.getUser();

        if (!user.getRole().name().equals("MENTOR")) {
            return ResponseEntity.status(403).body("Access Denied: Not a mentor");
        }

        return mentorDashboardService.getRecentCourseDetails(user.getId());
    }

    @GetMapping("/dashboard-upcoming-sessions")
    public ResponseEntity<?> getUpcomingSessionDetails(@AuthenticationPrincipal CustomUserDetails userDetails) {

        User user = userDetails.getUser();

        if (!user.getRole().name().equals("MENTOR")) {
            return ResponseEntity.status(403).body("Access Denied: Not a mentor");
        }

        return mentorDashboardService.getUpcomingSessionDetails(user.getId());
    }
}
