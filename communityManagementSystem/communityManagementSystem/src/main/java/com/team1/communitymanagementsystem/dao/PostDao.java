package com.team1.communitymanagementsystem.dao;


import com.team1.communitymanagementsystem.entity.Announcement;
import com.team1.communitymanagementsystem.entity.Post;
import com.team1.communitymanagementsystem.entity.Users;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PostDao {

    @Autowired
    private SessionFactory sessionFactory;

    public List<Post> getPostList() {

        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Post> criteria = builder.createQuery(Post.class);
            Root<Post> root = criteria.from(Post.class);
            criteria.select(root).where(builder.equal(root.get("parentPostId"),0));

            return session.createQuery(criteria).getResultList();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
    }
    public void addPost(Post post, String userName){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            LocalDateTime timestamp = LocalDateTime.now();
            post.setTimestamp(timestamp);
            post.setUser(userName);
            post.setParentPostId(0);
            Users user = session.get(Users.class, userName);
            user.getPostList().add(post);
            session.beginTransaction();
            session.save(post);
            session.save(user);
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
    public void deletePost(int id){
        try (Session session = sessionFactory.openSession()) {
            Post post = session.get(Post.class, id);
            Users user = session.get(Users.class, post.getUser());
            user.getPostList().remove(post);
            post.setUser(null);
            session.beginTransaction();
            session.delete(post);
            session.getTransaction().commit();
        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }
    public Post getPostById(int postId){
        try (Session session = sessionFactory.openSession()) {
            return session.get(Post.class, postId);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public List<Post> getComment(int postId){
        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Post> criteria = builder.createQuery(Post.class);
            Root<Post> root = criteria.from(Post.class);
            criteria.select(root).where(builder.equal(root.get("parentPostId"),postId));
            return session.createQuery(criteria).getResultList();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
    }

    public void createComment(Post comment, int postId, String userName){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            LocalDateTime timestamp = LocalDateTime.now();
            comment.setTimestamp(timestamp);
            comment.setUser(userName);
            comment.setParentPostId(postId);
            //Users user = session.get(Users.class, userName);
            //user.getPostList().add(comment);
            session.beginTransaction();
            session.save(comment);
            //session.save(user);
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
    /*public void deletePost(int postId, String email){
        Session session = null;

        try{
            session = sessionFactory.openSession();

            Post post = session.get(Post.class, postId);
            Users user = session.get(Users.class, email);
            if(email == post.getUser().getEmail()){
                user.getPostList().remove(post);
                session.beginTransaction();
                session.update(user);
                //session.delete(post);
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
    }*/
}
