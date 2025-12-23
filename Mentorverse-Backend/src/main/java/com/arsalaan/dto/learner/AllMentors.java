package com.arsalaan.dto.learner;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllMentors {

	private long id;
	private String profilePic;
	private String name;
	private String email;
	private double avgRating;
	private long totalRating;
	private String bio;
	private String skills;
	private double experience;
	private long totalStudents;
	private int ratePerHour;
	
	
	
	
	public AllMentors(long id, String profilePic, String name, String email, double avgRating, long totalRating, String bio, String skills, double experience, long totalStudents,
			int ratePerHour) {
		this.id = id;
		this.profilePic = profilePic;
		this.name = name;
		this.email = email;
		this.avgRating = avgRating;
		this.totalRating = totalRating;
		this.bio = bio;
		this.skills = skills;
		this.experience = experience;
		this.totalStudents = totalStudents;
		this.ratePerHour = ratePerHour;
	}
	
	
	
	
}
