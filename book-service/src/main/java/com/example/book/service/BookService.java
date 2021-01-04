package com.example.book.service;

import com.example.book.util.CurrentUserUtil;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    public String getBooks() {
        return CurrentUserUtil.getNickName() + "'s books";
    }

}
