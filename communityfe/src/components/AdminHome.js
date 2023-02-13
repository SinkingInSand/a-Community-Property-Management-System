// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Drawer } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";
import { useState, useEffect } from 'react';
import ReservationForm from "./ReservationForm";
import ChatForm from "./ChatForm";
const { Content, Sider } = Layout;
// const items1 = ["1", "2", "3"].map((key) =>
//   key,
//   label: `nav ${key}`,
// }));

const items = [
  { label: "Announcement",
    key:'1' },
  { label: "Discussion",
  key:'2' },
  { label: "Chat" },
  { label: "Maintenance" },
  // { label: "Pay" },
  // { label: "Announcement" },
];

const AdminHome = () => {
  const [Reservation, setReservation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  

  const handleAnnouncement = () => {
    setReservation(false)
    alert("Announcement is under development")
  }
  const handleDiscussionBoard = () => {
    setReservation(false)
    alert("Dicussion Board is under development")
  }

  const showReservation = () => {
    setReservation(true)
  }

  const handleCancel = () => {
    setIsDrawerOpen(false);
  };
const showChatDrawer = () => {
    setIsDrawerOpen(true)
}

  return (
    <>
      <Layout>
        <Sider className="site-layout-background"
        style={
          { width: "200",
            minHeight: "100%",
          }
        }
        
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100vh",
              borderRight: 0,
            }}
            // items={items}
            >
            <Menu.Item label="Announcement" key={1} onClick={handleAnnouncement}>Announcement</Menu.Item>
            <Menu.Item label="Discussion Board" key={2} onClick={handleDiscussionBoard}>Discussion Board</Menu.Item>
            <Menu.Item label="Chat Thread" key={3} onClick={showChatDrawer}>Chat</Menu.Item>
            <Menu.Item label="Reservation" key={4} onClick={showReservation}>Reservation</Menu.Item>
          </Menu>
 
        </Sider>
        {/* the layout below should changed depend on authorization */}
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
        { Reservation && <ReservationForm /> }
       
        <div>
        <Drawer open={isDrawerOpen} onClose={handleCancel}>
            <p style={{color:"red"}}>Pop up chat. UI is underdevelopement.</p>
        </Drawer>
      </div>
          {/* <Breadcrumb
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
              minHeight: 580,
            }}
          >
            <Paragraph style={{ color: "red" }}>
              Content varies upon 1. the tab on the left, 2. authorization
            </Paragraph>
          </Content> */}
        </Layout>
      </Layout>
    </>
  );

};
export default AdminHome;
