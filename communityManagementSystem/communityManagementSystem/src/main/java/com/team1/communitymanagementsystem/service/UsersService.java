package com.team1.communitymanagementsystem.service;

import com.team1.communitymanagementsystem.dao.UsersDao;
import com.team1.communitymanagementsystem.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private UsersDao usersDao;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UsersDao usersDao, PasswordEncoder passwordEncoder) {
        this.usersDao = usersDao;
        this.passwordEncoder = passwordEncoder;
    }

    public void signUp(Users user) {
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        usersDao.signUp(user);
    }

    public void adminRegister(Users user){
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        usersDao.adminRegister(user);
    }

    public Users getUser(String email) {
        return usersDao.getUser(email);
    }
    public String[] getUserInfo(){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = loggedInUser.getName();
        Users user = getUser(userEmail);
        return usersDao.getUserInfo(user);
    }
    //get all reservation list
    //display all announcement and posts announcementService.display();
}
