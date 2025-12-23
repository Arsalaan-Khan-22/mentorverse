package com.arsalaan.specifications;

import org.springframework.data.jpa.domain.Specification;

import com.arsalaan.enums.UserRole;
import com.arsalaan.models.User;

public class UserSpecification {
	
	//Get All Mentors
	public static Specification<User> hasRole(UserRole role) {
		return (root, query, cb) -> {
			return cb.equal(root.get("role"), role);
		};
	}

	//Search By Name or Bio
	public static Specification<User> nameOrSkillContains(String keyword) {
		return (root, query, cb) -> {
			if(keyword == null || keyword.isEmpty()) return null;
			String likePattern = "%" + keyword.toLowerCase() + "%";
			return cb.or(
						cb.like(cb.lower(root.get("name")), likePattern),
						cb.like(cb.lower(root.get("skills")), likePattern)
					);
		};
	}
	
	//Filter By Skill
	public static Specification<User> hasSkill(String skill) {
		return (root, query, cb) -> {
			if(skill == null || skill.equalsIgnoreCase("all")) return null;
			String likePattern = "%" + skill.toLowerCase() + "%";
			return cb.like(cb.lower(root.get("skills")), likePattern);
		};
	}
	
	//Sorting
	public static Specification<User> sortby(String sortBy) {
		return (root, query, cb) -> {
			if(sortBy == null) return null;
			switch(sortBy) {
				case "highestRating":
					query.orderBy(cb.desc(root.get("avgRating")));
					break;
				case "priceLowToHigh":
					query.orderBy(cb.asc(root.get("ratePerHour")));
					break;
				case "priceHighToLow":
					query.orderBy(cb.desc(root.get("ratePerHour")));
					break;
				case "mostExperience":
					query.orderBy(cb.desc(root.get("experience")));
					break;
			}
			return null;
		};
	}
	
}
