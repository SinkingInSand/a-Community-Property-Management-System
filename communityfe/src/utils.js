export const login = (credential) => {
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;
  
    return fetch(loginUrl, { //发出指令//from window, global function
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  












  

  // need to modify
  export const getMenus = (restId) => {
    return fetch(`/restaurant/${restId}/menu`).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get menus");
      }
  
      return response.json();
    });
  };
  
  export const getRestaurants = () => {
    return fetch("/restaurants").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get restaurants");
      }
  
      return response.json();
    });
  };
  
  export const getCart = () => {
    return fetch("/cart").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get shopping cart data");
      }
  
      return response.json();
    });
  };
  
  export const checkout = () => {
    return fetch("/checkout").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to checkout");
      }
    });
  };
  
  export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to add menu item to shopping cart");
      }
    });
  };