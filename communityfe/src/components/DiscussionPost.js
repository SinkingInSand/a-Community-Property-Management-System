import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { createDiscussion } from "../utils";


const DiscussionPost = ({ onSendMessage }) => {

    const [displayModal, setDisplayModal] = useState(false);
    const [discussionPosts, setDiscussionPosts] = useState([]);

    const handleCancel = () => {
      setDisplayModal(false);
    };

    const fetchDiscussionPosts = () => {
      createDiscussion().then((data) => {
        setDiscussionPosts(data);
      }).catch((err) => {
        console.log(err);
      });
    };

    useEffect(() => {
      fetchDiscussionPosts();
    }, []);

    const createPostOnClick = () => {  
      setDisplayModal(true);
    };
  
    const onFinish = (data) => {
        createDiscussion(data)
        .then(() => {  
          setDisplayModal(false);
          message.success(`Your post just posted!`);
          fetchDiscussionPosts();
          onSendMessage(); // <-- call the onSendMessage prop function to update the state of discussionPosts
        })
        .catch((err) => {
          message.error(err.message);
        });
    };


  return (
    <>
      <Button
        className="floatPost"
        icon={<FileTextOutlined />}
        description="Create Post"
        onClick={createPostOnClick}
      >
        Create Post
      </Button>
      <Modal
          title="Create a Post"
          open={displayModal}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose={true} //destroy the content inside modal
        >
          <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
            preserve={false}
          >
            <Form.Item
              name="subject"
              rules={[{ required: true, message: "Please input the subject" }]}
            >
              <Input placeholder="Subject" />
            </Form.Item>
            <Form.Item
              name="content"
              rules={[
                { required: true, message: "Please input your content" },
              ]}
            >
              <Input placeholder="Content" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};
export default DiscussionPost;
