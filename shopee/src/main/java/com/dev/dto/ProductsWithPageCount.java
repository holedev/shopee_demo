/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.dto;

import com.dev.pojo.Product;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author dorara
 */
@Getter
@Setter
public class ProductsWithPageCount {
    private List<Product> products;
    private int pageNumber;
    
    public ProductsWithPageCount(List<Product> products, int pageNumber) {
        this.products = products;
        this.pageNumber = pageNumber;
    }
    
}
