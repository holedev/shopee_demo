/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.controllers;

import com.dev.dto.ProductsWithPageCount;
import com.dev.pojo.Comment;
import com.dev.pojo.Product;
import com.dev.service.CategoryService;
import com.dev.service.CommentService;
import com.dev.service.ProductService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jca.cci.core.support.CommAreaRecord;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author admin
 */
@RestController
@RequestMapping("/api")
public class ApiProductController {

    @Autowired
    private ProductService prodService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private Environment env;

    @RequestMapping("/products/")
    @CrossOrigin
    public ResponseEntity<?> list(@RequestParam Map<String, String> params) {
        List<Product> data = this.prodService.getProducts(params);
        int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));
        int pageNumber = (int) Math.ceil(this.prodService.countProduct() * 1.0 / pageSize);
        return new ResponseEntity<>(new ProductsWithPageCount(data, pageNumber), HttpStatus.OK);
    }

    @PostMapping(path = "/products/",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<Product> addProduct(@RequestParam Map<String, String> params, @RequestPart MultipartFile image) {
        Product product = this.prodService.addOrUpdateProduct(params, image);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping(path = "/products/get-similar-pro/{id}/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<List<Product>> similar(@PathVariable(value = "id") int id) {
        return new ResponseEntity<>(this.prodService.getSimilarProduct(id), HttpStatus.OK);
    }

    @RequestMapping(path = "/products/{productId}/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<Product> details(@PathVariable(value = "productId") int id) {
        return new ResponseEntity<>(this.prodService.getProductById(id), HttpStatus.OK);
    }

    @RequestMapping("/products/get-by-store/{storeId}/")
    @CrossOrigin
    public ResponseEntity<List<Product>> getAllByStore(@PathVariable(value = "storeId") int storeId, @RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.prodService.getProductsByStore(storeId, params), HttpStatus.OK);
    }

    @DeleteMapping(path = "/products/{id}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable(value = "id") int id) {
        this.prodService.deleteProduct(id);
    }

//    @PostMapping("/products/get-similar-pro/")
//    @CrossOrigin
//    public ResponseEntity<?> getSimilarProduct() {
//        return new ResponseEntity<>(this.prodService.getSimilarProduct(1, "demos"), HttpStatus.OK);
//    }
}
