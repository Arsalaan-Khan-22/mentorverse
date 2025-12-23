package com.arsalaan.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arsalaan.models.User;
import com.arsalaan.models.VideoProgress;
import com.arsalaan.models.Videos;
import com.arsalaan.repositories.UserRepository;
import com.arsalaan.repositories.VideoProgressRepository;
import com.arsalaan.repositories.VideosRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoProgressService {

    private final VideoProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final VideosRepository videosRepository;
    private final MyResponseWrapper responseWrapper;

    // Mark video as completed
    public ResponseEntity<?> markVideoCompleted(long learnerId, long videoId) {

        if (progressRepository.existsByLearnerIdAndVideoId(learnerId, videoId)) {
            return responseWrapper.response(
                "Video already marked as completed",
                null,
                HttpStatus.OK
            );
        }

        User learner = userRepository.findById(learnerId).orElseThrow();
        Videos video = videosRepository.findById(videoId).orElseThrow();

        VideoProgress progress = new VideoProgress();
        progress.setLearner(learner);
        progress.setVideo(video);
        progress.setCompleted(true);

        progressRepository.save(progress);

        return responseWrapper.response(
            "Video marked as completed",
            progress,
            HttpStatus.OK
        );
    }

    // Get completed video id for a course
    public ResponseEntity<?> getCompletedVideos(long learnerId, long courseId) {

        List<Long> completedVideoIds = progressRepository
            .findByLearnerIdAndVideoCoursesId(learnerId, courseId)
            .stream()
            .map(vp -> vp.getVideo().getId())
            .toList();

        return responseWrapper.response(
            "Completed videos fetched",
            completedVideoIds,
            HttpStatus.OK
        );
    }

    // Course completion percentage
    public ResponseEntity<?> getCourseProgress(long learnerId, long courseId, long totalVideos) {

        long completedCount =
            progressRepository.countByLearnerIdAndVideoCoursesId(learnerId, courseId);

        int percentage = totalVideos == 0
            ? 0
            : (int) ((completedCount * 100) / totalVideos);

        return responseWrapper.response(
            "Course progress",
            percentage,
            HttpStatus.OK
        );
    }
}
