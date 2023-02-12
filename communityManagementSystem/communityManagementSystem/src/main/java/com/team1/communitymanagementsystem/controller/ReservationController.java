package com.team1.communitymanagementsystem.controller;

import com.team1.communitymanagementsystem.entity.Amenity;
import com.team1.communitymanagementsystem.entity.Reservation;
import com.team1.communitymanagementsystem.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
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

        //see what timeslots are available, return an array of byte[10]

        @RequestMapping(value = "/amenity/{amenity_id}", method = RequestMethod.GET)
        public byte[] checkAvailability(@PathVariable("amenity_id") int id,
                                        @RequestParam(name = "date") LocalDate date){
                return new byte[]{};
        }
        //reserve a reservation, with user/amenity_ID/date/timeslot
        @RequestMapping(value = "/reserve", method = RequestMethod.POST)
        @ResponseStatus(value = HttpStatus.CREATED)
        public void makeAReservation(@RequestParam(name = "amenity_id") int id,
                                     @RequestParam(name = "date") LocalDate date,
                                     @RequestParam(name = "timeslot") short timeslot){

                //consistency and transactional
        }

}
