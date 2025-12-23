package com.arsalaan.specifications;

import org.springframework.data.jpa.domain.Specification;

import com.arsalaan.enums.CourseLevel;
import com.arsalaan.enums.UserRole;
import com.arsalaan.models.Courses;
import com.arsalaan.models.User;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class CoursesSpecification {

		//Search By Name or Bio
		public static Specification<Courses> titleOrMentorNameOrSkillContains(String keyword) {
			return (root, query, cb) -> {
				if(keyword == null || keyword.isEmpty()) return null;
				String likePattern = "%" + keyword.toLowerCase() + "%";
				return cb.or(
						cb.like(cb.lower(root.get("title")), likePattern),
							cb.like(cb.lower(root.get("mentor").get("name")), likePattern),
							cb.like(cb.lower(root.get("category").get("name")), likePattern)
						);
			};
		}
		
		//Filter By Skill
		public static Specification<Courses> hasCategory(String skill) {
			return (root, query, cb) -> {
				if(skill == null || skill.equalsIgnoreCase("all")) return null;
				String likePattern = "%" + skill.toLowerCase() + "%";
				return cb.like(cb.lower(root.get("category").get("name")), likePattern);
			};
		}
		
		//Sorting
		public static Specification<Courses> sortby(String sortBy) {
			return (root, query, cb) -> {
				if(sortBy == null) return null;
				switch(sortBy) {
					case "mostPopular":
						Join<Object, Object> reviews = root.join("review", JoinType.LEFT);
						query.groupBy(root.get("id"));
						query.orderBy(cb.desc(cb.count(reviews)));
						break;
					case "highestRating":
						query.orderBy(cb.desc(root.get("avgRating")));
						break;
					case "priceHighToLow":
						query.orderBy(cb.desc(root.get("price")));
						break;
					case "priceLowToHigh":
						query.orderBy(cb.asc(root.get("price")));
						break;
				}
				return null;
			};
		}
		
		//Filter by level
		public static Specification<Courses> hasLevel(String level) {
			return (root, query, cb) -> {
				if(level == null || level.equalsIgnoreCase("all")) return null;
				return cb.equal(cb.lower(root.get("level")), level);
			};
		}
	
}
