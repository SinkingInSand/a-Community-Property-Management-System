package com.team1.communitymanagementsystem.dao;


import com.team1.communitymanagementsystem.entity.Amenity;
import com.team1.communitymanagementsystem.entity.Reservation;
import com.team1.communitymanagementsystem.entity.Users;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
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

    public Amenity getAmenity(int id){
        Amenity amenity;
        try(Session session = sessionFactory.openSession()){

            amenity = session.get(Amenity.class, id);

            return amenity;
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return new Amenity();
    }

    public List<Reservation> getReservationByDateByAmenity(int amenityId, LocalDate date){
        // deal with invalid amenityId and Date in the service level
        try(Session session = sessionFactory.openSession()){
             Amenity amenity = session.get(Amenity.class, amenityId);
             List<Reservation> result = new ArrayList<>();
             List<Reservation> all = amenity.getReservation();
             for(Reservation reserv : all){
                 if(reserv.getReservationDate().equals(date)){
                     result.add(reserv);
                 }
             }
             return result;
            /*CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Reservation> criteriaQuery = builder.createQuery(Reservation.class);
        // get all reservations by amenity_id and date
            Root<Reservation> root = criteriaQuery.from(Reservation.class);

            criteriaQuery.select(root)
                    .where(builder.equal(root.get("amenity_id"), amenityId))
                    .where(builder.equal(root.get("reservationDate"), date));

            return session.createQuery(criteriaQuery).getResultList();*/

        } catch(Exception ex){
            ex.printStackTrace();
        }

        return new ArrayList<>();
    }


    public void saveAReservation(Reservation reservation){
        Session session = null;

        try{
            reservation.setAmenityName(reservation.getAmenity().getAmenityName());
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(reservation);
            session.getTransaction().commit();

        } catch (Exception ex){
            ex.printStackTrace();
            if(session != null){
                session.getTransaction().rollback();
            }
        } finally{
            if(session != null){
                session.close();
            }
        }
    }

    public void deleteAReservation(int id){
        Session session = null;

        try{
            session = sessionFactory.openSession();
            Reservation reservation = session.get(Reservation.class, id);
            Users user = reservation.getUser();
            user.getReservation().remove(reservation);
            Amenity amenity = reservation.getAmenity();
            amenity.getReservation().remove(reservation);
            reservation.setAmenity(null);
            reservation.setUser(null);

            session.beginTransaction();
            session.delete(reservation);
            session.getTransaction().commit();
        } catch (Exception ex){
            ex.printStackTrace();
            if(session != null){
                session.getTransaction().rollback();
            }
        } finally {
            if(session != null){
                session.close();
            }
        }
    }

    public boolean canDelete(int reserv_id, Users user){
        Reservation reservation;

        try(Session session = sessionFactory.openSession()){
            reservation = session.get(Reservation.class, reserv_id);
            Users owner = reservation.getUser();
            return owner.getEmail().equals(user.getEmail());
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return false;
    }

}
