package com.team1.communitymanagementsystem.dao;

import com.team1.communitymanagementsystem.entity.Authorities;
import com.team1.communitymanagementsystem.entity.Post;
import com.team1.communitymanagementsystem.entity.Users;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository

public class UsersDao {

    @Autowired
    private SessionFactory sessionFactory;
    public void signUp(Users user) {
        Authorities authorities = new Authorities();
        authorities.setEmail(user.getEmail());
        authorities.setAuthorities("RESIDENT");

        Session session = null;
        try{
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(authorities);
            session.save(user);
            session.getTransaction().commit();;
        } catch (Exception ex){
            ex.printStackTrace();
            if( session != null ) session.getTransaction().rollback();
        } finally {
            if(session != null ){
                session.close();
            }
        }

    }
    public String[] getUserInfo(Users user){
        try (Session session = sessionFactory.openSession()) {
            Authorities role = session.get(Authorities.class, user.getEmail());
            String[] info = new String[2];
            info[0] = user.getEmail();
            info[1] = role.getAuthorities();
            return info;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
    public void adminRegister(Users user) {
        Authorities authorities = new Authorities();
        authorities.setEmail(user.getEmail());
        authorities.setAuthorities("ADMIN");

        Session session = null;
        try{
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(authorities);
            session.save(user);
            session.getTransaction().commit();;
        } catch (Exception ex){
            ex.printStackTrace();
            if( session != null ) session.getTransaction().rollback();
        } finally {
            if(session != null ){
                session.close();
            }
        }

    }
    public Users getUser(String email) {
        Users user = null;
        try (Session session = sessionFactory.openSession()) {
            user = session.get(Users.class, email);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return user;
    }

}