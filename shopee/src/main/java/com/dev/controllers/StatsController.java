/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.controllers;

import com.dev.pojo.User;
import com.dev.repository.CategoryRepository;
import com.dev.repository.StatsRepository;
import com.dev.repository.UserReppository;
import com.dev.service.UserService;
import java.security.Principal;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author admin
 */
@Controller
public class StatsController {
    
    @Autowired
    private StatsRepository statsRepo;
    @Autowired
    private UserReppository userRepo;
    
    @GetMapping("/stats")
    public String list(Model model, Principal p) {
        model.addAttribute("stores", this.userRepo.getStores());
        return "stats";
    }
    
    @GetMapping("/stats/get-stats/")
    public ResponseEntity<?> getStats(Principal p, @RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.statsRepo.statsStore(params), HttpStatus.OK);
    }
   
}
