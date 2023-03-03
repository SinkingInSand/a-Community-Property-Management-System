import React, { useState, useEffect } from "react";
import { Form, Layout, Typography, Row, Col, Button, List } from "antd";
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

  useEffect(() => {
    getAllMessage().then((data) => {
      console.log(data);
      setChatMessages(data);
    });
  }, []);

  const updateMessage = (item) => {
    const updatedItem = { ...item, finished: !item.finished };
    setChatMessages((prevMessages) =>
      prevMessages.map((oldItem) =>
        oldItem.id === item.id ? updatedItem : oldItem
      )
    );
    sendMessage(updatedItem).then(() => {
      console.log("checked = ", updatedItem);
    });
  };

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
          <Button type='link' icon={<DeleteOutlined />} onClick={() => handleDeleteClick(item.id)}>Delete</Button>
        </List.Item>
      ));
  };
  

  return (
    <Layout>
      <Form>
        <Title level={3}>Messages:</Title>
        {renderChatMessages()}
      </Form>
    </Layout>
  );
};

export default AdminChat;