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
import TopBar from "./TopBar";
const { Content, Sider } = Layout;

const AdminHome = (props) => {
  const [Reservation, setReservation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAnnouncement, setAnouncement] = useState(true)
  
  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [isLoggedIn, setLogin] = useState(props.isLoggedIn);

  console.log("user info on AdminHome: ", userInfo);
  const [asAdmin, setAdmin] = useState(props.asAdmin);
  
  
  console.log("Amin Home, is Admin = ", asAdmin)
  

  const handleAnnouncement = () => {
    setAnouncement(true);
    setReservation(false)
  }


  const showReservation = () => {
    setReservation(true)
    setAnouncement(false)
  }

  const handleCancel = () => {
    setIsDrawerOpen(false);
  };
const showChatDrawer = () => {
    setIsDrawerOpen(true)
}

  return (
    <>
    <TopBar isLoggedIn={isLoggedIn} userInfo={userInfo} asAdmin={asAdmin}/>
      <Layout>
        <Sider className="site-layout-background"
        style={
          { width: "200",
            minHeight: "100%",
            background: "#011529",
          }
        }
        
        >
          <Menu
            // mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              // height: "100vh",
              height: "auto",
              height:"100%",
              borderRight: 0,
            }}
            // items={items}
            >
            <Menu.Item onClick={handleAnnouncement}>Announcement</Menu.Item>
            {<ChatForm />}
            <Menu.Item onClick={showReservation}>Reservation</Menu.Item>
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
