/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.service.impl;

import com.dev.pojo.Category;
import com.dev.pojo.Product;
import com.dev.repository.CategoryRepository;
import com.dev.repository.StatsRepository;
import com.dev.service.CategoryService;
import com.dev.service.StatsService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author admin
 */
@Service
public class StatsServiceImpl implements StatsService {
    
    @Autowired
    private StatsRepository statsRepo;

    @Override
    public List<Object[]> countProductByCate() {
        return this.statsRepo.countProductByCate();
    }

    @Override
    public List<Object[]> statsRevenue(Map<String, String> params) {
        return this.statsRepo.statsRevenue(params);
    }

    @Override
    public List<Product[]> getProductByCateId(Map<String, String> params) {
        return this.statsRepo.getProductByCateId(params);
    }

    @Override
    public List<Object[]> statsStore(Map<String, String> params) {
        return this.statsStore(params);
    }
    
    
}
