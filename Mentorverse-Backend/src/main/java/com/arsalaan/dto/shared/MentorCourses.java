package com.arsalaan.dto.shared;

import com.arsalaan.models.Courses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorCourses {

	Courses course;
	long totalStudents;
	double rating;
	long totalRatingCount;
	String totalHours;
	
	
	public MentorCourses(Courses course, long totalStudents, double rating, long totalRatingCount) {
		this.course = course;
		this.totalStudents = totalStudents;
		this.rating = rating;
		this.totalRatingCount = totalRatingCount;
	}
	
	public MentorCourses(Courses course, long totalStudents, double rating, long totalRatingCount, String totalHours) {
		this.course = course;
		this.totalStudents = totalStudents;
		this.rating = rating;
		this.totalRatingCount = totalRatingCount;
		this.totalHours = totalHours;
	}
	
	
	
}
