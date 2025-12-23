package com.arsalaan.utils;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import com.arsalaan.user.CustomUserDetails;
import com.arsalaan.models.User;

public class SecurityUtil {

    public static User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails)) {
            return null;
        }

        return ((CustomUserDetails) auth.getPrincipal()).getUser();
    }
}
