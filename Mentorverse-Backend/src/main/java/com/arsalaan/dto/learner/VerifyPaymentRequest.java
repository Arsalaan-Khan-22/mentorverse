package com.arsalaan.dto.learner;

import lombok.Data;

@Data
public class VerifyPaymentRequest {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private Long slotId;
    private Long mentorId;
    private Long learnerId;
}
