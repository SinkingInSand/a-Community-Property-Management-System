import React, { useState, useEffect } from 'react';
import { Modal, Button, Spin, Table, Form, Input } from 'antd';
import { sendMessage } from '../utils';

const { TextArea } = Input;

const ChatDialog = () => {
  const [chatPopUp, setChatPopUp] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setVisible(false);
    setChatPopUp([]);
  };

  const handleCancel = () => {
    setVisible(false);
    setChatPopUp([]);
  };

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    sendMessage()
      .then((data) => {
        setChatPopUp(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Button style={{ margin: '50px' }} onClick={showModal}>
        Contact Us
      </Button>
    <Modal
      title="Contact Us"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}      
      destroyOnClose={true}
      footer={null}
    >
    {/* {loading ? (
          <Spin />
        ) : (
          < dataSource={chatPopUp} />
        )} */}
      <Form
        name="chat-form"
        style={{ marginTop: '2rem' }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="contactEmail"
          label="Your email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="telNumber" label="Your phone number">
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: 'Please enter a subject' }]}
        >
          <Input placeholder="Enter a subject" />
        </Form.Item>
        <Form.Item
          name="content"
          label="Message"
          rules={[{ required: true, message: 'Please enter a message' }]}
        >
          <TextArea
            placeholder="Enter your message"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    </>
  );
};
export default ChatDialog;