import React from 'react';
import { useState } from 'react';
import logo from "../assets/images/logo.svg";
import { Button, Drawer, Layout, Typography} from "antd";
import getAnnouncements from "../utils";
import { Modal } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';


const {Title} = Typography;
const {Header, Content } = Layout;


function TopBar(props) {
    console.log("is topbar show login", props.isLoggedIn)
    // const { isLoggedIn, asAdmin, handleLogout } = props;
    // const [authed, setAuthed] = useState(true); //uncomment previous line. temp solution for testing.
    // const [asAdmin, setAdmin] = useState(true);
    // const [isLogin, setLogin] = useState(props);
    const isLogin = props.isLoggedIn;
    const asAdmin = props.asAdmin;

    console.log(isLogin)
    const renderTopbarButton = () => {
        console.log("isLogin in Topbar", isLogin)
        if (asAdmin && isLogin) {
            return <div>
                Admin: XXXX 
                <Button type='secondary' shape='round' size='large'style={{margin:"24px", }} >Logout</Button>
                </div>
        }
        if (!asAdmin && isLogin) {
            return <div className='adminPost'>
                Resident: XXXX 
                <Button type='secondary' shape='round' size='large'style={{margin:"24px", }} >Logout</Button>
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