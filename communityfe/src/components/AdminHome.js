// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu} from "antd";
import React from "react";
import { useState, useEffect } from 'react';
import ReservationForm from "./ReservationForm";
import ChatForm from "./ChatForm";
import { getAnnouncements } from "../utils";
import AnnouncementForm from "./AnnouncementForm";
const { Content, Sider } = Layout;




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

const AdminHome = (props) => {
  const [Reservation, setReservation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAnnouncement, setAnouncement] = useState(true)
  const [asAdmin, setAdmin] = useState(props);
  console.log("Amin Home, is Admin = ", asAdmin)
  

  const handleAnnouncement = () => {
    setAnouncement(true);
    setReservation(false)
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
            // mode="inline"
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
            {<ChatForm />}
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
        { showAnnouncement && <AnnouncementForm isAdmin={asAdmin}/>}
       

        </Layout>
      </Layout>
    </>
  );

};
export default AdminHome;
