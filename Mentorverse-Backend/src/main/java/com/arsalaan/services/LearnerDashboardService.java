package com.arsalaan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arsalaan.dto.learner.LearnerDashboardCourses;
import com.arsalaan.dto.learner.LearnerDashboardStats;
import com.arsalaan.dto.shared.UpcomingSessions;
import com.arsalaan.enums.UserRole;
import com.arsalaan.models.User;
import com.arsalaan.repositories.BookingsRepository;
import com.arsalaan.repositories.EnrollmentsRespository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LearnerDashboardService {

	private final UserRepository userRepository;
	private final BookingsRepository bookingsRepository;
	private final EnrollmentsRespository enrollmentsRespository;
	private final MyResponseWrapper responseWrapper;
	
	// Get Dashboard stats
	public ResponseEntity<?> getAllDashboardStats(long learnerId) {
		Optional<User> learner = userRepository.findById(learnerId);
		
		if(learner.isPresent() && learner.get().getRole() == UserRole.LEARNER) {
			String learnerName = learner.get().getName();
			long upcomingSessionsCount = bookingsRepository.countUpcomingSessionByLearnerId(learnerId);
			long enrolledCoursesCount = enrollmentsRespository.countByLearnerId(learnerId);
			long mentorsCount = bookingsRepository.countMentorsByLearnerId(learnerId);
			long totalSessionsCount = bookingsRepository.countCompletedBookingsByLearnerId(learnerId);
			
			LearnerDashboardStats dashboardStats = new LearnerDashboardStats(learnerName, upcomingSessionsCount, enrolledCoursesCount, 
					mentorsCount, totalSessionsCount);
			
			return responseWrapper.response("Following Data Aggregated", dashboardStats, HttpStatus.OK);
		} else {
			return responseWrapper.response("There is no learner with id " + learnerId, learner, HttpStatus.NOT_FOUND);
		}
	}

	
	//Get Upcoming Session Information
		public ResponseEntity<?> getUpcomingSessionDetails(long learnerId) {
			Optional<User> learner = userRepository.findById(learnerId);
			if(learner.isPresent() && learner.get().getRole() == UserRole.LEARNER) {
				List<UpcomingSessions> allBookings = bookingsRepository.findUpcomingSessionsByLearnerId(learnerId)
						.stream()
						.map(booking -> (new UpcomingSessions(
								booking.getId(),
								booking.getMentor().getName(), 
								booking.getSlotDate(), 
								booking.getSlotTime()
								)))
						.toList();
				
				if(!allBookings.isEmpty()) {
					return responseWrapper.response("Following Data Aggregated", allBookings, HttpStatus.OK);			
				} else {
					return responseWrapper.response("No booking found with learner id " + learnerId, allBookings, HttpStatus.NOT_FOUND);		
				}				
			} else {
				return responseWrapper.response("No learner found with id " + learnerId, null, HttpStatus.NOT_FOUND);	
			}
							
		}


		public ResponseEntity<?> getTop3CoursesByLearnerId(long learnerId) {
			Optional<User> learner = userRepository.findById(learnerId);
			if(learner.isPresent() && learner.get().getRole() == UserRole.LEARNER) {
				List<LearnerDashboardCourses> enrollments = enrollmentsRespository.findTop3ByLearnerId(learnerId)
						.stream()
						.map(enrollment -> new LearnerDashboardCourses(
								enrollment.getCourses().getId(),
								enrollment.getCourses().getThumbnail(), 
								enrollment.getCourses().getTitle(), 
								enrollment.getCourses().getMentor().getName()))
						.toList();
				return responseWrapper.response("Following data aggregated", enrollments, HttpStatus.OK);	
			} else {
				return responseWrapper.response("No learner found with id " + learnerId, null, HttpStatus.NOT_FOUND);	
			}
		}
	
}
