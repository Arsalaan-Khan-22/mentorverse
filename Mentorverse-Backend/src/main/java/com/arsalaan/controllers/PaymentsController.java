//package com.arsalaan.controllers;
//
//import java.util.Map;
//
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.arsalaan.dto.learner.CreateOrderRequest;
//import com.arsalaan.dto.learner.VerifyPaymentRequest;
//import com.arsalaan.responseWrapper.MyResponseWrapper;
//import com.arsalaan.services.PaymentsService;
//import com.razorpay.Order;
//import com.razorpay.RazorpayException;
//
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@RequestMapping("/api/payments")
//@CrossOrigin(origins = "https://mentorverse.netlify.app")
//public class PaymentsController {
//
//    @Autowired
//    private PaymentsService paymentsService;
//
//    @PostMapping("/create-order")
//    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest request) {
//        try {
//            return ResponseEntity.ok(
//                paymentsService.createOrderForSlot(request)
//            );
//        } catch (Exception e) {
//        	e.printStackTrace(); 
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Unable to create payment order");
//        }
//    }
//    
//    @PostMapping("/verify")
//    public ResponseEntity<?> verifyPaymentAndBook(
//            @RequestBody VerifyPaymentRequest request) {
//
//        paymentsService.verifyAndBookSlot(request);
//        return ResponseEntity.ok("Payment verified & slot booked");
//    }
//
//}
