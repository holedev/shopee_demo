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
public class UserLoginOauth2Response {
    private User user;
    private String token;

    public UserLoginOauth2Response(User user, String token) {
        this.user = user;
        this.token = token;
    }
}
