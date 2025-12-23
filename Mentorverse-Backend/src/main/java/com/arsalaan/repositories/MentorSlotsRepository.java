package com.arsalaan.repositories;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arsalaan.enums.WeekDay;
import com.arsalaan.models.MentorSlots;

@Repository
public interface MentorSlotsRepository extends JpaRepository<MentorSlots, Long> {
	List<MentorSlots> findByMentorId(long mentorId);
    List<MentorSlots> findByMentorIdAndDayOfWeekAndStartTimeAndEndTime(long mentorId, WeekDay dayOfWeek, LocalTime startTime, LocalTime endTime);
}
