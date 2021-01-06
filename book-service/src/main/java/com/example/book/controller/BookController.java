package com.example.book.controller;

import com.example.book.model.User;
import com.example.book.service.BookService;
import com.example.book.util.CurrentUserUtil;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping
    public Pair<String, String> anonymous() {
        return new ImmutablePair<>("user", CurrentUserUtil.getNickName());
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public User user() {
        return CurrentUserUtil.getModel();
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public User admin() {
        return CurrentUserUtil.getModel();
    }

}
