import React, { useState, useEffect } from "react";
import { Checkbox, Form, Layout, Typography } from "antd";
import { getAllMessage, sendMessage } from '../utils';

const { Title } = Typography;

const AdminChat = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const updateMessage = (item) => {
    item.finished = !item.finished;
    setChatMessages(chatMessages.map((oldItem) => (
      (oldItem.id === item.id) ? item : oldItem
    )));
    sendMessage(item)
      .then(() => {
        console.log('checked = ', item);
      });
  };

  const renderChatMessages = () => {
    return chatMessages.map((item) => (
      <Form.Item className="postItem" key={item.id}>
        <Title level={3}>{"Subject: " + item.subject}</Title>
        <p>{item.content}</p>
        <Checkbox checked={item.finished} onChange={() => updateMessage(item)}>Task Completed</Checkbox>
      </Form.Item>
    ));
  };

  useEffect(() => {
    getAllMessage()
      .then((data) => {
        setChatMessages(data);
      });
  }, []);

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