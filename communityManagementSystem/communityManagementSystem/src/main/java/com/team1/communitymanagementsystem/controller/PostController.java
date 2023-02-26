package com.team1.communitymanagementsystem.controller;

import com.sun.net.httpserver.Authenticator;
import com.team1.communitymanagementsystem.entity.Announcement;
import com.team1.communitymanagementsystem.entity.Post;
import com.team1.communitymanagementsystem.entity.Users;
import com.team1.communitymanagementsystem.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@Controller
public class PostController {
    @Autowired
    private PostService postService;

    @RequestMapping(value = "/discussion", method = RequestMethod.GET)
    @ResponseBody
    public List<Post> getPostList() {
        return postService.getPostList();
    }
    @RequestMapping(value = "/discussion/post", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addPost(@RequestBody Post post) {
        postService.addPost(post);
    }

    @RequestMapping(value = "/discussion/yourPosts", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @ResponseBody
    public List<Post> getOwnPosts() {
        return postService.getOwnPosts();
    }

    @RequestMapping(value= "/discussion/{postId}", method= RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @ResponseBody
    public Post getPostById(@PathVariable(value = "postId") int postId) {
        return postService.getPostById(postId);
    }

    @RequestMapping(value= "/discussion/{postId}/edit", method= RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void editPostById(@PathVariable(value = "postId") int postId, @RequestBody Post post) {
        postService.deletePost(postId);
        postService.addPost(post);
    }
    @RequestMapping(value= "/discussion/{postId}/comment", method= RequestMethod.GET)
    @ResponseBody
    public List<Post> getComment(@PathVariable(value = "postId") int postId) {
        return postService.getComment(postId);
    }
    @RequestMapping(value= "/discussion/{postId}/createComment", method= RequestMethod.POST)
    @ResponseBody
    public void createComment(@RequestBody Post comment, @PathVariable(value = "postId") int postId) {
        postService.createComment(comment, postId);
    }
    @RequestMapping(value= "/discussion/{postId}/comment", method= RequestMethod.POST)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteComment(@RequestParam(name = "conmentId") int commentId) {
         postService.deletePost(commentId);
    }

    @RequestMapping(value= "/discussion/{postId}/delete", method= RequestMethod.POST)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deletePost(@PathVariable(value = "postId") int postId) {
         postService.deletePost(postId);
    }




}
