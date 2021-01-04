package com.example.book.controller;

import org.jetbrains.annotations.Nullable;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/books")
public class BookController {

    @GetMapping("/public")
    public String anonymous() {
        return "Public books";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('user')")
    public String user(KeycloakAuthenticationToken authentication) {
        String author = "0973e8e8-860c-45b0-9d1d-2341b91fbdbe";
        return extractUsername(authentication);
    }

    @Nullable
    private String extractUsername(KeycloakAuthenticationToken authentication) {
        if (authentication.getPrincipal() instanceof KeycloakPrincipal) {
            KeycloakPrincipal<?> principal = (KeycloakPrincipal<?>) authentication.getPrincipal();
            return principal.getName();
        }
        return null;
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('admin')")
    public String admin() {
        return "Admin's books";
    }

}
