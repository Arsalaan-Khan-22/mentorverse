package com.arsalaan.services;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.arsalaan.dto.shared.BookingRequests;
import com.arsalaan.enums.BookingStatus;
import com.arsalaan.enums.UserRole;
import com.arsalaan.models.Bookings;
import com.arsalaan.models.Courses;
import com.arsalaan.models.MentorSlots;
import com.arsalaan.models.User;
import com.arsalaan.repositories.BookingsRepository;
import com.arsalaan.repositories.MentorSlotsRepository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;
import com.arsalaan.user.CustomUserDetails;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingsService {

	private final BookingsRepository bookingsRepository;
	
	private final UserRepository userRepository;
	
	private final MentorSlotsRepository mentorSlotsRepository;
	
	private final EmailService emailService;
	
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
		
		
	// Add booking
	public ResponseEntity<?> bookSession(Bookings bookings) {
    User learner = getLoggedInUser();
    if (learner.getRole() != UserRole.LEARNER) {
        return responseWrapper.response("Only learners can book sessions", null, HttpStatus.FORBIDDEN);
    }

    Optional<User> mentorOpt = userRepository.findById(bookings.getMentor().getId());
    if (mentorOpt.isEmpty() || mentorOpt.get().getRole() != UserRole.MENTOR) {
        return responseWrapper.response("Invalid mentor", null, HttpStatus.NOT_FOUND);
    }

    User mentor = mentorOpt.get();

    bookings.setLearner(learner);
    bookings.setMentor(mentor);
    bookings.setStatus(BookingStatus.ACTIVE);

    bookingsRepository.save(bookings);

    return responseWrapper.response("Booking request sent to mentor", bookings, HttpStatus.OK);
}


	// Update booking status
//	public ResponseEntity<?> manageBooking(long id, Bookings booking) {
//		boolean isBookingExists = bookingsRepository.existsById(id);
//		if(isBookingExists) 
//		{
//			Bookings bookedSession = bookingsRepository.findById(id).get();
//			bookedSession.setStatus(booking.getStatus());
//			bookingsRepository.save(bookedSession);
//			return responseWrapper.response("Status updated successfully", bookedSession, HttpStatus.OK);
//		}
//		else
//		{
//			return responseWrapper.response("There is no booking with the id " + id, null, HttpStatus.NOT_FOUND);
//		}
//	}
	public ResponseEntity<?> manageBooking(long id, BookingStatus status) {
		boolean isBookingExists = bookingsRepository.existsById(id);
		if(isBookingExists) 
		{
			Bookings bookedSession = bookingsRepository.findById(id).get();
			bookedSession.setStatus(status);
			bookingsRepository.save(bookedSession);
			return responseWrapper.response("Status updated successfully", bookedSession, HttpStatus.OK);
		}
		else
		{
			return responseWrapper.response("There is no booking with the id " + id, null, HttpStatus.NOT_FOUND);
		}
	}
	
	// Get all bookings
	public ResponseEntity<?> getAllBookingsByLearner(long learnerId) {
		Optional<User> learner = userRepository.findById(learnerId);
		if(learner.isPresent() && learner.get().getRole().name() == "LEARNER")
		{
			List<Bookings> bookings = bookingsRepository.findByLearnerId(learnerId);
	        updateCompletedBookings(bookings);
			
			List<BookingRequests> bookingList = bookingsRepository.findByLearnerId(learnerId)
					.stream()
					.map(request -> new BookingRequests(
							request.getId(),
							request.getMentor().getProfilePic(), 
							request.getMentor().getName(), 
							request.getSlotDate(), 
							request.getSlotTime(),  
							request.getPrice(), 
							request.getStatus()))
					.toList();
			return responseWrapper.response("Following are all the bookings with learner id " + learnerId, bookingList, HttpStatus.OK);
		}
		else 
		{
			return responseWrapper.response("No learner found with id " + learnerId, null, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<?> getAllBookingsOfMentor(long mentorId) {
		Optional<User> mentor = userRepository.findById(mentorId);
		if(mentor.isPresent() && mentor.get().getRole().name() == "MENTOR") 
		{
			List<Bookings> bookings = bookingsRepository.findByMentorId(mentorId);
	        updateCompletedBookings(bookings);
			
			List<BookingRequests> bookingList = bookingsRepository.findByMentorId(mentorId)
					.stream()
					.map(request -> new BookingRequests(
							request.getId(),
							request.getLearner().getProfilePic(), 
							request.getLearner().getName(), 
							request.getSlotDate(), 
							request.getSlotTime(),  
							request.getPrice(), 
							request.getStatus()))
					.toList();
			return responseWrapper.response("Following are all the bookings with mentor id " + mentorId, bookingList, HttpStatus.OK);
		}
		else
		{
			return responseWrapper.response("No mentor found with id " + mentorId, null, HttpStatus.NOT_FOUND);
		}
	}
	
	// Cancel Booking
	public ResponseEntity<?> cancelBooking(long bookingId) {
	    User user = getLoggedInUser();

	    // Retrieve the booking by ID
	    Bookings booking = bookingsRepository.findById(bookingId)
	            .orElseThrow(() -> new RuntimeException("Booking not found"));

	    // Learner can cancel their own bookings
	    if (user.getRole() == UserRole.LEARNER && booking.getLearner().getId() != user.getId()) {
	        return responseWrapper.response("Access denied", null, HttpStatus.FORBIDDEN);
	    }

	    // Set the status of the booking to CANCELLED
//	    booking.setStatus(BookingStatus.CANCELLED);
//	    bookingsRepository.save(booking);
	    
	    bookingsRepository.deleteById(bookingId);


	    return responseWrapper.response("Booking cancelled with id " + bookingId, booking, HttpStatus.OK);
	}


	
	public ResponseEntity<?> getBookingByLearnerIdAndMentorId(long learnerId, long mentorId) {
		Optional<User> learner = userRepository.findById(learnerId);
		Optional<User> mentor = userRepository.findById(mentorId);
		if((learner.isPresent() && learner.get().getRole() == UserRole.LEARNER) 
				&& (mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR)) {
			long isLearnerBookedSession = bookingsRepository.countByLearnerIdAndMentorId(learnerId, mentorId);
			return responseWrapper.response("Learner booking count", isLearnerBookedSession, HttpStatus.OK);
		} else {
			return responseWrapper.response("Learner or Mentor not found", null, HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<?> bookSlot(long learnerId, long mentorId, MentorSlots slot) {
		Optional<User> learner = userRepository.findById(learnerId);
		Optional<User> mentor = userRepository.findById(mentorId);
		if((learner.isPresent() && learner.get().getRole() == UserRole.LEARNER)
				&& (mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR)) {
			
			MentorSlots savedSlot = mentorSlotsRepository.findById(slot.getId()).get();
				
				LocalDate today = LocalDate.now();
				DayOfWeek todayDay = today.getDayOfWeek();
				
				DayOfWeek selectedDay = DayOfWeek.valueOf(slot.getDayOfWeek().name());
				LocalDate nextDate = today.with(TemporalAdjusters.next(selectedDay));
				
				LocalDate bookingDate;
				
				if(slot.getDayOfWeek().equals(todayDay) && LocalTime.now().isBefore(slot.getStartTime())) {
					bookingDate = today;
				} else {
					bookingDate = nextDate;
				}
				
//				if(bookingsRepository.existsBySlotAndSlotDate(savedSlot, bookingDate))
//					return responseWrapper.response("The slot is already booked", null, HttpStatus.FOUND);
				
				if (bookingsRepository.existsBySlot_IdAndSlotDate(
				        savedSlot.getId(),
				        bookingDate
				)) {
				    return responseWrapper.response(
				        "The slot is already booked",
				        null,
				        HttpStatus.FOUND
				    );
				}
				
//				slot.setAvailable(true);
//				savedSlot.setMentor(mentor.get());
				
				Bookings booking = new Bookings();
				booking.setLearner(learner.get());
				booking.setMentor(mentor.get());
				booking.setSlot(savedSlot);
				booking.setSlotDate(bookingDate);
				booking.setSlotTime(slot.getStartTime());
				booking.setStatus(BookingStatus.ACTIVE);
				booking.setPrice(mentor.get().getRatePerHour());

				// Generate meeting link (temporary / Zoom placeholder)
				String meetingLink = "https://zoom.us/j/" + java.util.UUID.randomUUID();
				booking.setMeetingLink(meetingLink);

				Bookings savedBooking = bookingsRepository.save(booking);

				// Send email to learner
				emailService.sendBookingMail(
				    learner.get().getEmail(),
				    learner.get().getName(),
				    mentor.get().getName(),
				    bookingDate,
				    slot.getStartTime(),
				    meetingLink
				);
				
				

				return responseWrapper.response(
				    "Slot Booked Successfully",
				    savedBooking,
				    HttpStatus.OK
				);

			} else {
				return responseWrapper.response("Learner or Mentor not found", null, HttpStatus.NOT_FOUND);
			}
		}
	
	
	// Helper method to update completed status after the date or time has passed
	private void updateCompletedBookings(List<Bookings> bookings) {
	    LocalDate today = LocalDate.now();
	    LocalTime now = LocalTime.now();

	    for (Bookings booking : bookings) {
	        if (booking.getStatus() == BookingStatus.ACTIVE) {

	            LocalDate slotDate = booking.getSlotDate();
	            LocalTime endTime = booking.getSlotTime().plusMinutes(60); // duration

	            if (
	                slotDate.isBefore(today) ||
	                (slotDate.isEqual(today) && now.isAfter(endTime))
	            ) {
	                booking.setStatus(BookingStatus.COMPLETED);
	                bookingsRepository.save(booking);
	            }
	        }
	    }
	}
};