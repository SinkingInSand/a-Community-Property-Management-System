import { Layout, Typography, message } from "antd";
import { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AdminHome from "./components/AdminHome";
import ResidentHome from "./components/ResidentHome";
import TopBar from "./components/TopBar";
import { getUser } from "./utils";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  const [asAdmin, setAdmin] = useState(false); //uncomment previous line. temp solution for testing.
  const [isLoggedIn, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  console.log("Launch the website, is logged in", isLoggedIn);
  console.log("Launch the website, is admin", asAdmin);
  console.log("Launch the website, get user information: ", userInfo);

  const handelTempLogin = (loginStatus) => {
    setLogin(loginStatus);
    // setAdmin();
    // console.log("after handle", loginStatus)
  };
  // console.log("user is: ", getUser());
  // console.log("after handle", isLoggedIn)

  const onSuccess = (userInfo) => {
    console.log("after handle, user info = ", userInfo)
    setUserInfo(userInfo);

    if (userInfo[1] === 'ADMIN'){
      setAdmin(true);//set the admin is true
    }
   
    
  } 
  console.log("If Admin after login: ", asAdmin);


  const renderContent = () => {
    if (isLoggedIn) {
      return <AdminHome isLoggedIn={isLoggedIn} userInfo={userInfo[0]} asAdmin={asAdmin}/>;
    };
    return <LoginForm handelTempLogin={handelTempLogin} onSuccess={onSuccess}/>;
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>{renderContent()}</Content>
    </Layout>
  );
}

export default App;
