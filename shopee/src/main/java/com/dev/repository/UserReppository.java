/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.repository;

import com.dev.pojo.User;
import java.util.List;
import java.util.Map;

/**
 *
 * @author admin
 */
public interface UserReppository {
    List<User> getUsers(Map<String, String> params);
    Long countUsers();
    public User getUserById(int id);
    User getUserByUsername(String username);
    boolean addOrUpdateUser(User u);
    boolean updateUserByAdmin(String username, String type);
    boolean authUser(String username, String password);
    User addUser(User user);
    User loginUserWithOAuth2(Map<String, String> userReq);
    List<User> getStores();
}
