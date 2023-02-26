package com.team1.communitymanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
@Entity
@Table(name = "users")
public class Users implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    private String email;
    private String userName;
    private String password;
    private String unit;
    //if true, user is admin; or user is resident.
    //The default value of boolean type data is false. As we don't have a setter for admin,
    //the new registered users are all residents.

    public boolean isEnabled() {
        return enabled;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    //one user can have N announcements
    @JsonIgnore
    private boolean enabled;
    /*@OneToMany(mappedBy = "user",  cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Announcement> announcementList;*/
    //one user can have N posts
    @OneToMany(mappedBy = "user",  cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private List<Post> postList;

    @OneToMany(mappedBy = "user",  cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private List<Reservation> reservation;

    public List<Chat> getMessages() {
        return messages;
    }

    public void setMessages(List<Chat> messages) {
        this.messages = messages;
    }

    @OneToMany(mappedBy = "userEmail",  cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private List<Chat> messages;
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUnit(String unit) { this.unit = unit; }

    public String getUnit() { return unit; }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }


    public List<Post> getPostList() { return postList; }

    public void setPostList(List<Post> postList) { this.postList = postList; }

    public List<Reservation> getReservation() {
        return reservation;
    }

    public void setReservation(List<Reservation> reservation) {
        this.reservation = reservation;
    }
}

