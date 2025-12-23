package com.arsalaan.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.arsalaan.models.Courses;
import com.arsalaan.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

	Optional<User> findByEmail(String email);
	
//	List<User> findByRole(UserRole role);
//	List<User> findAll(Specification<User> spec);
	Page<User> findAll(Specification<User> spec, Pageable page);
	
	@Query("SELECT COUNT(DISTINCT u.id) FROM User u WHERE u.id IN (SELECT b.learner.id FROM Bookings b WHERE b.mentor.id = :mentorId)"
			+ " OR u.id IN (SELECT e.learner.id FROM Enrollments e WHERE e.courses.mentor.id = :mentorId)")
	long countUniqueLearnersByMentorId(@Param("mentorId") long mentorId);
	
	@Query("SELECT u FROM User u WHERE u.id IN (SELECT e.learner.id FROM Enrollments e WHERE e.courses.mentor.id = :mentorId)")
	List<User> findAllStudentsByMentorId(long mentorId);
	
	
	//Same as countUniqueLearnersByMentorId (solve this later)
	@Query(value = "select count(distinct learner_id) from (select learner_id from bookings where mentor_id = :mentorId "
			+ "union select learner_id from enrollments where course_id in (select id from courses where mentor_id = :mentorId)) combined",
			nativeQuery = true)
	long countTotalStudentsByMentorId(@Param("mentorId") long mentorId);

	boolean existsByEmail(String email);
	
	@Query("SELECT DISTINCT u.skills FROM User u WHERE u.role = 'MENTOR' AND u.skills IS NOT NULL")
    List<String> findAllMentorSkills();
}
