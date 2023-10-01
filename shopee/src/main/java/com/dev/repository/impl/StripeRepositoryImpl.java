/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.repository.impl;

import com.dev.dto.ChargeDTO;
import com.dev.pojo.Category;
import com.dev.repository.CategoryRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.dev.repository.StripeRepository;
import com.stripe.Stripe;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

/**
 *
 * @author admin
 */
@Repository
@Transactional
@PropertySource("classpath:configs.properties")
public class StripeRepositoryImpl implements StripeRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private Environment env;
    

    @Override
    public ChargeDTO charge(String token, Double amount) {
        try {
            Stripe.apiKey = this.env.getProperty("stripe.api_key");
            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", (int) (amount * 1));
            chargeParams.put("currency", "vnd");
            chargeParams.put("source", token); 
            chargeParams.put("description", "Description here");
            Charge charge = Charge.create(chargeParams);
            return new ChargeDTO(charge);
        } catch (StripeException ex) {
            Logger.getLogger(StripeRepositoryImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
