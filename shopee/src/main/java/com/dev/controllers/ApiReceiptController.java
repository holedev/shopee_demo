/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.controllers;

//import com.dev.pojo.Cart;
//import com.dev.service.ReceiptService;
import com.dev.dto.Cart;
import com.dev.dto.ChargeDTO;
import com.dev.service.ReceiptService;
import com.dev.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author admin
 */
@RestController
@RequestMapping("/api")
public class ApiReceiptController {
    @Autowired
    private ReceiptService receiptService;
    @Autowired
    private StripeService stripeService;
    
    @PostMapping("/pay/")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public void add(@RequestBody Map<String, Cart> carts) {
        this.receiptService.addReceipt(carts);
    }
    
    @PostMapping("/stripe/")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public ResponseEntity<?> charge(@RequestBody Map<String, String> params) {
        ChargeDTO charge = this.stripeService.charge(params.get("token"), Double.parseDouble(params.get("amount")));
        return new ResponseEntity<>(charge, HttpStatus.OK);
    }
}
