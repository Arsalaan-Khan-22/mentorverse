package com.arsalaan.dto.learner;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private Long slotId;
    private Long mentorId;
    private Long learnerId;
}
