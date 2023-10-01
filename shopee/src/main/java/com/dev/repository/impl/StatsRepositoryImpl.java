/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.repository.impl;

import com.dev.pojo.Category;
import com.dev.pojo.OrderDetail;
import com.dev.pojo.Product;
import com.dev.pojo.SaleOrder;
import com.dev.pojo.User;
import com.dev.repository.StatsRepository;
import com.dev.repository.UserReppository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author admin
 */
@Repository
@Transactional
public class StatsRepositoryImpl implements StatsRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private UserReppository userRepo;
    @Autowired
    private SimpleDateFormat f;

    @Override
    public List<Object[]> countProductByCate() {
        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        Root rP = q.from(Product.class);
        Root rC = q.from(Category.class);

        q.multiselect(rC.get("id"), rC.get("name"), b.count(rP.get("id")));

        q.where(b.equal(rP.get("category"), rC.get("id")));
        q.groupBy(rC.get("id"));

        Query query = session.createQuery(q);
        return query.getResultList();
    }

    @Override
    public List<Object[]> statsRevenue(Map<String, String> params) {
        Session session = this.factory.getObject().getCurrentSession();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        Root rP = q.from(Product.class);
        Root rD = q.from(OrderDetail.class);
        Root rO = q.from(SaleOrder.class);

        q.multiselect(rP.get("id"), rP.get("name"), b.sum(b.prod(rD.get("unitPrice"), rD.get("num"))));

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(rD.get("productId"), rP.get("id")));
        predicates.add(b.equal(rD.get("orderId"), rO.get("id")));
        predicates.add(b.equal(rP.get("storeId"), this.userRepo.getUserByUsername(auth.getName()).getId()));

        String cateId = params.get("cateId");
        if (cateId != null && !cateId.isEmpty()) {
            predicates.add(b.equal(rP.get("categoryId"), Integer.valueOf(cateId)));
        }

        String productId = params.get("productId");
        if (productId != null && !productId.isEmpty()) {
            predicates.add(b.equal(rP.get("id"), Integer.valueOf(productId)));
        }

        String year = params.get("year");
        if (year != null && !year.isEmpty()) {
            predicates.add(b.equal(b.function("YEAR", Integer.class, rO.get("createdDate")), Integer.parseInt(year)));
            String quarter = params.get("quarter");
            if (quarter != null && !quarter.isEmpty()) {
                predicates.addAll(Arrays.asList(
                        b.equal(b.function("YEAR", Integer.class, rO.get("createdDate")), Integer.parseInt(year)),
                        b.equal(b.function("QUARTER", Integer.class, rO.get("createdDate")), Integer.parseInt(quarter))
                ));
            }

            String month = params.get("month");
            if (month != null && !month.isEmpty()) {
                predicates.addAll(Arrays.asList(
                        b.equal(b.function("YEAR", Integer.class, rO.get("createdDate")), Integer.parseInt(year)),
                        b.equal(b.function("MONTH", Integer.class, rO.get("createdDate")), Integer.parseInt(month))
                ));

            }
        }

        

        q.where(predicates.toArray(Predicate[]::new));

        q.groupBy(rP.get("id"));

        Query query = session.createQuery(q);
        return query.getResultList();
    }

    @Override
    public List<Product[]> getProductByCateId(Map<String, String> params) {
        Session session = this.factory.getObject().getCurrentSession();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Product> q = b.createQuery(Product.class);
        Root root = q.from(Product.class);
        q.select(root);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(root.get("storeId"), this.userRepo.getUserByUsername(auth.getName()).getId()));

        String cateId = params.get("cateId");
        if (cateId != null && !cateId.isEmpty()) {
            predicates.add(b.equal(root.get("categoryId"), Integer.valueOf(cateId)));
        }

        q.where(predicates.toArray(Predicate[]::new));

        q.orderBy(b.asc(root.get("id")));

        Query query = session.createQuery(q);

        return query.getResultList();
    }

    @Override
    public List<Object[]> statsStore(Map<String, String> params) {
        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        
        Root rP = q.from(Product.class);
        Root rD = q.from(OrderDetail.class);
        Root rO = q.from(SaleOrder.class);
        
        q.multiselect(rP.get("storeId"), b.countDistinct(rP), b.sum(rD.get("num")));
        
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(rD.get("productId"), rP.get("id")));
        predicates.add(b.equal(rD.get("orderId"), rO.get("id")));
        
        String cateId = params.get("cateId");
        if (cateId != null && !cateId.isEmpty()) {
            predicates.add(b.equal(rP.get("categoryId"), Integer.valueOf(cateId)));
        }

        String storeId = params.get("storeId");
        if (storeId != null && !storeId.isEmpty()) {
            predicates.add(b.equal(rP.get("storeId"), Integer.valueOf(storeId)));
        }

        String year = params.get("year");
        if (year != null && !year.isEmpty()) {
            predicates.add(b.equal(b.function("YEAR", Integer.class, rO.get("createdDate")), Integer.parseInt(year)));
            String quarter = params.get("quarter");
            if (quarter != null && !quarter.isEmpty()) {
                predicates.addAll(Arrays.asList(
                        b.equal(b.function("YEAR", Integer.class, rO.get("createdDate")), Integer.parseInt(year)),
                        b.equal(b.function("QUARTER", Integer.class, rO.get("createdDate")), Integer.parseInt(quarter))
                ));
            }

            String month = params.get("month");
            if (month != null && !month.isEmpty()) {
                predicates.addAll(Arrays.asList(
                        b.equal(b.function("YEAR", Integer.class, rO.get("createdDate")), Integer.parseInt(year)),
                        b.equal(b.function("MONTH", Integer.class, rO.get("createdDate")), Integer.parseInt(month))
                ));

            }
        }

        

        q.where(predicates.toArray(Predicate[]::new));
        q.groupBy(rP.get("storeId"));

        Query query = session.createQuery(q);
        return query.getResultList();
    }

}
