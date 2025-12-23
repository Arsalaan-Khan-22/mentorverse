package com.arsalaan.dto.learner;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewsDto {

	private long id;
	private String learnerProfilePic;
	private String learnerName;
	private double rating;
	private String comment;
	private Instant reviewDate;
	
	
	public ReviewsDto(long id, String learnerProfilePic, String learnerName, double rating, String comment,
			Instant reviewDate) {
		this.id = id;
		this.learnerProfilePic = learnerProfilePic;
		this.learnerName = learnerName;
		this.rating = rating;
		this.comment = comment;
		this.reviewDate = reviewDate;
	}
	
	
	
}
