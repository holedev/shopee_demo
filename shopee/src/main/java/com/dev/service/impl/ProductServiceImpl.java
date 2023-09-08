/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dev.pojo.Product;
import com.dev.repository.CategoryRepository;
import com.dev.repository.ProductRepository;
import com.dev.repository.UserReppository;
import com.dev.service.ProductService;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author admin
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserReppository userReppository;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public List<Product> getProducts(Map<String, String> params) {
        return this.productRepo.getProducts(params);
    }

    @Override
    public Long countProduct() {
        return this.productRepo.countProduct();
    }

    @Override
    public Product addOrUpdateProduct(Map<String, String> params, MultipartFile image) {
        Product p = new Product();
        p.setName(params.get("name"));
        p.setDescription(params.get("description"));
        p.setPrice(Long.valueOf(params.get("price")));
        try {
            p.setCategoryId(categoryRepository.getCateById(Integer.parseInt(params.get("categoryId"))));
        } catch (NumberFormatException ex) {
        }
        p.setStoreId(userReppository.getUserById(Integer.parseInt(params.get("storeId"))));
        p.setCreatedDate(new Date());
        if (!image.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(image.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                p.setImage(res.get("secure_url").toString());
            } catch (IOException ex) {
                Logger.getLogger(ProductServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        int res = this.productRepo.addOrUpdateProduct(p, params.get("mode"));

        if (res != -1) {
            return productRepo.getProductById(res);
        }
        return null;
    }

    @Override
    public Product getProductById(int id) {
        return this.productRepo.getProductById(id);
    }

    @Override
    public boolean deleteProduct(int id) {
        return this.productRepo.deleteProduct(id);
    }

    @Override
    public List<Product> getProductsByStore(int id, Map<String, String> params) {
        return this.productRepo.getProductsByStore(id, params);
    }

}
