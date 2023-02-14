package com.team1.communitymanagementsystem.controller;

import com.team1.communitymanagementsystem.entity.Users;
import com.team1.communitymanagementsystem.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class SignUpController {

    private UsersService usersService;

    @Autowired
    public SignUpController(UsersService usersService) {

        this.usersService = usersService;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void signUp(@RequestBody Users user) {
        usersService.signUp(user);
    }

    @RequestMapping(value = "/signup/admin", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void adminRegister(@RequestBody Users user) {
        usersService.adminRegister(user);
    }

}