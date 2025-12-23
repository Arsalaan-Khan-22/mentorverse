package com.arsalaan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arsalaan.models.VideoProgress;

public interface VideoProgressRepository extends JpaRepository<VideoProgress, Long> {

    boolean existsByLearnerIdAndVideoId(long learnerId, long videoId);

    List<VideoProgress> findByLearnerIdAndVideoCoursesId(long learnerId, long courseId);

    long countByLearnerIdAndVideoCoursesId(long learnerId, long courseId);
}

