package com.arsalaan.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.arsalaan.models.Bookings;
import com.arsalaan.models.MentorSlots;
import com.arsalaan.models.User;

public interface BookingsRepository extends JpaRepository<Bookings, Long> {

	List<Bookings> findByLearnerId(long id);
	
	List<Bookings> findByMentorId(long id);
	
	@Query("SELECT COUNT(b) FROM Bookings b WHERE b.mentor.id = :mentorId AND b.status = ACTIVE AND (b.slotDate > CURRENT_DATE "
			+ "OR (b.slotDate = CURRENT_DATE AND b.slotTime > CURRENT_TIME))")
	long countUpcomingSessionsByMentorId(@Param("mentorId") long mentorId);
	
	@Query("SELECT COUNT(b) FROM Bookings b WHERE b.learner.id = :learnerId AND b.status = ACTIVE AND (b.slotDate > CURRENT_DATE "
			+ "OR (b.slotDate = CURRENT_DATE AND b.slotTime > CURRENT_TIME))")
	long countUpcomingSessionByLearnerId(@Param("learnerId") long learnerId);
	
	@Query("SELECT b FROM Bookings b WHERE b.mentor.id = :mentorId AND b.status = ACTIVE AND (b.slotDate > CURRENT_DATE "
			+ "OR (b.slotDate = CURRENT_DATE AND b.slotTime > CURRENT_TIME)) ORDER BY b.slotDate, b.slotTime LIMIT 3")
	List<Bookings> findUpcomingSessionsByMentorId(@Param("mentorId") long mentorId);
	
	@Query("SELECT b FROM Bookings b WHERE b.learner.id = :learnerId AND b.status = ACTIVE AND (b.slotDate > CURRENT_DATE "
			+ "OR (b.slotDate = CURRENT_DATE AND b.slotTime > CURRENT_TIME)) ORDER BY b.slotDate, b.slotTime LIMIT 3")
	List<Bookings> findUpcomingSessionsByLearnerId(long learnerId);
	
	@Query("SELECT COUNT(b) FROM Bookings b WHERE b.learner.id = :learnerId AND b.status = COMPLETED")
	long countCompletedBookingsByLearnerId(@Param("learnerId") long learnerId);
	
	@Query("SELECT COUNT(DISTINCT b.mentor.id) FROM Bookings b WHERE b.learner.id = :learnerId AND b.status IN (COMPLETED, ACTIVE)")
	long countMentorsByLearnerId(@Param("learnerId") long learnerId);
	
	long countByLearnerIdAndMentorId(long learnerId, long mentorId);
	
//	boolean existsBySlotAndSlotDate(MentorSlots slot, LocalDate bookingDate);
	boolean existsBySlot_IdAndSlotDate(long slotId, LocalDate slotDate);

	boolean existsBySlotId(long id);

}
