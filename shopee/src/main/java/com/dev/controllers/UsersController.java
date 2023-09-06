/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.controllers;

import com.dev.pojo.User;
import com.dev.service.UserService;
import java.security.Principal;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

/**
 *
 * @author admin
 */
@Controller
public class UsersController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public String list(Model model, Principal p) {
        model.addAttribute("user", new User());
        return "users";
    }
    
    @PostMapping("/users")
    public String add(@ModelAttribute(value = "user") @Valid User u, 
            BindingResult rs) {
        if (!rs.hasErrors())
            if (userService.addOrUpdateUser(u) == true)
                return "redirect:/";
        
        return "users";
    }
    
    @GetMapping("/users/{username}")
    public String update(Model model, @PathVariable(value = "username") String username)  {
        model.addAttribute("user", this.userService.getUserByUn(username));
        return "users";
    }
}
