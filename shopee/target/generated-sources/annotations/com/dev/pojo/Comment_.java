package com.dev.pojo;

import com.dev.pojo.CommentLevel;
import com.dev.pojo.CommentProduct;
import com.dev.pojo.CommentStore;
import com.dev.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2023-09-08T16:21:39")
@StaticMetamodel(Comment.class)
public class Comment_ { 

    public static volatile SetAttribute<Comment, CommentStore> commentStoreSet;
    public static volatile SingularAttribute<Comment, Date> createdDate;
    public static volatile SetAttribute<Comment, CommentProduct> commentProductSet;
    public static volatile SetAttribute<Comment, CommentLevel> commentLevelSet;
    public static volatile SingularAttribute<Comment, Integer> id;
    public static volatile SingularAttribute<Comment, User> userId;
    public static volatile SingularAttribute<Comment, String> content;

}