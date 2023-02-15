import { Layout, Typography } from "antd";
import { useState } from "react";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AdminHome from "./components/AdminHome";
import ResidentHome from "./components/ResidentHome";
import TopBar from "./components/TopBar";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  // const [authed, setAuthed] = useState(false);
  const [authed, setAuthed] = useState(true); //uncomment previous line. temp solution for testing.
  const [asAdmin, setAdmin] = useState(true); //uncomment previous line. temp solution for testing.
  const [isLoggedIn, setLogin] = useState(false);
  console.log("islogged in", isLoggedIn)

  const handelTempLogin =(loginStatus) => {
    
    setLogin(loginStatus);
    // console.log("after handle", loginStatus)
  };
  console.log("after handle", isLoggedIn)

  const onSuccess = () => {
    setLogin(true);
  }



  const renderContent = () => {


    if (isLoggedIn & authed & asAdmin) {
      return <AdminHome />;
    }
    if (isLoggedIn & authed & !asAdmin){
      return <ResidentHome/>
    } //might not be necessary to have this component
    return <LoginForm handelTempLogin = {handelTempLogin}/>;
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <TopBar isLoggedIn={isLoggedIn} asAdmin={asAdmin}/>
      <Content>{renderContent()}</Content>
      {/* <LoginForm handelTempLogin = {handelTempLogin} /> */}
    </Layout>
  );
}

export default App;
