package com.arsalaan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.arsalaan.models.Reviews;

public interface ReviewsRespository extends JpaRepository<Reviews, Long> {

	@Query("SELECT COALESCE(AVG(r.rating), 0) FROM Reviews r WHERE r.course.id = :courseId")
	double findAvgRatingByCourseId(@Param("courseId") long courseId);
	
	long countDistinctLearnerIdByCourseId(long courseId);
	
	@Query("SELECT COALESCE(AVG(r.rating), 0) FROM Reviews r WHERE r.mentor.id = :mentorId")
	double findAvgRatingByMentorId(@Param("mentorId") long mentorId);
	
	long countDistinctLearnerIdByMentorId(long mentorId);
	
	List<Reviews> findByCourseId(long courseId);
	
	List<Reviews> findByMentorId(long mentorId);
	
}
