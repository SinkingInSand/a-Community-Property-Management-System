package com.team1.communitymanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.*;
import javax.persistence.*;

@Entity
@Table(name = "amenity")
public class Amenity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private int id;
    private String amenityName;
    @JsonIgnore
    private String imageUrl;

    @OneToMany(mappedBy = "amenity",  cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Reservation> reservation;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAmenityName() {
        return amenityName;
    }

    public void setAmenityName(String amenityName) {
        this.amenityName = amenityName;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Reservation> getReservation() {
        return reservation;
    }

    public void setReservation(List<Reservation> reservation) {
        this.reservation = reservation;
    }

}
