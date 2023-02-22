import React from 'react';
import { useState } from 'react';
import logo from "../assets/images/logo.svg";
import { Button, Drawer, Layout, message, Typography} from "antd";
import getAnnouncements from "../utils";
import { Modal } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';


const {Title} = Typography;
const {Header, Content } = Layout;


function TopBar(props) {
    console.log("is topbar show login", props.isLoggedIn);
    console.log("Topbar get user information: ", props.userInfo);
    console.log("is topbar show admin: ", props.asAdmin);
    // const { isLoggedIn, asAdmin, handleLogout } = props;
    // const [authed, setAuthed] = useState(true); //uncomment previous line. temp solution for testing.
    const [asAdmin, setAdmin] = useState(props.asAdmin);
    const [userInfo, setUserInfo] = useState(props.userInfo);
    // const [isLogin, setLogin] = useState(props);
    const [isLogin, setLogin] = useState(props.isLoggedIn);

    


    const handleLogout = () => {
        // isLogin = false;
        // props.isLoggedIn = false;
        setLogin(false);
        message.success("You've successfully logged out!")
    
    }


    const renderTopbarButton = () => {
        // console.log("isLogin in Topbar", isLogin)
        // if (isLogin & asAdmin) {
        if (asAdmin & isLogin){
            return <div className='adminPost'>
                Admin: {userInfo}

                <Button type='secondary' shape='round' size='large'style={{margin:"24px", }} onClick={handleLogout} >Logout</Button>
                </div>
        }
        // if (isLogin & !asAdmin) {
            else if (isLogin & !asAdmin){
            return <div>
                Resident: {userInfo}
                <Button type='secondary' shape='round' size='large'style={{margin:"24px", }} onClick={handleLogout}>Logout</Button>
                </div>
        }
    };


    

    return (
        <header>
        <div className={asAdmin? "admin-header" : "App-header"} style={{ display: "flex", justifyContent: "space-between",

        }}>
        <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", }}
        >
            Community Management System
        </Title>

        <div className={isLogin? "isLogin": "logout"}>

        {renderTopbarButton()}
        
        
        
        </div>
        </div>
    </header>
    
    );
}

export default TopBar;