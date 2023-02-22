import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Typography, Layout, message, Modal, Input} from "antd";
import Sider from "antd/lib/layout/Sider";
import { getAnnouncements,getDiscussions,createPost } from "../utils";
import Paragraph from "antd/lib/skeleton/Paragraph";
import PostForm from "./PostForm";
const { Title } = Typography;
const {Content} = Layout;

const AnnouncementForm = (props) => {
  console.log("Announcement Form Is Admin? = ", props.isAdmin);
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [loadingDiscussions, setLoadingDiscussions, isRepliable] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayEditModal, setEditDisplayModal] = useState(false);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const handleCancel_edit = () => {
    setEditDisplayModal(false);
  };

  const deletePostOnClick = () => {

    setDisplayModal(true);
  };

  const editPostOnClick = () => {
    setEditDisplayModal(true);
  };


  const onFinish = () => {
    createPost()
      .then(() => {

        setDisplayModal(false);
        message.success(`Your announcement just posted!`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const renderDeletButton = () => {
    if (isAdmin) {
      return (
      <div>
      <Button type="" style={{background:"lightblue"}} onClick={editPostOnClick}>Edit</Button>
      <Button type="" style={{background:"pink"}} onClick={deletePostOnClick}>Delete </Button >
      <Modal
          title="Delete Post"
          open={displayModal}
          onCancel={handleCancel}
          destroyOnClose={true} //destroy the content inside modal
          footer={[
            <Button key="back" onClick={handleCancel}>
              No
            </Button>,
            <Button key="submit" type="primary" onClick={onFinish}>
              Yes
            </Button>
          ]}
        >
        <p>Are you sure you want to delete this post?</p>

        </Modal>

        <Modal
          title="Edit Post"
          open={displayEditModal}
          onCancel={handleCancel_edit}
          destroyOnClose={true} //destroy the content inside modal
          footer={[
            <Button key="back" onClick={handleCancel_edit}>
              No
            </Button>,
            <Button key="submit" type="primary" onClick={onFinish}>
              Yes
            </Button>
          ]}
        >
        <p>Are you sure you want to edit this post?</p>

        </Modal>

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

    useEffect(() => {
      setLoadingDiscussions(true);
      getDiscussions()
        .then((data) => {
          setDiscussions(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoadingDiscussions(false);
        });
    },[]) //can we get discussion and announcement at once

    console.log("Announcements: ", announcements[0]);
// ;  }
  return (
    // <p>Announcement Form</p>
    <>
      <Form
      >
        <Title level={3}>Annoucements: </Title>
        {announcements.map(
          (item) => {
            return <><Form.Item className="postItem">
              <Title level={3}>{item.title}</Title>
              <p>{item.content}</p>
              <p>{item.timestamp.month}</p>
              {renderDeletButton(false)}
            </Form.Item>
            </>
          }
        )}
        <p></p>
        <Title level={3}>Discussions: </Title>
        {discussions.map(
          (item) => {
            return <><Form.Item className="postItem">
              <Title level={3}>{"Subject: " + item.subject}</Title>
              <p>{item.content}</p>
              <p>{item.timestamp.month}</p>
              {renderDeletButton()}
              <Button type="" style={{background:"lightgreen"}}>Reply</Button>
    
            </Form.Item>
            </>
          }
        )}

      </Form>
      {/* <Button
        className="floatPost"
        icon={<FileTextOutlined />}
        description="Create Post"
        // shape="square"
      >Create Post</Button> */}
      {isAdmin && <PostForm />}
    </>
  );
};


export default AnnouncementForm;

