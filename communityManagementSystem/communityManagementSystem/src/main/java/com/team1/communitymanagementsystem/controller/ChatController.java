package com.team1.communitymanagementsystem.controller;

import com.team1.communitymanagementsystem.entity.Announcement;
import com.team1.communitymanagementsystem.entity.Chat;
import com.team1.communitymanagementsystem.entity.Post;
import com.team1.communitymanagementsystem.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
public class ChatController {
    @Autowired
    private ChatService chatService;

    //Admin access only
    @RequestMapping(value = "/allMessages", method = RequestMethod.GET)
    @ResponseBody
    public List<Chat> getMessageList() {
        return chatService.getMessageList();
    }

    //open to all
    @RequestMapping(value = "/messages", method = RequestMethod.GET)
    @ResponseBody
    public List<Chat> getOwnMessageList() {
        return chatService.getOwnMessageList();
    }

    @RequestMapping(value = "/sendMessage", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void sendMessage(@RequestBody Chat message) {
        chatService.sendMessage(message);
    }

    @RequestMapping(value = "/messages/{id}/delete", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteMessage(@PathVariable(value = "id") int id){
        chatService.deleteMessage(id);
    }

    @RequestMapping(value = "/allMessages/{id}/read", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void handleMessage(@PathVariable(value = "id") int id){
        chatService.handleMessage(id);
    }




}
