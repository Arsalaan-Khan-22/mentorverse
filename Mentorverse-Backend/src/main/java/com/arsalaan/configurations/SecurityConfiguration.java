package com.arsalaan.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.arsalaan.jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/mentors").permitAll()
                    .requestMatchers("/api/mentors/profile/**").hasAnyRole("MENTOR", "LEARNER")
                    .requestMatchers("/api/bookings/learner/**").hasAnyRole("MENTOR", "LEARNER")
                    .requestMatchers("/api/mentors/courses/**").hasAnyRole("MENTOR", "LEARNER")
                    .requestMatchers("/api/slots/**").hasAnyRole("MENTOR", "LEARNER")
                    .requestMatchers("/api/courses").permitAll()
                    .requestMatchers("/api/enrollments/course/**").hasRole("LEARNER")
                    .requestMatchers("/api/mentors/**").hasRole("MENTOR")
                    .requestMatchers("/api/learners/**").hasRole("LEARNER")
                    .requestMatchers("/api/progress/**").hasRole("LEARNER")
                    .requestMatchers("/api/payments/**").hasRole("LEARNER")
                    .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
