import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { sendMessage } from '../utils';

const ChatDialog = ({ visible, onClose, onSendMessage, userInfo }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        setLoading(true);
        try {
          const values = await form.validateFields();
          const chatMessage = {
            subject: values.subject,
            contactEmail: values.contactEmail, // Set the contactEmail field using the email field value
            telNumber: values.telNumber,
            content: values.content,
            
          };
          await sendMessage(chatMessage);
          message.success('Message sent successfully!');
          form.resetFields();
          onClose();
          onSendMessage(); // <-- call this prop function to update the state of chatMessages
        } catch (error) {
          message.error(error.message);
        } finally {
          setLoading(false);
        }
      };

      const handleCancel = () => {
        form.resetFields();
        onClose();
      };

  const modalFooter = (
    <div>
      <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
        Send
      </Button>
    </div>
  );

  return (
    <Modal
      title="Send Message"
      open={visible}
      footer={modalFooter}
      onCancel={handleCancel}
      closable={true}
    >
      <Form form={form} layout="vertical" >
        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: 'Please enter a subject' }]}
        >
          <Input placeholder="Enter a subject"/>
        </Form.Item>
        <Form.Item
          label="Email"
          name="contactEmail"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="telNumber" label="Phone number">
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please enter a message' }]}
        >
          <Input.TextArea 
            placeholder="Enter your message"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChatDialog;
