/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.repository.impl;

import com.dev.pojo.Comment;
import com.dev.pojo.CommentLevel;
import com.dev.pojo.CommentProduct;
import com.dev.pojo.CommentStore;
import com.dev.pojo.Product;
import com.dev.repository.CommentRepository;
import com.dev.repository.ProductRepository;
import com.dev.repository.UserReppository;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.boot.spi.SessionFactoryBuilderFactory;
import org.hibernate.query.Query;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author huu-thanhduong
 */
@Repository
@Transactional
public class CommentRepositoryImpl implements CommentRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private UserReppository userRepo;
    @Autowired
    private ProductRepository productRepo;

    @Override
    public Comment getCommentById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.get(Comment.class, id);
    }

    @Override
    public List<?> getComments(int id, String type) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        q.distinct(true);
        List<Predicate> predicates = new ArrayList<>();

        Root rC = q.from(Comment.class);
        Root rCL = q.from(CommentLevel.class);
        if (type.equals("products")) {
            Root rCP = q.from(CommentProduct.class);
            q.multiselect(rC.get("id"), rC.get("content"), rC.get("createdDate"), rC.get("userId"), rCL.get("parentId").get("id"), rCL.get("level"));
            predicates.add(b.equal(rCP.get("productId"), id));
            predicates.add(b.equal(rC.get("id"), rCP.get("commentId")));
            predicates.add(b.equal(rC.get("id"), rCL.get("commentId")));
        }
        else if (type.equals("stores")) {
            Root rCS = q.from(CommentStore.class);
            q.multiselect(rC.get("id"), rC.get("content"), rC.get("createdDate"), rC.get("userId"));
            predicates.add(b.equal(rCS.get("storeId"), id));
            predicates.add(b.equal(rCS.get("commentId"), rC.get("id")));
        }

        q.where(predicates.toArray(new Predicate[0]));

        Query<Object[]> typedQuery = s.createQuery(q);
        List<Object[]> results = typedQuery.getResultList();
        return results;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public Comment addComment(Map<String, String> req) {
        Session s = this.factory.getObject().getCurrentSession();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        try {
            int productId = -1;
            if (req.get("productId") != null) {
                productId = Integer.parseInt(req.get("productId"));
            }
            String content = null;
            if (req.get("content") != null) {
                content = req.get("content");
            }
            int storeId = -1;
            if (req.get("storeId") != null) {
                storeId = Integer.parseInt(req.get("storeId"));
            }

            Comment comment = new Comment();
            comment.setContent(content);
            comment.setCreatedDate(new Date());
            comment.setUserId(userRepo.getUserByUsername(auth.getName()));
            s.save(comment);

            if (productId != -1) {
                CommentProduct commentProduct = new CommentProduct();
                commentProduct.setProductId(productRepo.getProductById(productId));
                commentProduct.setCommentId(comment);
                s.save(commentProduct);

                CommentLevel commentLevel = new CommentLevel();
                commentLevel.setCommentId(comment);
                if (req.get("parentId") != null) {
                    int parentId = Integer.parseInt(req.get("parentId"));
                    commentLevel.setParentId(this.getCommentById(parentId));
                    commentLevel.setLevel(2);
                } else {
                    commentLevel.setLevel(1);
                }
                s.save(commentLevel);
            }
            if (storeId != -1) {
                CommentStore commentStore = new CommentStore();
                commentStore.setStoreId(this.userRepo.getUserById(storeId));
                commentStore.setCommentId(comment);
                s.save(commentStore);
            }

            return comment;
        } catch (NumberFormatException ex) {
            ex.printStackTrace();
            return null;
        } catch (HibernateException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteComment(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        Comment c = this.getCommentById(id);
        try {
            session.delete(c);
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }

}
