package com.team1.communitymanagementsystem.entity;
//import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "announcement")
public class Announcement {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String user; //email

    @Enumerated(EnumType.STRING)
    private Categories category;

    private String title;

    private String Content;
    //@DateTimeFormat(pattern = "yyyy/MM/dd hh:mm:ss")
    private LocalDateTime timestamp;

    private boolean visible; //Default value is false, means it is open to all. If true, announcement is invisible by users.

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Categories getCategory() {
        return category;
    }

    public void setCategory(Categories category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
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

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }


}
