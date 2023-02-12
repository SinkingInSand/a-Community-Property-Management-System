package com.team1.communitymanagementsystem.dao;

import com.team1.communitymanagementsystem.entity.Announcement;
import com.team1.communitymanagementsystem.entity.Users;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team1.communitymanagementsystem.entity.Announcement;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
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


    public Announcement getAnnouncementById(int announcementId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(Announcement.class, announcementId);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public void addAnnouncement(Announcement newAnnouncement) {
        try (Session session = sessionFactory.openSession()) {
            session.save(newAnnouncement);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }


    public void deleteAnnouncement(int announcementId) {
        try (Session session = sessionFactory.openSession()) {
            Query theQuery = session.createQuery("delete from Announcement where id =:id");
            theQuery.setParameter("id", announcementId);
            theQuery.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
