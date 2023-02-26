package com.team1.communitymanagementsystem.service;

import com.team1.communitymanagementsystem.dao.ChatDao;
import org.springframework.beans.factory.annotation.Autowired;
import com.team1.communitymanagementsystem.entity.Chat;
import com.team1.communitymanagementsystem.entity.Users;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.team1.communitymanagementsystem.dao.UsersDao;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {
    @Autowired
    private ChatDao chatDao;
    @Autowired
    private UsersDao usersDao;

    public List<Chat> getMessageList(){
        return chatDao.getMessageList();
    }

    public List<Chat> getOwnMessageList(){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = loggedInUser.getName();
        Users user = usersDao.getUser(userEmail);
        List<Chat> own = user.getMessages();
        return own;
    }

    public void sendMessage(Chat message){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = loggedInUser.getName();
        chatDao.sendMessage(message, userEmail);
    }

    public void deleteMessage(int id){
        chatDao.deleteMessage(id);
    }

    public void handleMessage(int id){
        chatDao.handleMessage(id);
    }
}
