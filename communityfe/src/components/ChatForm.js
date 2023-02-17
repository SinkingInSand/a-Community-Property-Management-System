
import React from "react";
import { useState,} from 'react';
import { Drawer, Menu, Input, Form, Button } from "antd";


const ChatForm = () =>{
    const [isDrawerOpen, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [form] = Form.useForm();

    const handleCancel = () => {
        setOpen(false);
    };
    const showChatDrawer = () => {
        setOpen(true)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
          if (!err) {
            const newMessage = {
              text: values.message,
              timestamp: new Date().toLocaleString(),
            };
            setMessages([...messages, newMessage]);
            form.resetFields();
          }
        });
      };

return(
    <>
    <Menu.Item label="Chat Thread" key={3} onClick={showChatDrawer}>Chat</Menu.Item>


    <Drawer title="Chat" width={400} open={isDrawerOpen} onClose={handleCancel}>
        <div style={{ height: 300, overflowY: "scroll" }}>
          {messages.map((message, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: "bold" }}>{message.text}</p>
              <p>{message.timestamp}</p>
            </div>
          ))}
        </div>

        <Form form={form} layout="inline" onSubmit={handleSubmit}>
          <Form.Item
            name="message"
            rules={[{ required: true, message: "Please enter a message" }]}
          >
            <Input placeholder="Type a message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
              Send
            </Button>
          </Form.Item>
        </Form>
    </Drawer>
    </>
    )
};
export default ChatForm;
