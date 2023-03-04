import React from "react";
import { useState } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import { createPost } from "../utils";


const PostForm = (props) => {

    const [displayModal, setDisplayModal] = useState(false);
  
    const createPostOnClick = () => {  
      setDisplayModal(true);
    };

    const onPostAnnouncement = (data) => {
      console.log("post date ", data)
      createPost(data)
        .then((item) => {
          setDisplayModal(false);
          props.updateAnnounce([...props.announcements, item]);
          message.success(`Your announcement just posted!`);
        })
        .catch((err) => {
          message.error(err.message);
        });
    };

  return (
    <>
      <Button
        className="floatPost"
        description="Create Post"
        onClick={createPostOnClick}
      >
        Post Announcement
      </Button>
      <Modal
          title="Create an Announcement"
          open={displayModal}
          onCancel={() => {setDisplayModal(false)}}
          footer={null}
          destroyOnClose={true} //destroy the content inside modal
        >
          <Form
            onFinish={(data) => {
              onPostAnnouncement(data);
            }}
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
