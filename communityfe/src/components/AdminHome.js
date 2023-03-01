// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import AnnouncementForm from "./AnnouncementForm";
import Discussion from "./Discussion";
import AdminChat from "./AdminChat";
import ChatForm from "./ChatForm";
import ReservationForm from "./ReservationForm";
const { Content, Sider } = Layout;

const AdminHome = (props) => {
  const [showAnnouncement, setAnouncement] = useState(true);

  const [showDiscussion, setShowDiscussion] = useState(false);

  const [adminChatVisible, setAdminChatVisible] = useState(false);
  const [UserChat, setUserChat] = useState(false);

  const [Reservation, setReservation] = useState(false);
  const [Amenity, setAmenity] = useState([]);

  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [isLoggedIn, setLogin] = useState(props.isLoggedIn);

  console.log("user info on AdminHome: ", userInfo);
  const [asAdmin, setAdmin] = useState(props.asAdmin);

  console.log("Amin Home, is Admin = ", asAdmin);

  const handleAnnouncement = () => {
    setAnouncement(true);
    setReservation(false);
    setAdminChatVisible(false);
    setUserChat(false);
    setShowDiscussion(false);
  };
  const handleDiscussion = () => {    
    setAnouncement(false);
    setReservation(false);
    setAdminChatVisible(false);
    setUserChat(false);
    setShowDiscussion(true);
  };  
  const showAdminChat = () => {   
    setAnouncement(false);
    setReservation(false);
    setAdminChatVisible(true);
    setUserChat(false);
    setShowDiscussion(false);
  };
  const showChat = () => {
    setAnouncement(false);
    setReservation(false);
    setAdminChatVisible(false);
    setUserChat(true);
    setShowDiscussion(false);
  };
  const showReservation = () => {
    setReservation(true);
    setAnouncement(false);
    setAdminChatVisible(false);
    setUserChat(false);
    setShowDiscussion(false);
  };

  return (
    <>
      <TopBar isLoggedIn={isLoggedIn} userInfo={userInfo} asAdmin={asAdmin} />
      <Layout>
        <Sider
          className="site-layout-background"
          style={{ width: "200", minHeight: "100%", background: "#011529" }}
        >
          <Menu
            // mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              // height: "100vh",
              height: "auto",
              height: "100%",
              borderRight: 0,
            }}
            // items={items}
          >
            <Menu.Item onClick={handleAnnouncement}>Announcement</Menu.Item>
            <Menu.Item onClick={handleDiscussion}>Discussion</Menu.Item>
            {asAdmin ? <Menu.Item onClick={showAdminChat}>Messages</Menu.Item> :
            <Menu.Item onClick={showChat}>Contact Us</Menu.Item>}
            <Menu.Item onClick={showReservation}>Reservation</Menu.Item>
          </Menu>
        </Sider>
        {/* the layout below should changed depend on authorization */}
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          {Reservation && <ReservationForm />}
          {showAnnouncement && <AnnouncementForm isAdmin={asAdmin} />}
          {showDiscussion && <Discussion isAdmin={asAdmin}/>}
          {adminChatVisible && <AdminChat isAdmin={asAdmin}/>}
          {UserChat && <ChatForm />}
        </Layout>
      </Layout>
    </>
  );
};
export default AdminHome;