import React from "react";
import { useState } from "react";
import { Input, Form, Button, message } from "antd";
import { reply,  } from "../utils";

const ReplyForm = (props) => {
  const [postId, setPostId] = useState(props);

  const [displayModal, setDisplayModal] = useState("");

    const handleCancel = () => {
      // setPostId(false);
      setDisplayModal("none");
      console.log("postId = ", postId);
    };

  const onFinish = (data) => {
    console.log("Reply content", data);
    console.log("Post ID ", postId.postId);
    reply(data, postId.postId)
      .then(() => {
        message.success(`Your Comments just posted!`);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setPostId(-1);
      });
  };

  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onFinish}
      preserve={false}
      style={{ display: displayModal }}
    >
      <Form.Item name="content">
      <Input.TextArea 
      rows={4} placeholder="Add your comment here" 
      style={{ marginRight: "20px" }} />
      </Form.Item>

      <Form.Item>
        <Button onClick={()=>handleCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ReplyForm;
