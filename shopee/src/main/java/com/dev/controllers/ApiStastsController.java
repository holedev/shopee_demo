/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.controllers;

//import com.dev.pojo.Cart;
//import com.dev.service.ReceiptService;
import com.dev.dto.Cart;
import com.dev.pojo.Product;
import com.dev.service.ReceiptService;
import com.dev.service.StatsService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

/**
 *
 * @author admin
 */
@RestController
@RequestMapping("/api")
public class ApiStastsController {
    @Autowired
    private StatsService statsService;
    
    @GetMapping("/stats/")
    @CrossOrigin
    public ResponseEntity<?> stats(@RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.statsService.statsRevenue(params), HttpStatus.OK);
    }
    
    @GetMapping("/stats/get-pro-by-cate/")
    @CrossOrigin
    public ResponseEntity<?> getProByCateId(@RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.statsService.getProductByCateId(params), HttpStatus.OK);
    }
}
