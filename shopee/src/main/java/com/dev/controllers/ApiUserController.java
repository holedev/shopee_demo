/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.controllers;

import com.dev.pojo.User;
import com.dev.components.JwtService;
import com.dev.dto.UserLoginOauth2Response;
import com.dev.service.UserService;
import java.security.Principal;
import java.util.Map;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
 * @author huu-thanhduong
 */
@RestController
@RequestMapping("/api")
public class ApiUserController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;

    @PostMapping("/login/")
    @CrossOrigin
    public ResponseEntity<Object> login(@RequestBody Map<String, String> userReq) {
          User user = this.userService.loginUserWithOAuth2(userReq);
          
          if (user != null) {
            String token = this.jwtService.generateTokenLogin(user.getUsername());
            UserLoginOauth2Response userRes = new UserLoginOauth2Response(user, token);
            return new ResponseEntity<>(userRes, HttpStatus.OK);
          }
        return new ResponseEntity<>("ROLE CONFLICT!", HttpStatus.CONFLICT);
    }
    
    @GetMapping(path = "/current-user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<User> details(Principal user) {
        User u = this.userService.getUserByUn(user.getName());
        return new ResponseEntity<>(u, HttpStatus.OK);
    }
    
    @PatchMapping("/users/{username}/{type}")
    @ResponseStatus(HttpStatus.OK)
    public void updateUserByAdmin(@PathVariable(value = "username") String username, @PathVariable(value = "type") String type) {
        this.userService.updateUserByAdmin(username, type);
    }
}
