package com.team1.communitymanagementsystem.dao;


import com.team1.communitymanagementsystem.entity.Amenity;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ReservationDao {

    @Autowired
    private SessionFactory sessionFactory;

    public List<Amenity> getAmenities(){
      try(Session session = sessionFactory.openSession()){
          CriteriaBuilder builder = session.getCriteriaBuilder();
          CriteriaQuery<Amenity> criteria = builder.createQuery(Amenity.class);
          criteria.from(Amenity.class);
          return session.createQuery(criteria).getResultList();
      }catch(Exception ex){
          ex.printStackTrace();
      }

      return new ArrayList<>();
    }



}
