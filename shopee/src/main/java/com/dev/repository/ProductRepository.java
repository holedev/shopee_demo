/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dev.repository;

import com.dev.pojo.Product;
import java.util.List;
import java.util.Map;

/**
 *
 * @author admin
 */
public interface ProductRepository {
    List<Product> getProducts(Map<String, String> params);
    Long countProduct();
    int addOrUpdateProduct(Product p, String mode);
    Product getProductById(int id);
    boolean deleteProduct(int id);
    List<Product> getProductsByStore(int id, Map<String, String> params);
}
