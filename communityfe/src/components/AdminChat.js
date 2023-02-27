import React, { useState } from "react";
import { Checkbox, Form, Layout, Typography } from "antd";

const { Title } = Typography;

const AdminChat = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const renderChatMessages = () => {
    return chatMessages.map((item) => (
      <Form.Item className="postItem" key={item.id}>
        <Title level={3}>{"Subject: " + item.subject}</Title>
        <p>{item.content}</p>
        <Checkbox>Task Completed</Checkbox>
      </Form.Item>
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