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

  const renderContent = () => {
    if (authed & asAdmin) {
      return <AdminHome />;
    }
    if (authed & !asAdmin){
      return <ResidentHome/>
    } //might not be necessary to have this component
    return <LoginForm />;
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <TopBar />
      <Content>{renderContent()}</Content>
    </Layout>
  );
}

export default App;
