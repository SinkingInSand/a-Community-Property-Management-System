import React, { useState } from "react";
import { Button, Checkbox, Form, Layout, message, Typography } from "antd";
// import { getAdminChat } from "../utils";

const { Title } = Typography;

const AdminChat = () => {
  const [chatMessages, setChatMessages] = useState([]);

  // const handleCompleted = () => {
  //   // placeholder for task complete
  // };

  // useEffect(() => {
  //   setLoadingAdminChat(true);
  //   getAdminChat()
  //     .then((data) => {
  //       setChatMessages(data);
  //     })
  //     .catch((err) => {
  //       message.error(err.message);
  //     })
  //     .finally(() => {
  //       setLoadingAdminChat(false);
  //     });
  // }, []);

  const renderChatMessages = () => {
    return chatMessages.map((item) => (
      <Form.Item className="postItem" key={item.id}>
        <Title level={3}>{"Subject: " + item.subject}</Title>
        <p>{item.content}</p>
        {/* {renderDeleteButton()} */}
        <Checkbox>Task Completed</Checkbox>
      </Form.Item>
    ));
  };

  return (
    <Layout>
      <Title level={2}>Admin Chat</Title>
      <Form>
        <Title level={3}>Messages:</Title>
        {renderChatMessages()}
        <Form.Item className="postItem">
          <Title level={3}>{"Subject: "}</Title>
          <p>content</p>
          {/* {renderDeleteButton()} */}
          <Checkbox>Task Completed</Checkbox>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default AdminChat;
