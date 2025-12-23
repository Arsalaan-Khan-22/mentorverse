//package com.arsalaan.services;
//
//import org.apache.commons.codec.digest.HmacUtils;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import com.arsalaan.dto.learner.CreateOrderRequest;
//import com.arsalaan.dto.learner.VerifyPaymentRequest;
//import com.arsalaan.models.MentorSlots;
//import com.arsalaan.repositories.MentorSlotsRepository;
//import com.razorpay.Order;
//import com.razorpay.RazorpayClient;
//import com.razorpay.RazorpayException;
//
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class PaymentsService {
//
//    @Value("${razorpay.key_id}")
//    private String razorpayKeyId;
//
//    @Value("${razorpay.key_secret}")
//    private String razorpayKeySecret;
//
//    private final MentorSlotsRepository mentorSlotsRepository;
//    private final BookingsService bookingsService;
//
//    public Order createOrderForSlot(CreateOrderRequest request) throws RazorpayException {
//
//        MentorSlots slot = mentorSlotsRepository.findById(request.getSlotId())
//                .orElseThrow(() -> new RuntimeException("Slot not found"));
//
////        if (!slot.isAvailable()) {
////            throw new RuntimeException("Slot already booked");
////        }
//
//        RazorpayClient client = new RazorpayClient(
//                razorpayKeyId, razorpayKeySecret
//        );
//
//        JSONObject options = new JSONObject();
//        options.put("amount", slot.getMentor().getRatePerHour() * 100);
//        options.put("currency", "INR");
//        options.put("receipt", "slot_" + slot.getId());
//        options.put("payment_capture", 1);
//
//        JSONObject notes = new JSONObject();
//        notes.put("slotId", slot.getId());
//        notes.put("mentorId", request.getMentorId());
//        notes.put("learnerId", request.getLearnerId());
//
//        options.put("notes", notes);
//
//        return client.orders.create(options);
//    }
//    
//    @Transactional
//    public void verifyAndBookSlot(VerifyPaymentRequest request) {
//
//        String payload = request.getRazorpayOrderId()
//                + "|" + request.getRazorpayPaymentId();
//
//        String generatedSignature = HmacUtils.hmacSha256Hex(
//                razorpayKeySecret, payload
//        );
//
//        if (!generatedSignature.equals(request.getRazorpaySignature())) {
//            throw new RuntimeException("Invalid payment signature");
//        }
//
//        MentorSlots slot = mentorSlotsRepository
//                .findById(request.getSlotId())
//                .orElseThrow();
//
////        if (!slot.isAvailable()) {
////            throw new RuntimeException("Slot already booked");
////        }
//
//        
//        slot.setAvailable(false);
//        mentorSlotsRepository.save(slot);
//
//     
//        bookingsService.bookSlot(
//                request.getLearnerId(),
//                request.getMentorId(),
//                slot
//        );
//    }
//
//}
//
