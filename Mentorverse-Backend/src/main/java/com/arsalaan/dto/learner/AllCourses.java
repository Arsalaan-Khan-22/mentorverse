package com.arsalaan.dto.learner;

import com.arsalaan.enums.CourseLevel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllCourses {

	private long id;
	private String thumbnail;
	private String category;
	private double avgRating;
	private long totalReviews;
	private String title;
	private String mentorProfilePic;
	private String mentorName;
	private String description;
	private long totalStudentsEnrolled;
	private String totalHours;
	private CourseLevel level;
	private double price;




	public AllCourses(long id, String thumbnail, String category, double avgRating, long totalReviews, String title,
			String mentorProfilePic, String mentorName, String description, long totalStudentsEnrolled,
			String totalHours, CourseLevel level, double price) {
		super();
		this.id = id;
		this.thumbnail = thumbnail;
		this.category = category;
		this.avgRating = avgRating;
		this.totalReviews = totalReviews;
		this.title = title;
		this.mentorProfilePic = mentorProfilePic;
		this.mentorName = mentorName;
		this.description = description;
		this.totalStudentsEnrolled = totalStudentsEnrolled;
		this.totalHours = totalHours;
		this.level = level;
		this.price = price;
	}
	
}
