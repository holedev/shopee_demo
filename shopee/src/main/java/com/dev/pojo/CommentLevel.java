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
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author dorara
 */
@Entity
@Table(name = "comment_level")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CommentLevel.findAll", query = "SELECT c FROM CommentLevel c"),
    @NamedQuery(name = "CommentLevel.findById", query = "SELECT c FROM CommentLevel c WHERE c.id = :id"),
    @NamedQuery(name = "CommentLevel.findByLevel", query = "SELECT c FROM CommentLevel c WHERE c.level = :level")})
public class CommentLevel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "level")
    private int level;
    @JoinColumn(name = "comment_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Comment commentId;
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Comment parentId;

    public CommentLevel() {
    }

    public CommentLevel(Integer id) {
        this.id = id;
    }

    public CommentLevel(Integer id, int level) {
        this.id = id;
        this.level = level;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Comment getParentId() {
        return parentId;
    }

    public void setParentId(Comment parentId) {
        this.parentId = parentId;
    }
    
    public Comment getCommentId() {
        return commentId;
    }

    public void setCommentId(Comment commentId) {
        this.commentId = commentId;
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
        if (!(object instanceof CommentLevel)) {
            return false;
        }
        CommentLevel other = (CommentLevel) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.dev.pojo.CommentLevel[ id=" + id + " ]";
    }
    
}
