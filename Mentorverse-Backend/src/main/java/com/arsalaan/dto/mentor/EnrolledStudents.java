package com.arsalaan.dto.mentor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnrolledStudents {
	
	private long learnerId;
	private String learnerName;
	private String learnerEmail;
	private long totalCoursesEnrolled;
	
	public EnrolledStudents(long learnerId, String learnerName, String learnerEmail, long totalCoursesEnrolled) {
		this.learnerId = learnerId;
		this.learnerName = learnerName;
		this.learnerEmail = learnerEmail;
		this.totalCoursesEnrolled = totalCoursesEnrolled;
	}
	
}
