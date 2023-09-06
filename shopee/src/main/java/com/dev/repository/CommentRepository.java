/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dev.repository;

import com.dev.pojo.Comment;
import java.util.List;

/**
 *
 * @author huu-thanhduong
 */
public interface CommentRepository {
    List<Comment> getComments(int productId);
    Comment addComment(Comment c);
}
