/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dev.repository;

import com.dev.pojo.Comment;
import java.security.Principal;
import java.util.List;
import java.util.Map;

/**
 *
 * @author huu-thanhduong
 */
public interface CommentRepository {
    Comment getCommentById(int id);
    List<?> getComments(int id, String type);
    boolean deleteComment(int id);
    Comment addComment(Map<String, String> req);
}
