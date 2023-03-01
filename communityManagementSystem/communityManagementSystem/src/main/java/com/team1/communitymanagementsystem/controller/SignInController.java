package com.team1.communitymanagementsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team1.communitymanagementsystem.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Controller
public class SignInController {

    @Autowired
    UsersService usersService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // we only process the failed login request here, if login successfully, it will automatically redirect to home page
    @RequestMapping("/login")
    public void login(@RequestParam(value = "error") String error, HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        Map<String, Object> data = new HashMap<>();
        data.put("message", "bad credentials");
        response.getOutputStream()
                .println(objectMapper.writeValueAsString(data));
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    @ResponseBody
    public String[] getUserInfo(){
        return usersService.getUserInfo();
    }
}