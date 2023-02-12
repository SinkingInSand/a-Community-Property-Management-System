package com.team1.communitymanagementsystem.service;

import com.team1.communitymanagementsystem.dao.PostDao;
import com.team1.communitymanagementsystem.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PostService {
    @Autowired
    private PostDao postDao;
    public void addPost(Post post){
        postDao.addPost(post);
    }

    public void deletePost(int postId, String email){
        postDao.deletePost(postId, email);
    }
}
