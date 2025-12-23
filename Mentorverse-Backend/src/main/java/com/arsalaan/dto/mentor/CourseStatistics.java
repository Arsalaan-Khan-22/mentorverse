package com.arsalaan.dto.mentor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseStatistics {

	long totalStudents;
	double avgRating;
	long totalReviews;
	long totalVideos;
	
	public CourseStatistics(long totalStudents, double avgRating, long totalReviews, long totalVideos) {
		this.totalStudents = totalStudents;
		this.avgRating = avgRating;
		this.totalReviews = totalReviews;
		this.totalVideos = totalVideos;
	}
}
