package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arsalaan.services.VideoProgressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class VideoProgressController {

    private final VideoProgressService videoProgressService;

    // Mark video completed
    @PutMapping("/complete")
    public ResponseEntity<?> markCompleted(
        @RequestParam long learnerId,
        @RequestParam long videoId
    ) {
        return videoProgressService.markVideoCompleted(learnerId, videoId);
    }

    // Get completed videos of a course
    @GetMapping("/course/{courseId}/learner/{learnerId}")
    public ResponseEntity<?> getCompletedVideos(
        @PathVariable long courseId,
        @PathVariable long learnerId
    ) {
        return videoProgressService.getCompletedVideos(learnerId, courseId);
    }
}
