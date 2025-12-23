package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.arsalaan.models.Courses;
import com.arsalaan.services.CoursesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class CoursesController {

	private final CoursesService coursesService;
	
	@GetMapping("/mentors/courses/{mentorId}")
	public ResponseEntity<?> getCoursesByMentorId(@PathVariable long mentorId) {
		return coursesService.getCoursesByMentorId(mentorId);
	}
	
	@PostMapping("/mentors/courses/create/{mentorId}")
	public ResponseEntity<?> createCourse(@PathVariable long mentorId, @RequestBody Courses course) {
		return coursesService.createCourse(course);
	}
	
	@DeleteMapping("/mentors/courses/delete/{courseId}")
	public ResponseEntity<?> deleteCourseById(@PathVariable long courseId) {
		return coursesService.deleteCourseById(courseId);
	}
	
	@GetMapping("/course/{courseId}")
	public ResponseEntity<?> getCourseById(@PathVariable long courseId) {
		return coursesService.getCourseById(courseId);
	}
	
	@PutMapping("/mentors/course/update/{courseId}")
	public ResponseEntity<?> updateCourseById(@PathVariable long courseId, @RequestBody Courses course) {
		return coursesService.updateCourseById(courseId, course);
	}
	
	@GetMapping("/mentors/course/{courseId}/statistics")
	public ResponseEntity<?> getCourseStatisticsByCourseId(@PathVariable long courseId) {
		return coursesService.getCourseStatisticsByCourseId(courseId);
	}
	
	@GetMapping("/learners/{learnerId}/courses")
	public ResponseEntity<?> getCoursesEnrolledByLearnerId(@PathVariable long learnerId) {
		return coursesService.getCoursesEnrolledByLearnerId(learnerId);
	}
	
//	@GetMapping("/courses") 
//	public ResponseEntity<?> getAllCourses() {
//		return coursesService.getAllCourses();
//	}
	
//	@GetMapping("/courses") 
//	public ResponseEntity<?> getAllCourses(@RequestParam(required = false) String search, 
//											@RequestParam(required = false) String category, 
//											@RequestParam(required = false) String sortBy,
//											@RequestParam(required = false) String level) {
//		return coursesService.getAllCourses(search, category, sortBy, level);
//	}
	
	
	@GetMapping("/courses") 
	public ResponseEntity<?> getAllCourses(
	    @RequestParam(required = false) String search, 
	    @RequestParam(required = false) String category, 
	    @RequestParam(required = false) String sortBy,
	    @RequestParam(required = false) String level,
	    @RequestParam(defaultValue = "0") int page,
	    @RequestParam(defaultValue = "10") int size) {
	    return coursesService.getAllCourses(search, category, sortBy, level, page, size);
	}

	
	
}
