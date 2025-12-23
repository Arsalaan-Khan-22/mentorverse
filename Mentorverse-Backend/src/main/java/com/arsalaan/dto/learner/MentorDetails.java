package com.arsalaan.dto.learner;

import com.arsalaan.models.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorDetails {

	User mentor;
	long totalStudents;
	long totalRatingCount;
	
	
	public MentorDetails(User mentor, long totalStudents, long totalRatingCount) {
		this.mentor = mentor;
		this.totalStudents = totalStudents;
		this.totalRatingCount = totalRatingCount;
	}
	
	
}
