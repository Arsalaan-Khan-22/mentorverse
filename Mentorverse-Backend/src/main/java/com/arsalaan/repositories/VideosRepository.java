package com.arsalaan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arsalaan.models.Videos;

public interface VideosRepository extends JpaRepository<Videos, Long> {
	
	// Find all videos of a specific Course
	List<Videos> findByCoursesIdOrderByVideoOrderAsc(long courseId);
	
	// Count total Videos of a specific Course
	long countByCoursesId(long courseId);
	
}
