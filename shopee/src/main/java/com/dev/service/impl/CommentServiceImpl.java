/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.service.impl;

import com.dev.pojo.Comment;
import com.dev.pojo.User;
import com.dev.repository.CommentRepository;
import com.dev.repository.ProductRepository;
import com.dev.repository.UserReppository;
import com.dev.service.CommentService;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 *
 * @author huu-thanhduong
 */
@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private UserReppository userRepo;
    

    @Override
    public List<?> getComments(int id, String type) {
        return this.commentRepo.getComments(id, type);
    }

    @Override
    public Comment addComment(Map<String, String> req) {
        return this.commentRepo.addComment(req);
    }

    @Override
    public boolean deleteComment(int id) {
        return this.commentRepo.deleteComment(id);
    }
    
}
