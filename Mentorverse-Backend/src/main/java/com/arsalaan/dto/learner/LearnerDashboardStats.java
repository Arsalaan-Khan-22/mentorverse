package com.arsalaan.dto.learner;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearnerDashboardStats {
	
	String learnerName;
	long upcomingSessions;
	long enrolledCourses;
	long mentorsCount;
	long totalSessions;
	
	public LearnerDashboardStats(String learnerName, long upcomingSessions, long enrolledCourses, long mentorsCount, long totalSessions) {
		this.learnerName = learnerName;
		this.upcomingSessions = upcomingSessions;
		this.enrolledCourses = enrolledCourses;
		this.mentorsCount = mentorsCount;
		this.totalSessions = totalSessions;
	}
}

