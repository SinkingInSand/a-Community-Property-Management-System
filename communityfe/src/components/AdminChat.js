import React, { useState, useEffect } from "react";
import { Form, Layout, Typography, Button, List, Modal } from "antd";
import { getAllMessage, sendMessage, deleteChat, handleMessage } from "../utils";
import {
  CheckCircleOutlined,
  SyncOutlined,
  DeleteOutlined,
  CheckOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const AdminChat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  useEffect(() => {
    getAllMessage().then((data) => {
      console.log(data);
      setChatMessages(data);
    });
  }, []);

  const handleMessageClick = (id) => {
    handleMessage(id).then(() => {
      // Update the chatMessages state to reflect the changes
      setChatMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === id) {
            return { ...message, read: true };
          }
          return message;
        })
      );
    });
  };

  const handleDeleteClick = (id) => {
    deleteChat(id).then(() => {
      // Remove the deleted message from the chatMessages state
      setChatMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
    });
    setDisplayModal(false);
  };

  const deletePostOnClick = () => {
    setDisplayModal(true);
  };
  const handleCancel = () => {
    setDisplayModal(false);
  };
  const renderChatMessages = () => {
    return chatMessages
      .sort((a, b) => new Date(b.id) - new Date(a.id))
      .map((item, index) => (
        <List.Item key={item.id} className='postItem'>
          <List.Item.Meta
            title={<Title level={5}>{`${index + 1}. ${item.subject}`}</Title>}
            description={
              <>
                <p style={{ marginBottom: 0, marginTop: 0, fontSize: 'small' }}>From: {item.contactEmail} | Sent On: {item.chatDate.month} {item.chatDate.dayOfMonth} {item.chatDate.year}</p>
                <p>{item.content}</p>
              </>
            }
          />
          <Button
            type='link'
            icon={<CheckOutlined />}
            onClick={() => handleMessageClick(item.id)}
            disabled={item.read}
          >
            Mark as Completed
          </Button>
          <Button type='link' icon={<DeleteOutlined />} onClick={deletePostOnClick}>
            Delete
          </Button>
          
          <Modal
            title="Delete Post"
            open={displayModal}
            onCancel={handleCancel}
            destroyOnClose={true} //destroy the content inside modal
            footer={[
              <Button key="back" onClick={handleCancel}>
                No
              </Button>,
              <Button key="submit" type="primary" onClick={() => handleDeleteClick(item.id)}>
                Yes
              </Button>
            ]}>
            <p>Are you sure you want to delete this post?</p>
          </Modal>
        </List.Item>
      ));
  };
  

  return (
    <>
    <Title level={3}>Messages:</Title>           
    {renderChatMessages()}   
    </>
  );
};

export default AdminChat;