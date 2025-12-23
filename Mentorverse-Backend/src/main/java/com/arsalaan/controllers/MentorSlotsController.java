//package com.arsalaan.controllers;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.arsalaan.services.MentorSlotsService;
//
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@RequestMapping("/api")
//@RequiredArgsConstructor
//@CrossOrigin
//public class MentorSlotsController {
//
//	private final MentorSlotsService mentorSlotsService;
//	
//	@GetMapping("/slots/mentor/{mentorId}")
//	public ResponseEntity<?> getAllSlotsByMentorId(@PathVariable long mentorId) {
//		return mentorSlotsService.getAllSlotsByMentorId(mentorId);
//	}
//	
//}





package com.arsalaan.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.arsalaan.dto.shared.MentorSlotsDto;
import com.arsalaan.models.MentorSlots;
import com.arsalaan.services.MentorSlotsService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://mentorverse.netlify.app")
public class MentorSlotsController {

    private final MentorSlotsService mentorSlotsService;

    @GetMapping("/slots/mentor/{mentorId}")
    public ResponseEntity<?> getAllSlotsByMentorId(@PathVariable long mentorId) {
        return mentorSlotsService.getAllSlotsByMentorId(mentorId);
    }

    @PostMapping("/slots/mentor/{mentorId}")
    public ResponseEntity<?> addSlot(@PathVariable long mentorId, @RequestBody MentorSlots mentorSlot) {
        return mentorSlotsService.addSlot(mentorId, mentorSlot);
    }

    @DeleteMapping("/slots/{slotId}")
    public ResponseEntity<?> deleteSlot(@PathVariable long slotId) {
        return mentorSlotsService.deleteSlot(slotId);
    }
}
