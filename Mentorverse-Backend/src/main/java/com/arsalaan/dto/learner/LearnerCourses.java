package com.arsalaan.dto.learner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LearnerCourses {

	private long id;
    private String courseThumbnail;
    private String categoryName;
    private String courseTitle;
    private String mentorName;
    private long totalVideos;
    private long completedVideos;
	
	
}
