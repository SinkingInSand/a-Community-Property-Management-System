import React from 'react';
import { useState } from 'react';
import logo from "../assets/images/logo.svg";
import { Button, Layout, Typography} from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import getAnnouncements from "../utils";
import { Modal } from 'antd';


const {Title} = Typography;
const {Header, Content } = Layout;


class ChatModal extends React.Component {
    state = {
        visible: false
    }

    showChatModal = () => {
        this.setState({
            visible: true
        });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    render() {
        return (
            <Modal
                visible={this.state.visible}
                title="Chat"
                onCancel={this.handleCancel}
                footer={null}
            >
                <p>Placeholder for chat window</p>
            </Modal>
        );
    }
}



function TopBar(props) {
    // const { isLoggedIn, asAdmin, handleLogout } = props;
    const [authed, setAuthed] = useState(true); //uncomment previous line. temp solution for testing.
    const [asAdmin, setAdmin] = useState(false);

    const renderTopbarButton = () => {
        if (asAdmin) {
            return <div className='adminPost'>
                Admin: XXXX 
                <Button type='primary' shape="round" size="large" style={{margin:"24px", }}>Create Post</Button>
                <Button type='secondary' shape='round' size='large'style={{margin:"24px", }}>Logout</Button>
                </div>
        }
        return <div>
            Resident: XXXX 
            <Button type='secondary' shape='round' size='large'style={{margin:"24px", }}>Logout</Button>
            <Button type='primary' shape="round" size="large" style={{margin:"24px"}} onClick={props.showChatModal}>Chat</Button>
        </div>
    }


    

    return (
        <header>
        <div className={asAdmin? "admin-header" : "App-header"} style={{ display: "flex", justifyContent: "space-between"

        }}>
        <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
        >
            Community Management System
        </Title>

            {renderTopbarButton()}
            
            

        </div>
        <ChatModal showChatModal={this.showChatModal} />
    </header>
    );
}

export default TopBar;