package com.team1.communitymanagementsystem.service;

import com.team1.communitymanagementsystem.dao.ReservationDao;
import com.team1.communitymanagementsystem.entity.Amenity;
import com.team1.communitymanagementsystem.entity.Reservation;
import com.team1.communitymanagementsystem.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {
    //create new reservation
    //user input:amenityID, date, time

    @Autowired
    private ReservationDao reservationDao;

    @Autowired
    private UsersService usersService;

    public List<Amenity> getAmenity(){ return reservationDao.getAmenities();}


    public List<Reservation> getMyReservations(){

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();

        String userEmail = loggedInUser.getName();

        Users user = usersService.getUser(userEmail);

        if(user != null){
            List<Reservation> myReservations= user.getReservation();

            return myReservations;
        }

        return new ArrayList<Reservation>();

    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void makeAReservation(int amenity_id, LocalDate date, short timeslot){
        //authenticate and then save reservation
    }
}
