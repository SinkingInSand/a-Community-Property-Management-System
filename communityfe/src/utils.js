export const login = (credential) => {
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;
  
    return fetch(loginUrl, { //发出指令//from window, global function
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include", //accept cookies which save session id / token //need to tell browser.
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) { //callback
        throw Error("Fail to log in");
      }
    });
  };
  
  export const signup = (data) => {
    const signupUrl = "/signup";
  
    return fetch(signupUrl, {
      method: "POST",
      headers: { //request header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => { //fetch return an object, when have a .then function
      if (response.status < 200 || response.status >= 300) { //whne there is a response
        throw Error("Fail to sign up");
      }
    });

    //can not be const resp = fetch()
    //console.log(resp); -> not sure if there will be a response
  };
  
  export const getUser = () => {
    return fetch("/home").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get user");
      }
  
      return response.json();
    });
  };
 

  
  export const getAnnouncements = () => {
    return fetch("/announcements").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get announcements");
      }
  
      return response.json();
    });
  };

  export const deleteAnnoucement = (aId) => {

    return fetch(`/announcements/${aId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to delete annoucement");
      }
    });
  };

  export const editAnnoucement = (aId,data) => {
    console.log("ID before request ", aId);
    return fetch(`/announcements/${aId}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to edit annoucement");
      }
    });
  };
  export const createPost = (data) => {
    const signupUrl = "/announcements/create";
  
    return fetch(signupUrl, {
      method: "POST",
      headers: { //request header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => { 
      if (response.status < 200 || response.status >= 300) { 
        throw Error("Fail to make a post");
      }
    });

  };

  //Disscussion
  //post on discussion
  export const createDiscussion = (data) => {
    return fetch("/discussion/post", {
      method: "POST",
      headers: { //request header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => { 
      if (response.status < 200 || response.status >= 300) { 
        throw Error("Fail to make a post");
      }
    });

  };
  export const postDiscussion = (message) => {
    const disPostUrl = "/discussion/post";
    return fetch(disPostUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
      
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  export const editDiscussion = (aId,data) => {
    return fetch(`/discussion/${aId}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to edit Discussion");
      }
    });
  };


  export const deleteDiscussion = (aId) => {

    return fetch(`/discussion/${aId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to delete discussion");
      }
    });
  };
//get dis by resident
export const getDiscussionPosts = () => {
  return fetch("/discussion/yourPosts")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to get messages');
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

  export const getDiscussions = () => {
    return fetch("/discussion").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get discussions");
      }
  
      return response.json();
    });
  };
    
  export const reply = (data, pid) => {
    const signupUrl = `/discussion/${pid}/createComment`;
  
    return fetch(signupUrl, {
      method: "POST",
      headers: { //request header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => { 
      if (response.status < 200 || response.status >= 300) { 
        throw Error("Fail to make a post");
      }
    });

  };

  export const getComments = (pid) => {
    return fetch(`discussion/${pid}/comment`).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get comments");
      }
  
      return response.json();
    });
  };

//Reservation  
  export const getAmenities = () => {
    const getAmenitiesUrl = "/amenity";
  
    return fetch(getAmenitiesUrl).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get amenities");
      }

      return response.json();
    });
  };

  export const getReservations = () => {
    const getReservationsUrl = "/myreservations";
  
    return fetch(getReservationsUrl).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get amenities");
      }

      return response.json();
    });
  };

  export const checkAvailability = (rid, dateString) => {
    return fetch(`checkAvailability?amenity_id=${rid}&date=${dateString}`)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw Error("Fail to get timeslots!");
      }

      return response.json();
    });
  };

  export const makeReservation = (rid, dateString, timeslot) => {
    const makeReservationUrl = "/reserve?amenity_id=" + rid + "&date=" + dateString + "&timeslot=" + timeslot;
    console.log(makeReservationUrl);
    return fetch(makeReservationUrl, {
      method: "POST",
      headers: { //request header
        "Content-Type": "application/json",
      },
    }).then((response) => { 
      if (response.status < 200 || response.status >= 300) { 
        throw Error("Fail to make a reservation!");
      }
    });
  };

  export const deleteReservation = (id) => {
    const deleteReservationUrl = "/deletereservations?reservation_id=" + id;
    console.log(deleteReservationUrl)
    return fetch(deleteReservationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to delete annoucement");
      }
    });
  };


//Chat 
export const getAllMessage = () => {
  const getMessageUrl = "/allMessages";
  return fetch(getMessageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to get messages');
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export const getOwnMessage = () => {
  const getMessageUrl = "/messages";
  return fetch(getMessageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to get messages');
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export const sendMessage = (message) => {
  const sendMessageUrl = "/sendMessage";
  return fetch(sendMessageUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
    
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};


export const handleMessage = (id) => {
  return fetch(`/allMessages/${id}/read`, {
    method: 'POST',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to mark message as complete');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteChat = (id) => {
  return fetch(`/messages/${id}/delete`, {
    method: 'POST',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
