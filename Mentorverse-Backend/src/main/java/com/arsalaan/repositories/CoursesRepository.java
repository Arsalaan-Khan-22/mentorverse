package com.arsalaan.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.arsalaan.models.Courses;

public interface CoursesRepository extends JpaRepository<Courses, Long>, JpaSpecificationExecutor<Courses> {
	
	long countByMentorId(long mentorId);
	
	List<Courses> findTop3ByMentorIdOrderByCreatedAtDesc(long mentorId);
	
	List<Courses> findAllByMentorIdOrderByCreatedAtDesc(long mentorId);
	
//	List<Courses> findAll(Specification<Courses> spec);
	Page<Courses> findAll(Specification<Courses> spec, Pageable page);
	
}
