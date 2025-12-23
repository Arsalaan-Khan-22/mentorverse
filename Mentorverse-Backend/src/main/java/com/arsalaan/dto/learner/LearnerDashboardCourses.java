package com.arsalaan.dto.learner;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearnerDashboardCourses {

	private long id;
	private String courseThumbnail;
	private String courseTitle;
	private String mentorName;
	
	
	public LearnerDashboardCourses(long id, String courseThumbnail, String courseTitle, String mentorName) {
		this.id = id;
		this.courseThumbnail = courseThumbnail;
		this.courseTitle = courseTitle;
		this.mentorName = mentorName;
	}
	
	
}
