package com.team1.communitymanagementsystem.controller;

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
    @ResponseStatus(value = HttpStatus.CREATED)
    @ResponseBody
    public Post getPostById(@PathVariable(value = "postId") int postId) {
        return postService.getPostById(postId);
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

    /*@RequestMapping(value = "/sendPost", method = RequestMethod.POST)
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
    }*/
}
