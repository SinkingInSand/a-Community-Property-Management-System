package com.team1.communitymanagementsystem.service;


import com.team1.communitymanagementsystem.dao.AnnouncementDao;
import com.team1.communitymanagementsystem.entity.Announcement;
import com.team1.communitymanagementsystem.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementDao announcementDao;
    @Autowired
    private UsersService usersService;
    public List<Announcement> getAnnouncementList(){
        return announcementDao.getAnnouncementList();
    }

    public Announcement getAnnouncementById(int id) {
        return announcementDao.getAnnouncementById(id);
    }

    public void addAnnouncement(Announcement newAnnouncement) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userName = loggedInUser.getName();
        //Users user = usersService.getUser(username);
        announcementDao.addAnnouncement(newAnnouncement, userName);
    }

    public void deleteAnnouncement(int announcementId) {
        announcementDao.deleteAnnouncement(announcementId);
    }
}
