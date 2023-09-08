/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dev.pojo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author dorara
 */
@Entity
@Table(name = "comment_store")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CommentStore.findAll", query = "SELECT c FROM CommentStore c"),
    @NamedQuery(name = "CommentStore.findById", query = "SELECT c FROM CommentStore c WHERE c.id = :id")})
public class CommentStore implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "comment_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Comment commentId;
    @JoinColumn(name = "store_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User storeId;

    public CommentStore() {
    }

    public CommentStore(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Comment getCommentId() {
        return commentId;
    }

    public void setCommentId(Comment commentId) {
        this.commentId = commentId;
    }

    public User getStoreId() {
        return storeId;
    }

    public void setStoreId(User storeId) {
        this.storeId = storeId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CommentStore)) {
            return false;
        }
        CommentStore other = (CommentStore) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.dev.pojo.CommentStore[ id=" + id + " ]";
    }
    
}
