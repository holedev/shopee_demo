/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.service;

import com.dev.pojo.Cart;
import java.util.Map;

/**
 *
 * @author admin
 */
public interface ReceiptService {
    boolean addReceipt(Map<String, Cart> carts);
}
