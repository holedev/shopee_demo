/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dev.repository;

import com.dev.dto.ChargeDTO;
import com.dev.pojo.Category;
import com.stripe.model.Charge;
import java.util.List;

/**
 *
 * @author admin
 */
public interface StripeRepository {
    public ChargeDTO charge(String token, Double amount);
}
