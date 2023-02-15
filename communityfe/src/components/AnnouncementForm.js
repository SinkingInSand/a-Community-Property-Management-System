import React from "react";
import { useState, useEffect } from "react";
import { Button, Form} from "antd";
import { FileTextOutlined } from "@ant-design/icons";


const AnnouncementForm = (data) => {
  return (
    // <p>Announcement Form</p>
    <>
      <Form>
        <Form.Item className="postItem">Post 1</Form.Item>
      </Form>
      <Button
        className="floatPost"
        icon={<FileTextOutlined />}
        description="Create Post"
        shape="square"
      />
    </>
  );
};
export default AnnouncementForm;
