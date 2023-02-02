// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";
const { Header, Content, Sider } = Layout;
// const items1 = ["1", "2", "3"].map((key) =>
//   key,
//   label: `nav ${key}`,
// }));

const items = [
  { label: "Announcement" },
  { label: "Discussion" },
  { label: "Chat" },
  { label: "Maintenance" },
  { label: "Pay" },
  { label: "Announcement" },
];

const App = () => (
  <Layout>
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="logo" />
      <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
        Community Property Management
      </div>
      <Button type="secondary" shape="round" style={{ margin: "auto 0" }}>
        Logout
      </Button>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={items}
        />
      </Sider>
      {/* the layout below should changed depend on authorization */}
      <Layout
        style={{
          padding: "0 24px 24px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Event</Breadcrumb.Item>
          <Breadcrumb.Item>Alert</Breadcrumb.Item>
          <Breadcrumb.Item>Newsletter</Breadcrumb.Item>
          <Breadcrumb.Item>Policy</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Paragraph style={{ color: "red" }}>
            Content varies upon 1. the tab on the left, 2. authorization
          </Paragraph>
        </Content>
      </Layout>
    </Layout>
  </Layout>
);
export default App;
