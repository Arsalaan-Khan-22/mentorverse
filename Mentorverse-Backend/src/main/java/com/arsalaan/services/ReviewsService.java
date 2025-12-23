package com.arsalaan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.arsalaan.dto.learner.ReviewsDto;
import com.arsalaan.enums.UserRole;
import com.arsalaan.models.Courses;
import com.arsalaan.models.Reviews;
import com.arsalaan.models.User;
import com.arsalaan.repositories.CoursesRepository;
import com.arsalaan.repositories.ReviewsRespository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewsService {

	private final ReviewsRespository reviewsRespository;
	private final UserRepository userRepository;
	private final CoursesRepository coursesRepository;
	private final MyResponseWrapper responseWrapper;
	
	public ResponseEntity<?> addReviewToMentor(Reviews review, long learnerId, long mentorId) {
		Optional<User> learner = userRepository.findById(learnerId);
		Optional<User> mentor = userRepository.findById(mentorId);
		if((learner.isPresent() && learner.get().getRole() == UserRole.LEARNER) &&
				mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR) {
			review.setMentor(mentor.get());
			review.setLearner(learner.get());
			reviewsRespository.save(review);
			User getMentor = mentor.get();
			getMentor.setAvgRating(reviewsRespository.findAvgRatingByMentorId(mentorId));
			userRepository.save(getMentor);
			return responseWrapper.response("Review added successfully", review, HttpStatus.OK);
		} else {
			return responseWrapper.response("Learner or Mentor not found", null, HttpStatus.NOT_FOUND);
		}
	}
	
	//Get All Reviews of a particular course
	public ResponseEntity<?> getAllReviewsByCourseId(long courseId) {
		boolean isCourseExists = coursesRepository.existsById(courseId);
		if(isCourseExists) {
			List<ReviewsDto> reviews = reviewsRespository.findByCourseId(courseId)
					.stream()
					.map(review -> new ReviewsDto(
							review.getId(), 
							review.getLearner().getProfilePic(), 
							review.getLearner().getName(), 
							review.getRating(), 
							review.getComment(), 
							review.getCreatedAt()))
					.toList();
			return responseWrapper.response("Following reviews found", reviews, HttpStatus.OK);
		} else {
			return responseWrapper.response("Course not found with id " + courseId, null, HttpStatus.NOT_FOUND);
		}
	}
	
	//Get All Reviews of a particular mentor
		public ResponseEntity<?> getAllReviewsBymentorId(long mentorId) {
			Optional<User> mentor = userRepository.findById(mentorId);
			if(mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR) {
				List<ReviewsDto> reviews = reviewsRespository.findByMentorId(mentorId)
						.stream()
						.map(review -> new ReviewsDto(
								review.getId(), 
								review.getLearner().getProfilePic(), 
								review.getLearner().getName(), 
								review.getRating(), 
								review.getComment(), 
								review.getCreatedAt()))
						.toList();
				return responseWrapper.response("Following reviews found", reviews, HttpStatus.OK);
			} else {
				return responseWrapper.response("Mentor not found with id " + mentorId, null, HttpStatus.NOT_FOUND);
			}
		}
	
	//Add Review To Course
	public ResponseEntity<?> addReviewToCourse(Reviews review, long courseId, long learnerId) {
		Optional<User> learner = userRepository.findById(learnerId);
		Optional<Courses> course = coursesRepository.findById(courseId);
		if((learner.isPresent() && learner.get().getRole() == UserRole.LEARNER) && (course.isPresent())) {
			review.setLearner(learner.get());
			review.setCourse(course.get());
			reviewsRespository.save(review);
			Courses getCourse = course.get();
			getCourse.setAvgRating(reviewsRespository.findAvgRatingByCourseId(courseId));
			coursesRepository.save(getCourse);
			return responseWrapper.response("Review Added Successfully", review, HttpStatus.OK);
		} else {
			return responseWrapper.response("Learner or course not found", null, HttpStatus.NOT_FOUND);
		}
	}
	
}
