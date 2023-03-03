import { Layout, Typography, message } from "antd";
import { useState, useEffect } from "react";

import TopBar from "./components/TopBar";
import Main from "./components/Main";
import { TOKEN_KEY } from "./constants";

function App() {
  const [asAdmin, setAdmin] = useState(false); //uncomment previous line. temp solution for testing.
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false
  );
  const [userInfo, setUserInfo] = useState([]);

  console.log("Launch the website, is logged in", isLoggedIn);
  console.log("Launch the website, is admin", asAdmin);
  console.log("Launch the website, get user information: ", userInfo);

  useEffect(() => {
    const storedData = localStorage.getItem(TOKEN_KEY);
    if (storedData) {
      const { token, userInfo, asAdmin } = JSON.parse(storedData);
      setIsLoggedIn(true);
      setUserInfo(userInfo);
      setAdmin(asAdmin);
    }
  }, []);

  const logout = () => {
    console.log("log out");
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const loggedIn = (token, userInfo, asAdmin) => {
    if (token) {
      const data = { token, userInfo, asAdmin };      
      setIsLoggedIn(true);
      setUserInfo(userInfo);
      if (userInfo.username === 'admin@gmail.com'){  //hardcode????
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      console.log("after handle, user info = ", userInfo)
      localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    }    
  };

  console.log("If Admin after login: ", asAdmin);

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} userInfo={userInfo} asAdmin={asAdmin}/>
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} asAdmin={asAdmin}/>
    </div>
  );
}

export default App;
