import React from 'react';
import { useState } from 'react';
import logo from "../assets/images/logo.svg";
import { Button, Drawer, Layout, Typography} from "antd";
import getAnnouncements from "../utils";
import { Modal } from 'antd';


const {Title} = Typography;
const {Header, Content } = Layout;


function TopBar(props) {
    // const { isLoggedIn, asAdmin, handleLogout } = props;
    const [authed, setAuthed] = useState(true); //uncomment previous line. temp solution for testing.
    const [asAdmin, setAdmin] = useState(false);


    const renderTopbarButton = () => {
        if (asAdmin) {
            return <div className='adminPost'>
                Admin: XXXX 
                <Button type='primary' shape="round" size="large" style={{margin:"24px", }}>Create Post</Button>
                {/* <Button type='secondary' shape='round' size='large'style={{margin:"24px", }}>Logout</Button> */}
                </div>
        }
        return <span>
            Resident: XXXX 
            {/* <Button type='secondary' shape='round' size='large'style={{margin:"24px", }}>Logout</Button> */}
        </span>
    };


    

    return (
        <header>
        <div className={asAdmin? "admin-header" : "App-header"} style={{ display: "flex", justifyContent: "space-between"

        }}>
        <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", }}
        >
            Community Management System
        </Title>

            {renderTopbarButton()}
            <Button type='secondary' shape='round' size='large'style={{margin:"24px", }}>Logout</Button>
            
            

        </div>
        {/* <Modal
        title="Chat"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Placeholder for chat window</p>
      </Modal> */}

    </header>
    
    );
}

export default TopBar;