import React, { useState, useEffect } from "react";
import { Drawer, Menu, Input, Form, Button, message } from "antd";
import { sendMessage, getMessage } from "../utils";

const { TextArea } = Input;

const ChatForm = (props) => {
  const [isDrawerOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [form] = Form.useForm();
  const [displayModal, setDisplayModal] = useState(false);
  const [formData, setFormData] = useState({
    contactEmail: "",
    subject: "",
    content: "",
    telNumber: "",
  });
  const [chatId, setChatId] = useState(props);
  const handleCancel = () => {
    setOpen(false);
  };

  const showChatDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (chatId) {
      getMessage(chatId)
        .then((data) => {
          setMessages(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chatId]);

  const onFinish = (values) => {
    const { contactEmail, subject, content, telNumber } = values;
    const data = { contactEmail, subject, content, telNumber };
    sendMessage(data, chatId)
      .then(() => {
        setFormData({
          contactEmail: "",
          subject: "",
          content: "",
          telNumber: "",
        });
        setDisplayModal(false);
        message.success(`Your message just sent!`);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setChatId(-1);
      });
  };

  return (
    <>
      <Menu.Item key={3} onClick={showChatDrawer}>
        Chat
      </Menu.Item>

      <Drawer
        title="Chat"
        width={400}
        open={isDrawerOpen}
        onClose={handleCancel}
      >
        <h2>XXX Apartment</h2>
        <p>xxx address</p>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.timestamp}</p>
            <p>{message.text}</p>
          </div>
        ))}
        <Form
          form={form}
          name="chat_form"
          onFinish={onFinish}
          initialValues={formData}
          style={{ marginTop: "2rem" }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <h2>Contact Us</h2>

          <Form.Item
            name="contactEmail"
            label="Email"
            rules={[              {                required: true,                message: "Please input your email address",              },              {                type: "email",                message: "Please enter a valid email address",              },            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="telNumber"
            label="Telephone"
            rules={[{ required: true, message: "Please enter a telephone number" }]}
          >
            <Input placeholder="Telephone Number" />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please enter a subject" }]}
          >
            <Input placeholder="Subject" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter a message" }]}
          >
            <TextArea placeholder="Type a message" rows={5} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ChatForm;