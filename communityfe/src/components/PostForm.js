import React from "react";
import { useState } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { createPost } from "../utils";


const PostForm = () => {
    // const [asAdmin, setAdmin] = useState(props);

    const [displayModal, setDisplayModal] = useState(false);

    const handleCancel = () => {
      setDisplayModal(false);
    };
  
    const createPostOnClick = () => {
  
      setDisplayModal(true);
    };
  
    const onFinish = (data) => {
      createPost(data)
        .then(() => {
  
          setDisplayModal(false);
          message.success(`Your announcement just posted!`);
        })
        .catch((err) => {
          message.error(err.message);
        });
    };



//   const handleCreatePost = () => {
        
//   }

  return (
    <>

      <Button
        className="floatPost"
        icon={<FileTextOutlined />}
        description="Create Post"
        // shape="square"
        onClick={createPostOnClick}
      >
        Create Post
      </Button>
      <Modal
          title="Create an Announcement"
          open={displayModal}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose={true} //destroy the content inside modal
        >
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            preserve={false}
          >
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Please choose category" }]}
            >
              <Input  placeholder="Category" />
            </Form.Item>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please input the title" }]}
            >
              <Input placeholder="Title" />
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
export default PostForm;
