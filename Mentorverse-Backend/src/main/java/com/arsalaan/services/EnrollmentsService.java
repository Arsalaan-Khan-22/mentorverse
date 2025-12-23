package com.arsalaan.services;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arsalaan.enums.UserRole;
import com.arsalaan.models.Courses;
import com.arsalaan.models.Enrollments;
import com.arsalaan.models.User;
import com.arsalaan.repositories.CoursesRepository;
import com.arsalaan.repositories.EnrollmentsRespository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnrollmentsService {

	private final EnrollmentsRespository enrollmentsRespository;
	private final UserRepository userRepository;
	private final CoursesRepository coursesRepository;
	private final MyResponseWrapper responseWrapper;
	
	public ResponseEntity<?> getEnrollmentCountByLearnerAndCourseId(long learnerId, long courseId) {
		Optional<User> learner = userRepository.findById(learnerId);
		Optional<Courses> course = coursesRepository.findById(courseId);
		if((learner.isPresent() && learner.get().getRole() == UserRole.LEARNER) && (course.isPresent())) {
			long isLearnerEnrolled = enrollmentsRespository.countByLearnerIdAndCoursesId(learnerId, courseId);
			return responseWrapper.response("Learner enrollment count", isLearnerEnrolled, HttpStatus.OK);
		} else {
			return responseWrapper.response("Learner or Course not found", null, HttpStatus.NOT_FOUND);
		}
	}
	
	
	public ResponseEntity<?> enrollLearnerInCourse(long learnerId, long courseId) {

	    Optional<User> learner = userRepository.findById(learnerId);
	    Optional<Courses> course = coursesRepository.findById(courseId);

	    if (learner.isEmpty() || learner.get().getRole() != UserRole.LEARNER) {
	        return responseWrapper.response("Learner not found", null, HttpStatus.NOT_FOUND);
	    }

	    if (course.isEmpty()) {
	        return responseWrapper.response("Course not found", null, HttpStatus.NOT_FOUND);
	    }
	    
	    boolean alreadyEnrolled = enrollmentsRespository
	            .existsByLearnerIdAndCoursesId(learnerId, courseId);

	    if (alreadyEnrolled) {
	        return responseWrapper.response("Learner is already enrolled", null, HttpStatus.CONFLICT);
	    }

	    // Create enrollment
	    Enrollments enrollment = new Enrollments();
	    enrollment.setLearner(learner.get());
	    enrollment.setCourses(course.get());

	    enrollmentsRespository.save(enrollment);

	    return responseWrapper.response(
	            "Enrolled successfully",
	            enrollment,
	            HttpStatus.CREATED
	    );
	}

	
}
