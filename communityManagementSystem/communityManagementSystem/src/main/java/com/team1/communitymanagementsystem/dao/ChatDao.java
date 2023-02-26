package com.team1.communitymanagementsystem.dao;

import com.team1.communitymanagementsystem.entity.Chat;
import com.team1.communitymanagementsystem.entity.Post;
import com.team1.communitymanagementsystem.entity.Users;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Repository
public class ChatDao {
    @Autowired
    private SessionFactory sessionFactory;

    public List<Chat> getMessageList() {

        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Chat> criteria = builder.createQuery(Chat.class);
            criteria.from(Chat.class);
            return session.createQuery(criteria).getResultList();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
    }

    public void sendMessage(Chat message, String userEmail){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            LocalDate chatDate = LocalDate.now();
            message.setChatDate(chatDate);
            message.setUserEmail(userEmail);
            Users user = session.get(Users.class, userEmail);
            user.getMessages().add(message);
            session.beginTransaction();
            session.save(message);
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

    public void deleteMessage(int id){
        try (Session session = sessionFactory.openSession()) {
            Chat message = session.get(Chat.class, id);
            Users user = session.get(Users.class, message.getUserEmail());
            user.getMessages().remove(message);
            message.setUserEmail(null);
            session.beginTransaction();
            session.delete(message);
            session.getTransaction().commit();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public void handleMessage(int id){
        try (Session session = sessionFactory.openSession()) {
            Chat message = session.get(Chat.class, id);
            //Users user = session.get(Users.class, message.getUserEmail());
            //user.getMessages().remove(message);
            //message.setUserEmail(null);
            message.setFinished(true);
            session.beginTransaction();
            session.save(message);
            session.getTransaction().commit();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
