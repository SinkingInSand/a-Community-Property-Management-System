package com.team1.communitymanagementsystem.controller;

import com.team1.communitymanagementsystem.entity.Amenity;
import com.team1.communitymanagementsystem.entity.Reservation;
import com.team1.communitymanagementsystem.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class ReservationController {

        @Autowired
        private ReservationService reservationService;

        //return the complete list of amenities to client (logged in or out)
        @RequestMapping(value = "/amenity", method = RequestMethod.GET)
        @ResponseBody
        public List<Amenity> getAmenities(){
            return reservationService.getAmenity();
        }

        //return the complete list of reservations to client (for logged-in users only)
        @RequestMapping(value="/myreservations", method = RequestMethod.GET)
        @ResponseBody
        public List<Reservation> getMyReservations(){return reservationService.getMyReservations();}

        //delete reservation

        @RequestMapping(value="/deletereservations", method = RequestMethod.POST)
        @ResponseBody
        public String deleteAReservation(@RequestParam(name ="reservation_id") int id){

                return reservationService.deleteAReservation(id) ? "Successful" : "Failed";
        }


        //see what timeslots are available, return a string of 10 numbers (0 or 1)
        @RequestMapping(value = "/checkAvailability", method = RequestMethod.GET)
        @ResponseBody
        public String checkAvailability(@RequestParam(name ="amenity_id") int id,
                                        @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                        LocalDate date){

                return Arrays.toString(reservationService.getAvailability(id, date));
        }

        //reserve a reservation, with user/amenity_ID/date/timeslot
        @RequestMapping(value = "/reserve", method = RequestMethod.POST)
        @ResponseStatus(value = HttpStatus.CREATED)
        public void makeAReservation(@RequestParam(name = "amenity_id") int id,
                                     @RequestParam(name = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                     @RequestParam(name = "timeslot") short timeslot){

                //consistency and transactional
                reservationService.makeAReservation(id, date,timeslot);
        }

}
