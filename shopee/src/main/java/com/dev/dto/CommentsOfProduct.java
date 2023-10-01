/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.dto;

import com.dev.pojo.User;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.eclipse.persistence.jpa.jpql.parser.DateTime;

/**
 *
 * @author dorara
 */
@Getter
@Setter
public class CommentsOfProduct {
    private int id;
    private String content;
    private Date createDate;
    private User user;
    private int parentId; 
    private int level;

    public CommentsOfProduct(int id, String content, Date createDate,  User user, int parentId, int level) {
        this.id = id;
        this.content = content;
        this.createDate = createDate;
        this.user = user;
        this.parentId = parentId;
        this.level = level;
    }
    
    
}
