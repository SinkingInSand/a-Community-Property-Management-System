package com.team1.communitymanagementsystem.dao;

import com.team1.communitymanagementsystem.entity.Announcement;
import com.team1.communitymanagementsystem.entity.Users;
import com.team1.communitymanagementsystem.service.UsersService;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import com.team1.communitymanagementsystem.entity.Announcement;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AnnouncementDao {
    @Autowired
    private SessionFactory sessionFactory;

    public List<Announcement> getAnnouncementList() {

        try (Session session = sessionFactory.openSession()) {
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Announcement> criteria = builder.createQuery(Announcement.class);
            criteria.from(Announcement.class);
            return session.createQuery(criteria).getResultList();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
    }


    public Announcement getAnnouncementById(int announcementID) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(Announcement.class, announcementID);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    /*public void setInvisible(int announcementID){
        Announcement announcement = getAnnouncementById(announcementID);
        announcement.setVisible(true);
        try (Session session = sessionFactory.openSession()) {
            session.beginTransaction();
            session.save(announcement);
            session.getTransaction().commit();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }*/

    public void addAnnouncement(Announcement newAnnouncement, String userName) {
        try (Session session = sessionFactory.openSession()) {
            LocalDateTime timestamp = LocalDateTime.now();
            newAnnouncement.setTimestamp(timestamp);
            newAnnouncement.setUser(userName);
            session.beginTransaction();
            session.save(newAnnouncement);
            session.getTransaction().commit();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public void deleteAnnouncement(int announcementId) {
        try (Session session = sessionFactory.openSession()) {
            Announcement announcement = session.get(Announcement.class, announcementId);
            session.beginTransaction();
            session.delete(announcement);
            session.getTransaction().commit();
            //Query theQuery = session.createQuery("delete from Announcement where id =:id");
            //theQuery.setParameter("id", announcementId);
            //theQuery.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
