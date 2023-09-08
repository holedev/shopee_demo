/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dev.service;

import com.dev.pojo.Product;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author admin
 */
public interface ProductService {
    List<Product> getProducts(Map<String, String> params);
    Long countProduct();
    Product addOrUpdateProduct(Map<String, String> params, MultipartFile image);
    Product getProductById(int id);
    boolean deleteProduct(int id);
    List<Product> getProductsByStore(int id, Map<String, String> params);
}
