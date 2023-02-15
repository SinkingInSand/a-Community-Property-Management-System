import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Typography, Layout} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
const { Title } = Typography;
const {Content} = Layout;

const AnnouncementForm = (props) => {
  console.log("Announcement Form Is Admin? = ", props.isAdmin);
  const [isAdmin, setAdmin] = useState(props.isAdmin.isAdmin);
  const renderDeletButton = () => {
    if (isAdmin) {
      return <Button type="" style={{display:"inline"}}>Delete</Button>;
    }
  };
  return (
    // <p>Announcement Form</p>
    <>
      <Form>
        <Form.Item className="postItem">

            <Title level={3}>Title</Title>

            <p>Content</p>

            {renderDeletButton()}

          
        
        </Form.Item>
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
