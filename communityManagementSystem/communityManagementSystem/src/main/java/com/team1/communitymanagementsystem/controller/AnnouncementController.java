package com.team1.communitymanagementsystem.controller;


import com.team1.communitymanagementsystem.entity.Announcement;
import com.team1.communitymanagementsystem.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@Controller
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @RequestMapping(value = "/announcements", method = RequestMethod.GET)
    @ResponseBody
    public List<Announcement> getAnnouncementList() {
        return announcementService.getAnnouncementList();
    }

    @RequestMapping(value= "/announcements/{announcementId}", method= RequestMethod.GET)
    @ResponseBody
    public Announcement getAnnouncementById(@PathVariable(value = "announcementId") int announcementId) {
        return announcementService.getAnnouncementById(announcementId);
    }



    /*@ModelAttribute("announcement") if use ModelAttribute*/
    @RequestMapping(value = "/announcements/create", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addAnnouncement(@RequestBody Announcement newAnnouncement) {
        announcementService.addAnnouncement(newAnnouncement);
    }

    //@GetMapping(value = "/announcements/{announcementId}/delete")
    @RequestMapping(value = "/announcements/{announcementId}/delete", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteAnnouncement(@PathVariable(value = "announcementId") int announcementId) {
        announcementService.deleteAnnouncement(announcementId);
    }

    @RequestMapping(value = "/announcements/{announcementId}/edit", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void editAnnouncement(@PathVariable(value = "announcementId") int announcementId,
                                 @RequestBody Announcement announcement) {
        announcementService.deleteAnnouncement(announcementId);
        announcementService.addAnnouncement(announcement);
    }


}
