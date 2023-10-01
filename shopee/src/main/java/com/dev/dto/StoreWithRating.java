/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.dto;

import com.dev.pojo.User;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author dorara
 */
@Getter
@Setter
public class StoreWithRating {
    private User user;
    private double rating;

    public StoreWithRating(User u, double rating) {
        this.user = u;
        this.rating = rating;
    }
    
}
