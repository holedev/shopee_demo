package com.dev.pojo;

import com.dev.pojo.Comment;
import com.dev.pojo.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2023-09-08T16:21:39")
@StaticMetamodel(CommentStore.class)
public class CommentStore_ { 

    public static volatile SingularAttribute<CommentStore, Comment> commentId;
    public static volatile SingularAttribute<CommentStore, Integer> id;
    public static volatile SingularAttribute<CommentStore, User> storeId;

}