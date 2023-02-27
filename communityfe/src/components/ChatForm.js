import { useState } from 'react';
import { Drawer, Input, Form, Button, message } from 'antd';
import { sendMessage } from '../utils';

const { TextArea } = Input;

const ChatForm = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    sendMessage(values)
      .then(() => {
        message.success('Message sent');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        message.error('Failed to send message');
      });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Contact Us
      </Button>
      <Drawer
        title="Contact Us"
        width={600}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form 
          name="chat-form" 
          style={{ marginTop: "2rem" }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}>
          <Form.Item name="contactEmail" label="Your email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="telNumber" label="Your phone number">
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please enter a subject' }]}>
            <Input placeholder="Enter a subject" />
          </Form.Item>
          <Form.Item name="content" label="Message" rules={[{ required: true, message: 'Please enter a message' }]}>
            <TextArea placeholder="Enter your message" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <Form.Item>
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
