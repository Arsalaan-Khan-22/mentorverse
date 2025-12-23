package com.arsalaan.dto.mentor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecentCourseDetails {
	
	String courseName;
	long totalStudentsEnrolled;
	double courseRating;
	double courseRevenue;
	
	public RecentCourseDetails(String courseName, long totalStudentsEnrolled, double courseRating, double courseRevenue) {
		this.courseName = courseName;
		this.totalStudentsEnrolled = totalStudentsEnrolled;
		this.courseRating = courseRating;
		this.courseRevenue = courseRevenue;
	}
	
}
