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
import java.time.ZoneId;
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

        return new ArrayList<>();

    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public byte[] getAvailability (int amenityId, LocalDate date){

        //validate date and amenityId (simple check for now)
        if(date.isBefore(LocalDate.now(ZoneId.of("America/New_York"))) || amenityId > 4 || amenityId < 1){
            return null;
        }

        List<Reservation> reservationList= reservationDao.getReservationByDateByAmenity(amenityId,date);

        if(reservationList.isEmpty()){
            return new byte[]{0,0,0,0,0,0,0,0,0,0};
        } else {
            byte[] result = new byte[10];
            for(Reservation res : reservationList){
                short timeslot = res.getTimeSlot();
                result[timeslot - 1] = 1;
            }
            return result;
        }
    }


    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void makeAReservation(int amenity_id, LocalDate date, short timeslot){
        Reservation reservation = new Reservation();

        //authenticate to get user
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = loggedInUser.getName();
        Users user = usersService.getUser(userEmail);

        //get Amenity
        Amenity amenity = reservationDao.getAmenity(amenity_id);

        reservation.setReservationDate(date);
        reservation.setAmenity(amenity);
        reservation.setUser(user);
        reservation.setTimeSlot(timeslot);
        //user.getReservation().add(reservation);
        reservationDao.saveAReservation(reservation);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public boolean deleteAReservation(int reserv_id){
        //authenticate to get user
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = loggedInUser.getName();
        Users user = usersService.getUser(userEmail);

        //check if user is owner, if true, then proceed with delete, if false return not deleted
        //admin?
        if(user != null && reservationDao.canDelete(reserv_id, user)){
            reservationDao.deleteAReservation(reserv_id);
            return true;
        } else {
            return false;
        }

    }


}
