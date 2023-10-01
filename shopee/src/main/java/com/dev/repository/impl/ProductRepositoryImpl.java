/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.repository.impl;

import com.dev.pojo.Product;
import com.dev.repository.GPTRepository;
import com.dev.repository.ProductRepository;
import com.dev.repository.UserReppository;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author admin
 */
@Repository
@Transactional
@PropertySource("classpath:configs.properties")
public class ProductRepositoryImpl implements ProductRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private GPTRepository GPTRepo;
    @Autowired
    private Environment env;

    @Override
    public List<Product> getProducts(Map<String, String> params) {
        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Product> q = b.createQuery(Product.class);
        Root root = q.from(Product.class);
        q.select(root);

        if (params != null) {
            List<Predicate> predicates = new ArrayList<>();

            String kw = params.get("kw");
            if (kw != null && !kw.isEmpty()) {
                predicates.add(b.like(root.get("name"), String.format("%%%s%%", kw)));
            }

            String store = params.get("store");
            if (store != null && !store.isEmpty()) {
                predicates.add(b.equal(root.get("storeId"), Integer.parseInt(store)));
            }

            String price = params.get("price");
            if (price != null && !price.isEmpty()) {
                int value = Integer.parseInt(price);
                switch (value) {
                    case 1:
                        predicates.add(b.lessThan(root.get("price"), 100000));
                        break;
                    case 2:
                        predicates.add(b.lessThan(root.get("price"), 200000));
                        predicates.add(b.greaterThanOrEqualTo(root.get("price"), 100000));
                        break;
                    case 3:
                        predicates.add(b.lessThan(root.get("price"), 500000));
                        predicates.add(b.greaterThanOrEqualTo(root.get("price"), 200000));
                        break;
                    case 4:
                        predicates.add(b.lessThan(root.get("price"), 1000000));
                        predicates.add(b.greaterThanOrEqualTo(root.get("price"), 500000));
                        break;
                    case 5:
                        predicates.add(b.greaterThanOrEqualTo(root.get("price"), 1000000));
                        break;
                    default:
                        throw new AssertionError();
                }
            }

            q.where(predicates.toArray(Predicate[]::new));

            String sort = params.get("sort");
            if (sort != null && !sort.isEmpty()) {
                q.orderBy(b.asc(root.get(sort)));
            }
        }

        Query query = session.createQuery(q);

        if (params != null) {
            String page = params.get("page");
            if (page != null && !page.isEmpty()) {
                int p = Integer.parseInt(page);
                int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));

                query.setMaxResults(pageSize);
                query.setFirstResult((p - 1) * pageSize);
            }
        }

        return query.getResultList();
    }

    @Override
    public Long countProduct() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("SELECT Count(*) FROM Product");

        return Long.parseLong(q.getSingleResult().toString());
    }

    @Override
    public int addOrUpdateProduct(Product p, String mode) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            if (p.getId() == null) {
                Serializable productId = s.save(p);
                p.setId((Integer) productId);
            } else {
                s.update(p);
            }

            return p.getId();
        } catch (HibernateException ex) {
            ex.printStackTrace();
            return -1;
        }
    }

    @Override
    public Product getProductById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.get(Product.class, id);
    }

    @Override
    public boolean deleteProduct(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        Product p = this.getProductById(id);
        try {
            session.delete(p);
            return true;
        } catch (HibernateException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Product> getProductsByStore(int id, Map<String, String> params) {
        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Product> q = b.createQuery(Product.class);
        Root root = q.from(Product.class);
        q.select(root);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(root.get("storeId"), id));

        if (params != null) {

            String kw = params.get("kw");
            if (kw != null && !kw.isEmpty()) {
                predicates.add(b.like(root.get("name"), String.format("%%%s%%", kw)));
            }

            String price = params.get("price");
            if (price != null && !price.isEmpty()) {
                int value = Integer.parseInt(price);
                switch (value) {
                    case 1:
                        predicates.add(b.lessThan(root.get("price"), 100000));
                        break;
                    case 2:
                        predicates.add(b.lessThan(root.get("price"), 200000));
                        predicates.add(b.greaterThanOrEqualTo(root.get("price"), 100000));
                        break;
                    case 3:
                        predicates.add(b.lessThan(root.get("price"), 500000));
                        predicates.add(b.greaterThanOrEqualTo(root.get("price"), 200000));
                        break;
                    case 4:
                        predicates.add(b.lessThan(root.get("price"), 1000000));
                        predicates.add(b.greaterThanOrEqualTo(root.get("price"), 500000));
                        break;
                    case 5:
                        predicates.add(b.greaterThanOrEqualTo(root.get("price"), 1000000));
                        break;
                    default:
                        throw new AssertionError();
                }
            }

            q.where(predicates.toArray(Predicate[]::new));

            String sort = params.get("sort");
            if (sort != null && !sort.isEmpty()) {
                q.orderBy(b.asc(root.get(sort)));
            }
        }

        Query query = session.createQuery(q);

        if (params != null) {
            String page = params.get("page");
            if (page != null && !page.isEmpty()) {
                int p = Integer.parseInt(page);
                int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));

                query.setMaxResults(pageSize);
                query.setFirstResult((p - 1) * pageSize);
            }
        }

        return query.getResultList();
    }

    @Override
    public List<Product> getSimilarProduct(int id) {
//        Session s = this.factory.getObject().getCurrentSession();
//        Query q = s.createQuery("SELECT id, name FROM Product");
//
//        String res = "[";
//        List<?> data = q.getResultList();
//
//        for (Object arrayObject : data) {
//            Object[] array = (Object[]) arrayObject;
//            res += "{";
//            for (Object element : array) {
//                res += element;
//                res += " - ";
//            }
//            res += "},";
//        }
//        res += "]";
//        
//        String promt = "Thông tin đầu vào có dạng một mảng các sản phẩm gồm có id và tên của sản phẩm: ";
//        promt += res;
//        promt += ".Dựa vào tên sản phẩm tìm các sản phẩm tương tự 'demo'. "
//                + "Chỉ trả về cho tôi thông tin đầu ra dưới dạng một mảng json gồm có id và tên của sản phẩm. "
//                + "Nếu không có sản phẩm phù hợp trả về mảng rỗng, không cần giải thích.";
//        return GPTRepo.chatGPT(promt);

        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Product> q = b.createQuery(Product.class);
        Root root = q.from(Product.class);
        q.select(root);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(root.get("categoryId"), id));
        q.where(predicates.toArray(Predicate[]::new));
        Query query = session.createQuery(q);
        
        return query.getResultList();
    }

}
