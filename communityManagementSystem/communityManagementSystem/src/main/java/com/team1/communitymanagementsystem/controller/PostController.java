package com.team1.communitymanagementsystem.controller;

import com.team1.communitymanagementsystem.entity.Post;
import com.team1.communitymanagementsystem.entity.Users;
import com.team1.communitymanagementsystem.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@Controller
public class PostController {
    @Autowired
    private PostService postService;

    @RequestMapping(value = "/sendPost", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void sendPost(
            @RequestParam("content") String content,
            @RequestParam("parentPostId") int parentPostId,
            @RequestParam("timeStamp") LocalDateTime timestamp,
            Principal principal){
        Post post = new Post();
        post.setContent(content);
        post.setParentPostId(parentPostId);
        post.setTimestamp(timestamp);
        post.setVisible(true);
        Users user = new Users();
        //user.setEmail("Team1@gmail.com");
        user.setEmail(principal.getName());
        post.setUser(user);
        postService.addPost(post);
    }

    @RequestMapping(value = "/viewPosts/{post_id}", method = RequestMethod.DELETE)
    
    @ResponseStatus(value = HttpStatus.OK)
    public void deletePost(@PathVariable int post_id, Principal principal){
        postService.deletePost(post_id, principal.getName());
    }
}
