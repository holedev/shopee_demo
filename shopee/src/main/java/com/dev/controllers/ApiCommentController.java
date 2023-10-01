/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.controllers;

import com.dev.dto.CommentsOfProduct;
import com.dev.dto.ProductsWithPageCount;
import com.dev.pojo.Comment;
import com.dev.pojo.Product;
import com.dev.service.CategoryService;
import com.dev.service.CommentService;
import com.dev.service.ProductService;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jca.cci.core.support.CommAreaRecord;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author admin
 */
@RestController
@RequestMapping("/api")
public class ApiCommentController {
    @Autowired
    private CommentService commentService;
    
    @RequestMapping(path="/comments/{type}/{id}/")
    @CrossOrigin
    public ResponseEntity<?> getComments(@PathVariable(value = "type") String type, @PathVariable(value = "id") int id) {
        return new ResponseEntity<>(this.commentService.getComments(id, type), HttpStatus.OK);
    }
    
    @PostMapping(path="/comments/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<Comment> addComment(@RequestBody Map<String, String> req) {
        Comment c = this.commentService.addComment(req);
        
        return new ResponseEntity<>(c, HttpStatus.CREATED);
    }
    
    @DeleteMapping(path="/comments/{id}/")
    @CrossOrigin
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable(value = "id") int id) {
        this.commentService.deleteComment(id);
    }
    
//    @GetMapping("/comments/{type}/{id}/")
//    @CrossOrigin
//    public ResponseEntity<?> listComments(@PathVariable(value = "type") String type, @PathVariable(value = "id") int id) {
//        return new ResponseEntity<>(this.commentService.getComments(id), HttpStatus.OK);
//    }
    
}
