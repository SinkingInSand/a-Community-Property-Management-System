package com.team1.communitymanagementsystem.service;

import com.team1.communitymanagementsystem.dao.PostDao;
import com.team1.communitymanagementsystem.dao.UsersDao;
import com.team1.communitymanagementsystem.entity.Announcement;
import com.team1.communitymanagementsystem.entity.Post;
import com.team1.communitymanagementsystem.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class PostService {
    @Autowired
    private PostDao postDao;
    @Autowired
    private UsersDao usersDao;
    public List<Post> getPostList(){
        return postDao.getPostList();
    }
    public void addPost(Post post){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userName = loggedInUser.getName();
        postDao.addPost(post, userName);
    }
    public void deletePost(int id){
        postDao.deletePost(id);
    }
    public List<Post> getOwnPosts(){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userName = loggedInUser.getName();
        Users user = usersDao.getUser(userName);
        List<Post> ownPosts = user.getPostList();
        List<Post> result = new ArrayList<>();
        for(Post post : ownPosts){
            if(post.getParentPostId() == 0){
                result.add(post);
            }
        }
        return result;
    }

    public Post getPostById(int postId){
        return postDao.getPostById(postId);
    }

    public List<Post> getComment(int postId){
        return postDao.getComment(postId);
    }

    public void createComment(Post comment, int postId){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userName = loggedInUser.getName();
        postDao.createComment(comment, postId, userName);
    }
    /*public void deletePost(int postId, String email){
        postDao.deletePost(postId, email);
    }*/
}
