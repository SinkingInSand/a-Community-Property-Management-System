import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Typography, Layout, message} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import { getAnnouncements } from "../utils";
import Paragraph from "antd/lib/skeleton/Paragraph";
const { Title } = Typography;
const {Content} = Layout;

const AnnouncementForm = (props) => {
  console.log("Announcement Form Is Admin? = ", props.isAdmin);
  const [isAdmin, setAdmin] = useState(props.isAdmin.isAdmin);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);

  const renderDeletButton = () => {
    if (isAdmin) {
      return (
      <div><Button>Reply</Button>
      <Button type="" style={{background:"red"}}>Delete</Button>
      </div>
      )
    }
  };
  console.log(getAnnouncements())


//   const announcements = () => {
//     console.log(getAnnouncements())
  useEffect(() => {
      setLoadingAnnouncements(true);
      getAnnouncements()
        .then((data) => {
          setAnnouncements(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoadingAnnouncements(false);
        });
    }, []);

    console.log("Announcements: ", announcements[0]);
// ;  }
  return (
    // <p>Announcement Form</p>
    <>
      <Form
      >
        {announcements.map(
          (item) => {
            return <><Form.Item className="postItem">
              <Title level={3}>{item.title}</Title>
              <p>{item.content}</p>
              <p>{item.timestamp.month}</p>
              {renderDeletButton()}
            </Form.Item>
            </>
          }
        )}

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
