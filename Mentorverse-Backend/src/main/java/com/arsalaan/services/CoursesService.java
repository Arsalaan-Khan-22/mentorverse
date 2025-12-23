package com.arsalaan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.arsalaan.dto.learner.AllCourses;
import com.arsalaan.dto.learner.LearnerCourses;
import com.arsalaan.dto.mentor.CourseStatistics;
import com.arsalaan.dto.shared.MentorCourses;
import com.arsalaan.enums.UserRole;
import com.arsalaan.models.Courses;
import com.arsalaan.models.User;
import com.arsalaan.models.Videos;
import com.arsalaan.repositories.CategoryRepository;
import com.arsalaan.repositories.CoursesRepository;
import com.arsalaan.repositories.EnrollmentsRespository;
import com.arsalaan.repositories.ReviewsRespository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.repositories.VideoProgressRepository;
import com.arsalaan.repositories.VideosRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;
import com.arsalaan.specifications.CoursesSpecification;
import com.arsalaan.user.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CoursesService {

	private final CoursesRepository coursesRepository;
	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;
	private final EnrollmentsRespository enrollmentsRespository;
	private final ReviewsRespository reviewsRespository;
	private final VideosRepository videosRespository;
	private final VideoProgressRepository videoProgressRepository;
	private final MyResponseWrapper responseWrapper;
	
	
	//Function to check ownership
	private User getLoggedInUser() {
	    Object principal = SecurityContextHolder.getContext()
	            .getAuthentication()
	            .getPrincipal();

	    if (!(principal instanceof CustomUserDetails)) {
	        throw new RuntimeException("Unauthorized");
	    }

	    return ((CustomUserDetails) principal).getUser();
	}
	
	
	//Function To Calculate Total Hours Of Course
		private String getTotalHours(long courseId) {
			List<Videos> videos = videosRespository.findByCoursesIdOrderByVideoOrderAsc(courseId);
			int totalSeconds = videos.stream().mapToInt(video -> {
				String[] ts = video.getDurationMinute().split(":");
				return Integer.parseInt(ts[0]) * 60 + Integer.parseInt(ts[1]);
			}).sum();
//			String totalHours = totalSeconds / 3600 + ":" + (totalSeconds % 3600) / 60;
			return String.format("%d:%02d", totalSeconds / 3600, (totalSeconds % 3600) / 60);
		}
	
		
	//Get Courses of Specific Mentor
	public ResponseEntity<?> getCoursesByMentorId(long mentorId) {
		List<Courses> courses = coursesRepository.findAllByMentorIdOrderByCreatedAtDesc(mentorId);
		if(courses.isEmpty()) {
			return responseWrapper.response("There are no courses with mentor id " + mentorId, null, HttpStatus.NOT_FOUND);
		} else {
			List<MentorCourses> allCourses = courses.stream()
					.map(course -> (new MentorCourses(
							course,
							enrollmentsRespository.countByCoursesId(course.getId()),
							reviewsRespository.findAvgRatingByCourseId(course.getId()),
							reviewsRespository.countDistinctLearnerIdByCourseId(course.getId())
							))).toList();
			return responseWrapper.response("Following courses found with mentor id " + mentorId, allCourses, HttpStatus.OK);
		}
	}
	
	//Post New Course
	public ResponseEntity<?> createCourse(Courses course) {

	    User mentor = getLoggedInUser();

	    if (mentor.getRole() != UserRole.MENTOR) {
	        return responseWrapper.response("Access denied", null, HttpStatus.FORBIDDEN);
	    }

	    boolean isCategoryExist =
	            categoryRepository.existsById(course.getCategory().getId());

	    if (!isCategoryExist) {
	        return responseWrapper.response("Category Not Found", null, HttpStatus.NOT_FOUND);
	    }

	    course.setMentor(mentor);
	    coursesRepository.save(course);

	    return responseWrapper.response(
	            "Course added successfully",
	            course,
	            HttpStatus.OK
	    );
	}

	
	//Delete Course of Specific Mentor
	public ResponseEntity<?> deleteCourseById(long courseId) {

	    User mentor = getLoggedInUser();

	    Courses course = coursesRepository.findById(courseId)
	            .orElseThrow(() ->
	                new RuntimeException("Course not found")
	            );

	    if (course.getMentor().getId() != mentor.getId()) {
	        return responseWrapper.response(
	                "You are not allowed to delete this course",
	                null,
	                HttpStatus.FORBIDDEN
	        );
	    }

	    coursesRepository.delete(course);

	    return responseWrapper.response(
	            "Course deleted successfully",
	            null,
	            HttpStatus.OK
	    );
	}


	//Get Specific Course with Course Id
	public ResponseEntity<?> getCourseById(long courseId) {
		User user = getLoggedInUser();
		Optional<Courses> course = coursesRepository.findById(courseId);
		if(course.isPresent()) {
			MentorCourses courseDetails = new MentorCourses(
					course.get(), 
					enrollmentsRespository.countByCoursesId(courseId), 
					reviewsRespository.findAvgRatingByCourseId(courseId),
					reviewsRespository.countDistinctLearnerIdByCourseId(courseId),
					getTotalHours(courseId)
					);
			return responseWrapper.response("Following Course found with id " + courseId, courseDetails, HttpStatus.OK);
		} else {
			return responseWrapper.response("Course not found with id " + courseId, null, HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> getCourseStatisticsByCourseId(long courseId) {
		boolean isCourseExist = coursesRepository.existsById(courseId);
		if(isCourseExist) {
			CourseStatistics courseStatistics = new CourseStatistics(
					enrollmentsRespository.countByCoursesId(courseId),
					reviewsRespository.findAvgRatingByCourseId(courseId), 
					reviewsRespository.countDistinctLearnerIdByCourseId(courseId), 
					videosRespository.countByCoursesId(courseId)
				);			
			return responseWrapper.response("Following Course Statistics found with id " + courseId, courseStatistics, HttpStatus.OK);
		} else {
			return responseWrapper.response("Course not found with id " + courseId, null, HttpStatus.NOT_FOUND);
		}
	}

	//Update Course
	public ResponseEntity<?> updateCourseById(long courseId, Courses course) {

	    User mentor = getLoggedInUser();

	    Courses existingCourse = coursesRepository.findById(courseId)
	            .orElseThrow(() ->
	                new RuntimeException("Course not found")
	            );

	    if (existingCourse.getMentor().getId() != mentor.getId()) {
	        return responseWrapper.response(
	                "You are not allowed to update this course",
	                null,
	                HttpStatus.FORBIDDEN
	        );
	    }

	    course.setId(courseId);
	    course.setMentor(existingCourse.getMentor());
	    course.setCreatedAt(existingCourse.getCreatedAt());

	    coursesRepository.save(course);

	    return responseWrapper.response(
	            "Course updated successfully",
	            course,
	            HttpStatus.OK
	    );
	}

	
	//Get All Courses Enrolled by Learner
	public ResponseEntity<?> getCoursesEnrolledByLearnerId(long learnerId) {
		Optional<User> learner = userRepository.findById(learnerId);
		if(learner.isPresent() && learner.get().getRole() == UserRole.LEARNER) {
			List<LearnerCourses> courses = enrollmentsRespository.findByLearnerId(learnerId)
					.stream()
					.map(enrollment -> {
					    long courseId = enrollment.getCourses().getId();

					    long totalVideos = videosRespository.countByCoursesId(courseId);
					    long completedVideos =
					        videoProgressRepository.countByLearnerIdAndVideoCoursesId(
					            learnerId, courseId
					        );

					    return new LearnerCourses(
					        courseId,
					        enrollment.getCourses().getThumbnail(),
					        enrollment.getCourses().getCategory().getName(),
					        enrollment.getCourses().getTitle(),
					        enrollment.getCourses().getMentor().getName(),
					        totalVideos,
					        completedVideos
					    );
					})

					.toList();
			return responseWrapper.response("Following Courses found with learner id " + learnerId, courses, HttpStatus.OK);
		} else {
			return responseWrapper.response("Learner not found with id " + learnerId, null, HttpStatus.NOT_FOUND);
		}
	}
	
	
	//Get All Courses
//	public ResponseEntity<?> getAllCourses() {
//		
//		List<AllCourses> courses = coursesRepository.findAll()
//				.stream()
//				.map((course) -> (new AllCourses(
//						course.getId(), 
//						course.getThumbnail(),
//						course.getCategory().getName(),
//						reviewsRespository.findAvgRatingByCourseId(course.getId()),
//						reviewsRespository.countDistinctLearnerIdByCourseId(course.getId()),
//						course.getTitle(), 
//						course.getMentor().getProfilePic(), 
//						course.getMentor().getName(), 
//						course.getDescription(), 
//						enrollmentsRespository.countByCoursesId(course.getId()), 
//						getTotalHours(course.getId()),
//						course.getLevel(),
//						course.getPrice())))
//				.toList();
//		
//			return responseWrapper.response("Following courses found ", courses, HttpStatus.OK);
//	}
	
	
//	public ResponseEntity<?> getAllCourses(String search, String category, String sortBy, String level) {
//		
//		Specification<Courses> spec = Specification.where(CoursesSpecification.titleOrMentorNameOrSkillContains(search))
//													.and(CoursesSpecification.hasCategory(category))
//													.and(CoursesSpecification.sortby(sortBy))
//													.and(CoursesSpecification.hasLevel(level));
//		
////		List<Courses> allCourses = coursesRepository.findAll(spec);
//		
////		 Pageable pageable = PageRequest.of(page, size); 
////		    Page<Courses> coursesPage = coursesRepository.findAll(spec, pageable);
//		
//		List<AllCourses> courses = allCourses
//				.stream()
//				.map((course) -> (new AllCourses(
//						course.getId(), 
//						course.getThumbnail(),
//						course.getCategory().getName(),
//						reviewsRespository.findAvgRatingByCourseId(course.getId()),
//						reviewsRespository.countDistinctLearnerIdByCourseId(course.getId()),
//						course.getTitle(), 
//						course.getMentor().getProfilePic(), 
//						course.getMentor().getName(), 
//						course.getDescription(), 
//						enrollmentsRespository.countByCoursesId(course.getId()), 
//						getTotalHours(course.getId()),
//						course.getLevel(),
//						course.getPrice())))
//				.toList();
//		
//			return responseWrapper.response("Following courses found ", courses, HttpStatus.OK);
//	}
	
	
	
public ResponseEntity<?> getAllCourses(String search, String category, String sortBy, String level, int page, int size) {
		
		Specification<Courses> spec = Specification.where(CoursesSpecification.titleOrMentorNameOrSkillContains(search))
													.and(CoursesSpecification.hasCategory(category))
													.and(CoursesSpecification.sortby(sortBy))
													.and(CoursesSpecification.hasLevel(level));
		
//		List<Courses> allCourses = coursesRepository.findAll(spec);
		
		 Pageable pageable = PageRequest.of(page, size); 
		    Page<Courses> coursesPage = coursesRepository.findAll(spec, pageable);
		
		    List<AllCourses> courses = coursesPage.getContent()
		            .stream()
		            .map(course -> new AllCourses(
		                    course.getId(), 
		                    course.getThumbnail(),
		                    course.getCategory().getName(),
		                    reviewsRespository.findAvgRatingByCourseId(course.getId()),
		                    reviewsRespository.countDistinctLearnerIdByCourseId(course.getId()),
		                    course.getTitle(), 
		                    course.getMentor().getProfilePic(), 
		                    course.getMentor().getName(), 
		                    course.getDescription(), 
		                    enrollmentsRespository.countByCoursesId(course.getId()), 
		                    getTotalHours(course.getId()),
		                    course.getLevel(),
		                    course.getPrice()))
				.toList();
		
			return responseWrapper.response("Following courses found ", coursesPage, HttpStatus.OK);
	}
}
