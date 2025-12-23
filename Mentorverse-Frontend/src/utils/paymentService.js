export const createSlotBookingPayment = async ({
    api,
    learnerId,
    mentorId,
    slotDetails,
    onSuccess,
    onFailure,
}) => {
    try {
        console.log('Simulating slot booking payment...');

        const bookingData = {
            id: slotDetails.id,
            dayOfWeek: slotDetails.dayOfWeek,
            startTime: slotDetails.startTime,
            endTime: slotDetails.endTime,
            durationMinute: slotDetails.durationMinute,
            price: slotDetails.price,
        };

        const bookingResponse = await api.post(
            `/bookings/learner/${learnerId}/mentor/${mentorId}`,
            bookingData
        );

        onSuccess(bookingResponse.data);
    } catch (error) {
        onFailure(error);
    }
};

export const createCourseEnrollmentPayment = async ({
    api,
    courseId,
    learnerId,
    coursePrice,
    courseTitle,
    onSuccess,
    onFailure,
}) => {
    try {
        console.log('Simulating course enrollment payment...');

        const enrollmentResponse = await api.post(
            `/enrollments/course/${courseId}/learner/${learnerId}`
        );

        onSuccess(enrollmentResponse.data);
    } catch (error) {
        onFailure(error);
    }
};
