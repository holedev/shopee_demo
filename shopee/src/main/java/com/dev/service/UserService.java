/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.service;

import com.dev.pojo.User;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author admin
 */
public interface UserService extends UserDetailsService  {
    List<User> getUsers(Map<String, String> params);
    Long countUsers();
    User getUserByUn(String username);
    boolean addOrUpdateUser(User u);
    boolean updateUserByAdmin(String username, String type);
    boolean authUser(String username, String password);
    User addUser(Map<String, String> params, MultipartFile avatar);
    User loginUserWithOAuth2(Map<String, String> userReq);
    List<User> getStores();
}
