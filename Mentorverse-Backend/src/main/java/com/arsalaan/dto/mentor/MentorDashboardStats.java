package com.arsalaan.dto.mentor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MentorDashboardStats {
	
	String mentorName;
	long courseCount;
	long totalLearners;
	double totalEarnings;
	long upcomingSessionsCount;
	
	public MentorDashboardStats(String mentorName, long courseCount, long totalLearners, double totalEarnings, long upcomingSessionsCount) {
		this.mentorName = mentorName;
		this.courseCount = courseCount;
		this.totalLearners = totalLearners;
		this.totalEarnings = totalEarnings;
		this.upcomingSessionsCount = upcomingSessionsCount;
	}
}
