package com.arsalaan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arsalaan.enums.UserRole;
import com.arsalaan.models.Courses;
import com.arsalaan.models.Enrollments;
import com.arsalaan.models.User;
import com.arsalaan.models.Videos;
import com.arsalaan.repositories.CoursesRepository;
import com.arsalaan.repositories.EnrollmentsRespository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.repositories.VideosRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideosService {

	private final VideosRepository videosRespository;
	private final MyResponseWrapper responseWrapper;
	private final UserRepository userRepository;
	private final CoursesRepository coursesRepository;
	private final EnrollmentsRespository enrollmentsRespository;
	
	// Add Video
	public ResponseEntity<?> addVideo(long mentorId, long courseId, Videos video) {
		Optional<User> mentor = userRepository.findById(mentorId);
		if(mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR) {
			Optional<Courses> course = coursesRepository.findById(courseId);
			if(course.isPresent() && course.get().getMentor().getId() == mentorId) {
				video.setCourses(course.get());
				videosRespository.save(video);
				return responseWrapper.response("Video added successfully", video, HttpStatus.OK);
			} else {
				return responseWrapper.response("Mentor and Course Mismatch", null, HttpStatus.BAD_REQUEST);
			}
		} else {
			return responseWrapper.response("No mentor found with id " + mentorId, null, HttpStatus.NOT_FOUND);
		}
	}

	// Get Videos of a specific course
	public ResponseEntity<?> getVideosByCourseId(long courseId) {
		boolean isCourseExist = coursesRepository.existsById(courseId);
		if(isCourseExist) {
			List<Videos> videos = videosRespository.findByCoursesIdOrderByVideoOrderAsc(courseId);
			return responseWrapper.response("Following videos found with id " + courseId, videos, HttpStatus.OK);
		} else {
			return responseWrapper.response("No course found with id " + courseId, null, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> deleteVideoById(long videoId) {
		boolean isVideoExist = videosRespository.existsById(videoId);
		if(isVideoExist) {
			videosRespository.deleteById(videoId);
			return responseWrapper.response("Video deleted successfully with id " + videoId, null, HttpStatus.OK);
		} else {
			return responseWrapper.response("No video found with id " + videoId, null, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getVideosByCourseIdAndLearnerId(long courseId, long learnerId) {
		boolean isCourseExist = coursesRepository.existsById(courseId);
		Optional<Enrollments> enrolled = enrollmentsRespository.findByLearnerIdAndCoursesId(learnerId, courseId);
		if(isCourseExist && enrolled.isPresent()) {
			List<Videos> videos = videosRespository.findByCoursesIdOrderByVideoOrderAsc(courseId);
			return responseWrapper.response("Following videos found with id " + courseId, videos, HttpStatus.OK);
		} else {
			return responseWrapper.response("No course found with id " + courseId, null, HttpStatus.NOT_FOUND);
		}
	}
	
}
