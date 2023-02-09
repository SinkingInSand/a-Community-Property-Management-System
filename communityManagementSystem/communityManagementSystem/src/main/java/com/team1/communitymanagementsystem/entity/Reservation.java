package com.team1.communitymanagementsystem.entity;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
@Entity
@Table(name = "reservation")
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Users user;

    @ManyToOne
    private Amenity amenity;

    private short timeSlot; //8:00 - 8:59 encoded to 1, 9:00-9:59 encoded to 2, ..., 19:00 - 19:59 encoded to 12
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate reservationDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public short getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(short timeSlot) {
        this.timeSlot = timeSlot;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }
    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Amenity getAmenity() {
        return amenity;
    }

    public void setAmenity(Amenity amenity) {
        this.amenity = amenity;
    }
}
