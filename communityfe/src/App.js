import { Layout, Typography } from "antd";
import { useState } from "react";

import LoginForm from "./components/LoginForm";
import MyCart from "./components/MyCart";
import Home from "./components/Home"
import SignupForm from "./components/SignupForm";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  // const [authed, setAuthed] = useState(false);
  const [authed, setAuthed] = useState(true); //uncomment previous line. temp solution for testing.

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div className="header" style={{ display: "flex", justifyContent: "space-between" }}>
          <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
          >
            Community Management System
          </Title>
          <div>{authed ? <MyCart /> : <SignupForm />}</div>
        </div>
      </Header>
      <Content
      >
        {authed ? (
          <Home />
        ) : (
          <LoginForm onSuccess={() => setAuthed(true)} />
        )}
      </Content>
    </Layout>
  );
}

export default App;