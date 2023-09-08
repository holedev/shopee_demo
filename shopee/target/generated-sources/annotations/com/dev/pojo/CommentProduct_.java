package com.dev.pojo;

import com.dev.pojo.Comment;
import com.dev.pojo.Product;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2023-09-08T16:21:39")
@StaticMetamodel(CommentProduct.class)
public class CommentProduct_ { 

    public static volatile SingularAttribute<CommentProduct, Product> productId;
    public static volatile SingularAttribute<CommentProduct, Comment> commentId;
    public static volatile SingularAttribute<CommentProduct, Integer> id;

}