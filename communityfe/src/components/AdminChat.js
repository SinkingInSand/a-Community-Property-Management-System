import React, { useState, useEffect } from "react";
import { Form, Layout, Typography, Row, Col } from "antd";
import { getAllMessage, sendMessage, deleteChat, handleMessage } from "../utils";

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
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((item) => (
        <Row gutter={[0, 16]} key={item.id} className="postItem">
        <Col span={24}>
          <Title level={3}>{"Subject: " + item.subject}</Title>
        </Col>
        <Col span={12}>
          <Form.Item>
            <p>{item.content}</p>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item style={{ textAlign: "left" }}>
            <p>Resident Email:</p>
            <p>{item.userEmail}</p>
            <p>{item.createdAt}</p>
            <button
              onClick={() => handleMessageClick(item.id)}
              disabled={item.read}
            >
              Mark as Read
            </button>
            <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
          </Form.Item>
        </Col>
      </Row>
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