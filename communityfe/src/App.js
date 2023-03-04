import { useState, useEffect } from "react";

import TopBar from "./components/TopBar";
import Main from "./components/Main";
import { TOKEN_KEY } from "./constants";

function App() {
  // Setting up intial values.
  const initialStorage = JSON.parse(localStorage.getItem(TOKEN_KEY));
  const [asAdmin, setAdmin] = useState(
    initialStorage? initialStorage.savedAdmin : false
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    initialStorage ? true : false
  );
  const [userInfo, setUserInfo] = useState(
    initialStorage ? initialStorage.userInfo : {}
  );

  useEffect(() => {
    console.log("New use effect");
    if (Object.keys(userInfo).length !== 0) {
      const savedAdmin = (userInfo.username === 'admin@gmail.com');
      setAdmin(savedAdmin);
      setIsLoggedIn(true);
      const data = { userInfo, savedAdmin };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    } else {
      setAdmin(false);
      setIsLoggedIn(false);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [userInfo]);

  const logout = () => {
    console.log("log out");
    setUserInfo({});
  };

  const loggedIn = (userInfo) => {
    setUserInfo(userInfo);
  };

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} userInfo={userInfo} asAdmin={asAdmin}/>
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} asAdmin={asAdmin}/>
    </div>
  );
}

export default App;
