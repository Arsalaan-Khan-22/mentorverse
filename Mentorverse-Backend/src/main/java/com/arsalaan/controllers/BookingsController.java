package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arsalaan.enums.BookingStatus;
import com.arsalaan.models.Bookings;
import com.arsalaan.models.MentorSlots;
import com.arsalaan.models.User;
import com.arsalaan.services.BookingsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class BookingsController {

	private final BookingsService bookingsService;
	
//	@PostMapping("/bookings")
//	public ResponseEntity<?> bookSession(@RequestBody Bookings bookings) {
//		return bookingsService.bookSession(bookings);
//	}
//	
//	@PutMapping("/bookings/status/{id}")
//	public ResponseEntity<?> manageBooking(@PathVariable long id, @RequestBody Bookings booking) {
//		return bookingsService.manageBooking(id, booking);
//	}
	@PutMapping("/bookings/status/{id}")
	public ResponseEntity<?> manageBooking(@PathVariable long id, @RequestBody BookingStatus status) {
		return bookingsService.manageBooking(id, status);
	}
	
	@GetMapping("/bookings/learner/{learnerId}")
	public ResponseEntity<?> getAllBookingsByLearner(@PathVariable long learnerId) {
		return bookingsService.getAllBookingsByLearner(learnerId);
	}
	
	@GetMapping("/bookings/mentor/{mentorId}")
	public ResponseEntity<?> getAllBookingsOfMentor(@PathVariable long mentorId) {
		return bookingsService.getAllBookingsOfMentor(mentorId);
	}
	
	@PutMapping("/bookings/cancel-session/{userId}")
	public ResponseEntity<?> cancelBooking(@PathVariable long userId, @RequestBody long bookingId) {
		return bookingsService.cancelBooking(bookingId);
	}
	
	@GetMapping("/bookings/learner/{learnerId}/mentor/{mentorId}")
	public ResponseEntity<?> getBookingByLearnerIdAndMentorId(@PathVariable long learnerId, @PathVariable long mentorId) {
		return bookingsService.getBookingByLearnerIdAndMentorId(learnerId, mentorId);
	}
	
	
	@PostMapping("/bookings/learner/{learnerId}/mentor/{mentorId}")
	public ResponseEntity<?> bookSlot(@PathVariable long learnerId, @PathVariable long mentorId, @RequestBody MentorSlots slot) {
		return bookingsService.bookSlot(learnerId, mentorId, slot);
	}
	
}
