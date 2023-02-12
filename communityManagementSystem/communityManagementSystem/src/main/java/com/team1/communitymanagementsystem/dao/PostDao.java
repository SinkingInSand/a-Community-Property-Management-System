package com.team1.communitymanagementsystem.dao;


import com.team1.communitymanagementsystem.entity.Post;
import com.team1.communitymanagementsystem.entity.Users;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PostDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void addPost(Post post){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            Users user = session.get(Users.class, post.getUser());
            user.getPostList().add(post);
            session.beginTransaction();
            session.save(post);
            session.getTransaction().commit();
        }catch (Exception ex){
            ex.printStackTrace();
            if(session != null){
                session.getTransaction().rollback();
            }
        }finally {
            if(session != null){
                session.close();
            }
        }
    }

    public void deletePost(int postId, String email){
        Session session = null;

        try{
            session = sessionFactory.openSession();

            Post post = session.get(Post.class, postId);
            Users user = session.get(Users.class, email);
            if(email == post.getUser().getEmail()){
                user.getPostList().remove(post);
                session.beginTransaction();
                session.delete(post);
                session.getTransaction().commit();
            }

        }catch (Exception ex){
            ex.printStackTrace();

            if(session != null){
                session.getTransaction().rollback();
            }
        }finally {
            if(session != null){
                session.close();
            }
        }
    }
}
