import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Typography,
  Layout,
  message,
  Modal,
  Space,
  List,
} from "antd";
import Sider from "antd/lib/layout/Sider";
import {
  getAnnouncements,
  getDiscussions,
  createPost,
  getComments,
  deleteAnnoucement,
} from "../utils";
import Paragraph from "antd/lib/skeleton/Paragraph";
import PostForm from "./PostForm";
import ReplyForm from "./ReplyForm";
import { append } from "domutils";
import TextArea from "antd/lib/input/TextArea";
const { Title } = Typography;
const { Content } = Layout;

const AnnouncementForm = (props) => {
  console.log("Announcement Form Is Admin? = ", props.isAdmin);
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [loadingDiscussions, setLoadingDiscussions] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayEditModal, setEditDisplayModal] = useState(false);
  // const [ReplyArea, setReplyAreaVisible] = useState()
  const [replyId, setReplyID] = useState(-1);
  const [commentId, setCommentId] = useState(-1);
  const [comments, setComments] = useState([]);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const handleCancel_edit = () => {
    setEditDisplayModal(false);
  };

  const handleCancelReply = () => {
    // setReplyAreaVisible(false);
    setReplyID(-1);
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
  console.log(props)
  const onDelete = (id) => {
    console.log(id)
    deleteAnnoucement(id)
      .then(() => {
        setDisplayModal(false);
        message.success(`Your announcement has been deleted. Id = ` + id);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const renderDeletButton = (item) => {
    console.log(item.id)
    if (isAdmin) {
      return (
        
        <Space>
          <Button
            type="primary"
            size="middle"
            style={{ background: "lightblue" }}
            onClick={editPostOnClick}
          >
            Edit
          </Button>
          <Button
            type="primary"
            size="middle"
            style={{ background: "pink" }}
            onClick={deletePostOnClick}
          >
            Delete{" "}
          </Button>

          <Modal
            title="Delete Post"
            open={displayModal}
            onCancel={handleCancel}
            destroyOnClose={true} //destroy the content inside modal
            footer={[
              <Button key="back" onClick={handleCancel}>
                No
              </Button>,
              <Button key="submit" type="primary" onClick={() => onDelete(item.id)}>
                Yes
              </Button>,
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
              </Button>,
            ]}
          >
            <p>Are you sure you want to edit this post?</p>
          </Modal>
        </Space>
      );
    }
  };

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
  }, []); //can we get discussion and announcement at once

  const handleReply = (props) => {
    if (replyId === -1) {
      console.log("onclick reply ", props.id);
      // windows.DOM.getElementById(id)
      setReplyID(props.id);
    } else {
      setReplyID(-1);
    }
  };

  const handleGetComments = (id) => {
    if (commentId === -1) {
      console.log("Getting comments from post ", id);
      setCommentId(id);
      getComments(id).then((data) => {
        setComments(data);
      });

      console.log("Comments is ", comments);
    } else {
      setCommentId(-1);
    }
  };

  const Parent = ({ item }) => {
    return (
      <>
        <Form.Item id={item.id}>
          <Title level={5}>{"Subject: " + item.subject}</Title>
          <p>{item.content}</p>
          <p>
            {item.timestamp.month +
              " " +
              item.timestamp.dayOfMonth +
              " " +
              item.timestamp.dayOfWeek}
          </p>
          {renderDeletButton(item)}
          <Button
            type="primary"
            style={{ background: "lightgreen" }}
            onClick={() => handleReply(item)}
          >
            Reply
          </Button>
          <Button onClick={() => handleGetComments(item.id)}>
            Check Replys
          </Button>
          {addChildren(item.id)}
        </Form.Item>
        {addComments(item.id)}
      </>
    );
  };

  const addChildren = (id) => {
    if (id === replyId) {
      console.log("reply ID is ", replyId);

      return <ReplyForm postId={id} />;
    }
  };

  const addComments = (id) => {
    if (id === commentId) {
      console.log("reply ID is ", replyId);
      return <Comment />;
    }
  };
  const Comment = () => {
    return (
      <List>
        {comments.map((item) => {
          return (
            <List.Item style={{ color: "black" }}>
              Reply: {item.content}
            </List.Item>
          );
        })}
      </List>
    );
  };

  

  return (
    <>
      <Form>
        <Title level={3}>Annoucements: </Title>
        {announcements.map((item) => {
          return (
            <>
              <Form.Item className="postItem">
                <Title level={5}>{item.title}</Title>
                <p>{item.content}</p>
                <p>
                  {item.timestamp.month +
                    " " +
                    item.timestamp.dayOfMonth +
                    " " +
                    item.timestamp.dayOfWeek}
                </p>
                {renderDeletButton(item)}
              </Form.Item>
            </>
          );
        })}
        <p></p>
      </Form>
      <Title level={3}>Discussions: </Title>
      {discussions.map((item) => {
        return (
          <>
            <Parent item={item} addChildren={addChildren(item.id)} />
          </>
        );
      })}

      {isAdmin && <PostForm />}
    </>
  );
};

export default AnnouncementForm;
