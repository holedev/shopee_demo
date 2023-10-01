/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.repository.impl;

import com.dev.dto.Cart;
import com.dev.pojo.OrderDetail;
import com.dev.pojo.SaleOrder;
import com.dev.repository.ProductRepository;
import com.dev.repository.ReceiptRepository;
import com.dev.repository.UserReppository;
import java.util.Date;
import java.util.Map;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author admin
 */
@Repository
public class ReceiptRepositoryImpl implements ReceiptRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private UserReppository userRepo;
    @Autowired
    private ProductRepository productRepo;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean addReceipt(Map<String, Cart> carts) {
        Session s = this.factory.getObject().getCurrentSession();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        try {
            SaleOrder order = new SaleOrder();
            order.setUserId(this.userRepo.getUserByUsername(auth.getName()));
            order.setCreatedDate(new Date());
            s.save(order);

            for (Cart c : carts.values()) {
                OrderDetail d = new OrderDetail();
                d.setNum(c.getQuantity());
                d.setUnitPrice(c.getUnitPrice());
                d.setOrderId(order);
                d.setProductId(this.productRepo.getProductById(c.getId()));
                s.save(d);
            }
            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
            return false;
        }
    }

}
