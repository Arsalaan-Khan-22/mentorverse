package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arsalaan.models.Videos;
import com.arsalaan.services.VideosService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class VideosController {

	private final VideosService videosService;
	
	@PostMapping("/mentors/{mentorId}/courses/{courseId}/videos")
	public ResponseEntity<?> addVideo(@PathVariable long mentorId, @PathVariable long courseId, @RequestBody Videos video) {
		return videosService.addVideo(mentorId, courseId, video);
	}
	
	@GetMapping("mentors/courses/{courseId}/videos")
	public ResponseEntity<?> getVideosByCourseId(@PathVariable long courseId) {
		return videosService.getVideosByCourseId(courseId);
	}
	
	@DeleteMapping("mentors/courses/delete-video/{videoId}")
	public ResponseEntity<?> deleteVideoById(@PathVariable long videoId) {
		return videosService.deleteVideoById(videoId);
	}
	
	@GetMapping("learner/{learnerId}/courses/{courseId}/videos")
	public ResponseEntity<?> getVideosByCourseIdAndLearnerId(@PathVariable long courseId, @PathVariable long learnerId) {
		return videosService.getVideosByCourseIdAndLearnerId(courseId, learnerId);
	}
	
}
