import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { createDiscussion } from "../utils";

const DiscussionPost = ({ visible, onClose, onSendMessage }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        setLoading(true);
        try {
          const values = await form.validateFields();
          const discussionMessage = {
            subject: values.subject,
            content: values.content          
          };
          await createDiscussion(discussionMessage);
          message.success('Post sent successfully!');
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
          <Button key="submit" type="primary" onClick={handleCancel} loading={loading}>
            Cancel
          </Button>
          <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
            Send
          </Button>
        </div>
      );

  return (
    <>      
      <Modal
          title="Create a Post"
          open={visible}
          onCancel={handleCancel}
          footer={modalFooter}      
          closable={true}
        >
          <Form form={form} layout="vertical" >
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: "Please input the subject" }]}
            >
              <Input placeholder="Enter a subject" />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[
                { required: true, message: "Please input your content" },
              ]}
            >
              <Input.TextArea 
                placeholder="Enter your message"
                autoSize={{ minRows: 3, maxRows: 6 }}
                />
            </Form.Item>            
          </Form>
        </Modal>
    </>
  );
};
export default DiscussionPost;
