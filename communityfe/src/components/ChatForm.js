
import React from "react";
import { useState,} from 'react';
import{Drawer, Menu} from 'antd';


const ChatForm = () =>{
    const [isDrawerOpen, setOpen] = useState(false)


    const handleCancel = () => {
        setOpen(false);
      };
    const showChatDrawer = () => {
        setOpen(true)
    }
return(
    <>
    <Menu.Item label="Chat Thread" key={3} onClick={showChatDrawer}>Chat</Menu.Item>

    <Drawer open={isDrawerOpen} onClose={handleCancel}>
    <p style={{color:"red"}}>Pop up chat. UI is underdevelopement.</p>
    </Drawer>
    </>
    )
};
export default ChatForm;
