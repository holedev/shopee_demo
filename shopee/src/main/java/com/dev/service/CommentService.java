/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dev.service;

import com.dev.pojo.Comment;
import java.security.Principal;
import java.util.List;
import java.util.Map;

/**
 *
 * @author huu-thanhduong
 */
public interface CommentService {
    List<?> getComments(int id, String type);
    Comment addComment(Map<String, String> req);
    boolean deleteComment(int id);
}
