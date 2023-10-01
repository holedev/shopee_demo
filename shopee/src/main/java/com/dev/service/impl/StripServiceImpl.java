/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.service.impl;

import com.dev.dto.ChargeDTO;
import com.dev.pojo.Category;
import com.dev.repository.CategoryRepository;
import com.dev.repository.StripeRepository;
import com.dev.service.CategoryService;
import com.dev.service.StripeService;
import com.stripe.model.Charge;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author admin
 */
@Service
public class StripServiceImpl implements StripeService {
    
    @Autowired
    private StripeRepository stripeRepo;

    @Override
    public ChargeDTO charge(String token, Double amount) {
        return this.stripeRepo.charge(token, amount);
    }
    
    
}
