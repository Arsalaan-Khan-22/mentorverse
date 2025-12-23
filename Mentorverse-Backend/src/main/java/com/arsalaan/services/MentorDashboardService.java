package com.arsalaan.services;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arsalaan.dto.mentor.MentorDashboardStats;
import com.arsalaan.dto.mentor.RecentCourseDetails;
import com.arsalaan.dto.shared.UpcomingSessions;
import com.arsalaan.enums.UserRole;
import com.arsalaan.models.Bookings;
import com.arsalaan.models.User;
import com.arsalaan.repositories.BookingsRepository;
import com.arsalaan.repositories.CoursesRepository;
import com.arsalaan.repositories.EnrollmentsRespository;
import com.arsalaan.repositories.PaymentsRespository;
import com.arsalaan.repositories.ReviewsRespository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MentorDashboardService {

	private final CoursesRepository coursesRepository;
	private final UserRepository userRepository;
	private final PaymentsRespository paymentsRespository;
	private final BookingsRepository bookingsRepository;
	private final EnrollmentsRespository enrollmentsRespository;
	private final ReviewsRespository reviewsRespository;
	private final MyResponseWrapper responseWrapper;
	
	//Get Dashboard Stats
	public ResponseEntity<?> getAllDashboardStats(long mentorId) {
		Optional<User> mentor = userRepository.findById(mentorId);
		if(mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR) {
			String mentorName = mentor.get().getName();
			long courseCount = coursesRepository.countByMentorId(mentorId);
			long totalLearners = userRepository.countUniqueLearnersByMentorId(mentorId);
			double totalBookingAmount = paymentsRespository.countTotalBookingAmount(mentorId);
			double totalEnrollmentAmount = paymentsRespository.countTotalEnrollmentAmount(mentorId);
			double totalEarnings = totalBookingAmount + totalEnrollmentAmount;
			long upcomingSessionsCount = bookingsRepository.countUpcomingSessionsByMentorId(mentorId);
			
			
			MentorDashboardStats dashboardStats = new MentorDashboardStats(mentorName, courseCount, totalLearners, totalEarnings, upcomingSessionsCount);
			return responseWrapper.response("Following Data Aggregated", dashboardStats, HttpStatus.OK);			
		} else {
			return responseWrapper.response("There is no mentor with id " + mentorId, null, HttpStatus.NOT_FOUND);
		}
	}
	
	
	//Get Recent Course Information
	public ResponseEntity<?> getRecentCourseDetails(long mentorId) {
		
		List<RecentCourseDetails> recentCourses = coursesRepository.findTop3ByMentorIdOrderByCreatedAtDesc(mentorId)
				.stream()
				.map(course -> (new RecentCourseDetails(course.getTitle(), 
							enrollmentsRespository.countByCoursesId(course.getId()), 
							reviewsRespository.findAvgRatingByCourseId(course.getId()), 
							paymentsRespository.findSumOfAmountByCourseId(course.getId()))
					))
				.toList();
		
		
		if(!recentCourses.isEmpty()) {
			return responseWrapper.response("Following Data Aggregated", recentCourses, HttpStatus.OK);			
		} else {
			return responseWrapper.response("No course found with mentor id " + mentorId, null, HttpStatus.NOT_FOUND);		
		}
	}
	
	//Get Upcoming Session Information
	public ResponseEntity<?> getUpcomingSessionDetails(long mentorId) {
		Optional<User> mentor = userRepository.findById(mentorId);
		if(mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR) {
			List<UpcomingSessions> allBookings = bookingsRepository.findUpcomingSessionsByMentorId(mentorId)
					.stream()
					.map(booking -> (new UpcomingSessions(
							booking.getId(),
							booking.getLearner().getName(), 
							booking.getSlotDate(), booking.getSlotTime()
							)))
					.toList();
			
			if(!allBookings.isEmpty()) {
				return responseWrapper.response("Following Data Aggregated", allBookings, HttpStatus.OK);			
			} else {
				return responseWrapper.response("No booking found with mentor id " + mentorId, allBookings, HttpStatus.NOT_FOUND);		
			}			
		} else {
			return responseWrapper.response("No mentor found with id " + mentorId, null, HttpStatus.NOT_FOUND);		
		}
						
	}
	
}
