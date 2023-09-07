package com.dev.pojo;

import com.dev.pojo.Category;
import com.dev.pojo.OrderDetail;
import com.dev.pojo.ProdTag;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2023-09-08T00:14:16")
@StaticMetamodel(Product.class)
public class Product_ { 

    public static volatile SingularAttribute<Product, String> image;
    public static volatile SingularAttribute<Product, Date> createdDate;
    public static volatile SetAttribute<Product, ProdTag> prodTagSet;
    public static volatile SingularAttribute<Product, Long> price;
    public static volatile SingularAttribute<Product, String> name;
    public static volatile SingularAttribute<Product, String> description;
    public static volatile SingularAttribute<Product, Boolean> active;
    public static volatile SingularAttribute<Product, Integer> id;
    public static volatile SetAttribute<Product, OrderDetail> orderDetailSet;
    public static volatile SingularAttribute<Product, Category> categoryId;
    public static volatile SingularAttribute<Product, String> manufacturer;

}