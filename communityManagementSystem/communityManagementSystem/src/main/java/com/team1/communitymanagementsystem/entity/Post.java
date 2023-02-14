package com.team1.communitymanagementsystem.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;
@Entity
@Table(name = "post")
public class Post implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String subject;
    private String user; //email
    private String content;

    private LocalDateTime timestamp;

    //In MySql id starts from1, so we can set the root post id as 0.
    private int parentPostId;
    private boolean visible; //public:false, private:true

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public int getParentPostId() {
        return parentPostId;
    }

    public void setParentPostId(int parentPostId) {
        this.parentPostId = parentPostId;
    }
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
