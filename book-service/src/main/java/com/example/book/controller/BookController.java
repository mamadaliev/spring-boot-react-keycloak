package com.example.book.controller;

import com.example.book.service.BookService;
import com.example.book.util.CurrentUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping
    public String anonymous() {
        return "Books of " + CurrentUserUtil.getNickName();
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('user')")
    public String user() {
        return "Books of " + CurrentUserUtil.getNickName() + " _ " + CurrentUserUtil.getId();
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> admin() {
        return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication());
    }

}
