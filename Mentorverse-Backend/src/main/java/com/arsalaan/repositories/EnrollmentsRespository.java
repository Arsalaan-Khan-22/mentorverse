package com.arsalaan.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.arsalaan.models.Courses;
import com.arsalaan.models.Enrollments;

public interface EnrollmentsRespository extends JpaRepository<Enrollments, Long> {

	//Count unique total learners enrolled in any course created by specific mentor
	@Query("SELECT COUNT(DISTINCT e.learner.id) from Enrollments e where e.courses.mentor.id = :mentorId")
	long countUniqueLearnersByMentorId(@Param("mentorId") long mentorId);
	
	long countByCoursesId(long courseId);
	
	@Query("SELECT COUNT(e.id) FROM Enrollments e WHERE e.learner.id = :learnerId AND e.courses.id IN "
			+ "(SELECT c.id FROM Courses c WHERE c.mentor.id = :mentorId)")
	long countCoursesEnrolledByLearner(long learnerId, long mentorId);
	
	long countByLearnerId(long learnerId);
	
	List<Enrollments> findTop3ByLearnerId(long learnerId);

	List<Enrollments> findByLearnerId(long learnerId);
	
	long countByLearnerIdAndCoursesId(long learnerId, long courseId);
	
	Optional<Enrollments> findByLearnerIdAndCoursesId(long learnerId, long courseId);
	
	  long countByLearnerIdAndCoursesId(Long learnerId, Long courseId);

	   boolean existsByLearnerIdAndCoursesId(Long learnerId, Long courseId);
}
