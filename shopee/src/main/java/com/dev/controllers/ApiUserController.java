/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.controllers;

import com.dev.pojo.User;
import com.dev.components.JwtService;
import com.dev.dto.StoreWithRating;
import com.dev.dto.UserLoginOauth2Response;
import com.dev.service.UserService;
import java.security.Principal;
import java.util.List;
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
    
    @PatchMapping(path = "/users/update-user/",
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<?> updateUser(@RequestBody Map<String, String> params) {
        User u = this.userService.updateUser(params);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }
    
    @GetMapping(path = "/current-user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<User> details(Principal user) {
        User u = this.userService.getUserByUn(user.getName());
        return new ResponseEntity<>(u, HttpStatus.OK);
    }
    
    @GetMapping(path = "/users/get-stores/")
    @CrossOrigin
    public ResponseEntity<List<User>> getStores() {
        return new ResponseEntity<>(this.userService.getStores(), HttpStatus.OK);
    }
    
    @GetMapping(path = "/users/rating-store/{id}/")
    @CrossOrigin
    public ResponseEntity<?> ratingStore(@PathVariable(value = "id") int id) {
        return new ResponseEntity<>(this.userService.getRatingStore(id), HttpStatus.OK);
    }
    
    @PostMapping(path = "/users/rating-store/{id}/")
    @CrossOrigin
    public ResponseEntity<?> ratingStore(@PathVariable(value = "id") int id, @RequestBody Map<String, String> req) {
        return new ResponseEntity<>(this.userService.ratingStore(id, Integer.parseInt(req.get("value"))), HttpStatus.OK);
    }
    
    @GetMapping(path = "/users/get-store-by-id/{id}/")
    @CrossOrigin
    public ResponseEntity<StoreWithRating> getStoreById(@PathVariable(value = "id") int id) {
        User u = this.userService.getStoreById(id);
        double rating = this.userService.getRateOfStore(id);
        if (u == null) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new StoreWithRating(u, rating), HttpStatus.OK);
    }
}
