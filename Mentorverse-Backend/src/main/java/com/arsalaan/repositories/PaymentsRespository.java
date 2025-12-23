package com.arsalaan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.arsalaan.models.Payments;

public interface PaymentsRespository extends JpaRepository<Payments, Long> {

	
	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payments p WHERE p.booking IS NOT NULL AND p.booking.mentor.id = :mentorId")
	Double countTotalBookingAmount(@Param("mentorId") long mentorId);
	
	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payments p WHERE p.enrollment IS NOT NULL AND p.enrollment.courses.mentor.id = :mentorId")
	Double countTotalEnrollmentAmount(@Param("mentorId") long mentorId);
	
	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payments p where p.enrollment.courses.id = :courseId")
	long findSumOfAmountByCourseId(@Param("courseId") long courseId);
	
}
