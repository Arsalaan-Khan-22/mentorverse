//package com.arsalaan.services;
//
//import java.time.DayOfWeek;
//import java.time.LocalDate;
//import java.time.LocalTime;
//import java.time.temporal.TemporalAdjusters;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import com.arsalaan.dto.shared.MentorSlotsDto;
//import com.arsalaan.enums.UserRole;
//import com.arsalaan.enums.WeekDay;
//import com.arsalaan.models.MentorSlots;
//import com.arsalaan.models.User;
//import com.arsalaan.repositories.BookingsRepository;
//import com.arsalaan.repositories.MentorSlotsRepository;
//import com.arsalaan.repositories.UserRepository;
//import com.arsalaan.responseWrapper.MyResponseWrapper;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class MentorSlotsService {
//
//	private final MentorSlotsRepository mentorSlotsRepository;
//	private final UserRepository userRepository;
//	private final BookingsRepository bookingsRepository;
//	private final MyResponseWrapper responseWrapper;
//	
//	public ResponseEntity<?> getAllSlotsByMentorId(long mentorId) {
//		Optional<User> mentor = userRepository.findById(mentorId);
//		if(mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR) {
//			
//			List<MentorSlots> slots = mentorSlotsRepository.findByMentorId(mentorId);
//			
//			LocalDate today = LocalDate.now();
//			LocalTime now = LocalTime.now();
//			DayOfWeek todayDay = today.getDayOfWeek();
//			
//			for(MentorSlots slot : slots) {
//				DayOfWeek slotDay = DayOfWeek.valueOf(slot.getDayOfWeek().name());
//				LocalDate nextDate;
//				
//				if(slotDay.equals(todayDay) && now.isBefore(slot.getStartTime())) {
//					nextDate = today;
//				} else {
//					nextDate = today.with(TemporalAdjusters.next(slotDay));
//				}
//				
//				boolean booked = bookingsRepository.existsBySlotAndSlotDate(slot, nextDate);
//				
//				slot.setAvailable(!booked);
//			}
//			
//			List<MentorSlotsDto> allSlots = slots
//					.stream()
//					.map(slot -> new MentorSlotsDto(slot.getId(), slot.getDayOfWeek(), slot.getStartTime(), slot.getEndTime(), slot.isAvailable()))
//					.toList();
//			return responseWrapper.response("Following slots found for mentor id " + mentorId, allSlots, HttpStatus.OK);
//		} else {
//			return responseWrapper.response("Mentor not found with id " + mentorId, null, HttpStatus.NOT_FOUND);
//		}
//	}
//}



package com.arsalaan.services;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arsalaan.dto.shared.MentorSlotsDto;
import com.arsalaan.enums.BookingStatus;
import com.arsalaan.enums.UserRole;
import com.arsalaan.models.MentorSlots;
import com.arsalaan.models.User;
import com.arsalaan.repositories.BookingsRepository;
import com.arsalaan.repositories.MentorSlotsRepository;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MentorSlotsService {

    private final MentorSlotsRepository mentorSlotsRepository;
    private final UserRepository userRepository;
    private final BookingsRepository bookingsRepository;
    private final MyResponseWrapper responseWrapper;

    // Get all slots for mentor by mentorId
    public ResponseEntity<?> getAllSlotsByMentorId(long mentorId) {
		Optional<User> mentor = userRepository.findById(mentorId);
		if(mentor.isPresent() && mentor.get().getRole() == UserRole.MENTOR) {
			
			List<MentorSlots> slots = mentorSlotsRepository.findByMentorId(mentorId);
			
			LocalDate today = LocalDate.now();
			LocalTime now = LocalTime.now();
			DayOfWeek todayDay = today.getDayOfWeek();
			
			for(MentorSlots slot : slots) {
				DayOfWeek slotDay = DayOfWeek.valueOf(slot.getDayOfWeek().name());
				LocalDate nextDate;
				
				if(slotDay.equals(todayDay) && now.isBefore(slot.getStartTime())) {
					nextDate = today;
				} else {
					nextDate = today.with(TemporalAdjusters.next(slotDay));
				}
				
//				boolean booked = bookingsRepository.existsBySlotAndSlotDate(slot, nextDate);
//				
//					slot.setAvailable(!booked);	
				
				boolean booked = bookingsRepository
				        .existsBySlot_IdAndSlotDate(slot.getId(), nextDate);
				
				boolean book = bookingsRepository.existsBySlotId(slot.getId());

				slot.setAvailable(!book);
//				slot.setIsBooked(booked);

			}
			
			List<MentorSlotsDto> allSlots = slots
					.stream()
					.map(slot -> new MentorSlotsDto(slot.getId(), slot.getDayOfWeek(), slot.getStartTime(), slot.getEndTime(), slot.isAvailable()))
					.toList();
			return responseWrapper.response("Following slots found for mentor id " + mentorId, allSlots, HttpStatus.OK);
		} else {
			return responseWrapper.response("Mentor not found with id " + mentorId, null, HttpStatus.NOT_FOUND);
		}
	}

    // Add a new slot for mentor
    public ResponseEntity<?> addSlot(long mentorId, MentorSlots mentorSlot) {
        Optional<User> mentor = userRepository.findById(mentorId);
        if (mentor.isEmpty() || mentor.get().getRole() != UserRole.MENTOR) {
            return responseWrapper.response("Mentor not found with id " + mentorId, null, HttpStatus.NOT_FOUND);
        }

        LocalTime start = mentorSlot.getStartTime();
        LocalTime end = mentorSlot.getEndTime();
        if (end.isBefore(start)) {
            return responseWrapper.response("End time cannot be before start time", null, HttpStatus.BAD_REQUEST);
        }

//        if (start.until(end, java.time.temporal.ChronoUnit.HOURS) < 1 || start.until(end, java.time.temporal.ChronoUnit.HOURS) > 1) {
//            return responseWrapper.response("Slot duration must be 1 hour only", null, HttpStatus.BAD_REQUEST);
//        }
        
        long minutes = java.time.Duration.between(start, end).toMinutes();
        if (minutes != 60) {
            return responseWrapper.response("Slot duration must be exactly 1 hour", null, HttpStatus.BAD_REQUEST);
        }

        List<MentorSlots> existingSlots = mentorSlotsRepository.findByMentorIdAndDayOfWeekAndStartTimeAndEndTime(
            mentorId, mentorSlot.getDayOfWeek(), mentorSlot.getStartTime(), mentorSlot.getEndTime());

        if (!existingSlots.isEmpty()) {
            return responseWrapper.response("Slot already exists for the selected time", null, HttpStatus.BAD_REQUEST);
        }

        mentorSlot.setMentor(mentor.get());
        mentorSlotsRepository.save(mentorSlot);

        return responseWrapper.response("Slot added successfully", mentorSlot, HttpStatus.OK);
    }

    // Delete slot by slotId
    public ResponseEntity<?> deleteSlot(long slotId) {
        Optional<MentorSlots> slot = mentorSlotsRepository.findById(slotId);
        if (slot.isEmpty()) {
            return responseWrapper.response("Slot not found with id " + slotId, null, HttpStatus.NOT_FOUND);
        }

        mentorSlotsRepository.delete(slot.get());
        return responseWrapper.response("Slot deleted successfully", null, HttpStatus.OK);
    }
}

