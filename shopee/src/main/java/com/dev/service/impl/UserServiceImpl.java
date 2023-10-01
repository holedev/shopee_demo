/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dev.pojo.User;
import com.dev.repository.UserReppository;
import com.dev.service.UserService;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author admin
 */
@Service("userDetailsService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserReppository userRepo;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = this.userRepo.getUserByUsername(username);
        if (u == null) {
            throw new UsernameNotFoundException("Invalid");
        }
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(u.getUserRole()));
        return new org.springframework.security.core.userdetails.User(
                u.getUsername(), u.getPassword(), authorities);
    }

    @Override
    public User getUserByUn(String username) {
        return this.userRepo.getUserByUsername(username);
    }

    @Override
    public boolean authUser(String username, String password) {
        return this.userRepo.authUser(username, password);
    }

    @Override
    public User addUser(Map<String, String> params, MultipartFile avatar) {
        User u = new User();
        u.setFirstName(params.get("firstName"));
        u.setLastName(params.get("lastName"));
        u.setPhone(params.get("phone"));
        u.setEmail(params.get("email"));
        u.setUsername(params.get("username"));
        u.setPassword(this.passwordEncoder.encode(params.get("password")));
        u.setUserRole("ROLE_USER");
        if (!avatar.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(avatar.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                u.setAvatar(res.get("secure_url").toString());
            } catch (IOException ex) {
                Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        this.userRepo.addUser(u);
        return u;
    }

    @Override
    public List<User> getUsers(Map<String, String> params) {
        return this.userRepo.getUsers(params);
    }

    @Override
    public Long countUsers() {
        return this.userRepo.countUsers();
    }

    @Override
    public boolean addOrUpdateUser(User u) {

        if (u.getId() == null) {
            u.setAvatar("https://res.cloudinary.com/by1410/image/upload/v1679661516/NCKH/fpidxdqiatwfu0e4twux.png");
        }
        
        if (!u.getFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(u.getFile().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                u.setAvatar(res.get("secure_url").toString());
            } catch (IOException ex) {
                Logger.getLogger(ProductServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return this.userRepo.addOrUpdateUser(u);
    }

    @Override
    public boolean updateUserByAdmin(String username, String type) {
        return this.userRepo.updateUserByAdmin(username, type);
    }

    @Override
    public User loginUserWithOAuth2(Map<String, String> userReq) {
        return this.userRepo.loginUserWithOAuth2(userReq);
    }

    @Override
    public List<User> getStores() {
        return this.userRepo.getStores();
    }

    @Override
    public User getStoreById(int id) {
        return this.userRepo.getStoreById(id);
    }

    @Override
    public double getRateOfStore(int id) {
        return this.userRepo.getRateOfStore(id);
    }

    @Override
    public int ratingStore(int id, int value) {
        return this.userRepo.ratingStore(id, value);
    }

    @Override
    public int getRatingStore(int storeId) {
        return this.userRepo.getRatingStore(storeId);
    }

    @Override
    public User updateUser(Map<String, String> user) {
        User u = new User();
        u.setId(Integer.parseInt(user.get("id")));
        u.setFirstName(user.get("firstName"));
        u.setPhone(user.get("phone"));
        u.setLastName(user.get("lastName"));
        u.setUsername(user.get("username"));
        u.setUserRole(user.get("userRole"));
        u.setEmail(user.get("email"));
        return this.userRepo.updateUser(u);
    }

    @Override
    public User updateUserAvatar(MultipartFile image) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
