package com.arsalaan.services;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendBookingMail(
            String toEmail,
            String learnerName,
            String mentorName,
            LocalDate date,
            LocalTime time,
            String meetingLink
    ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("mentorverseoff@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Session Booked Successfully 🎉");

        message.setText(
            "Hello " + learnerName + ",\n\n" +
            "Your session has been booked successfully.\n\n" +
            "Mentor: " + mentorName + "\n" +
            "Date: " + date + "\n" +
            "Time: " + time + "\n\n" +
            "Join Meeting:\n" + meetingLink + "\n\n" +
            "Best regards,\nMentorverse Team"
        );

        mailSender.send(message);
    }
}
