import { useState, useEffect } from 'react';
import { Button, Comment,
  Form,
  Typography,
  Layout,
  message,
  Modal,
  Space,
  List } from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
  ArrowsAltOutlined
} from '@ant-design/icons';
import { getDiscussions, getComments, deleteAnnoucement, createDiscussion } from '../utils';
import ReplyForm from "./ReplyForm";
import DiscussionPost from "./DiscussionPost";

const { Title } = Typography;

const Discussion = (props) => {
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const [discussions, setDiscussions] = useState([]);
  const [loadingDiscussions, setLoadingDiscussions] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayEditModal, setEditDisplayModal] = useState(false);
  const [replyId, setReplyID] = useState(-1);
  const [commentId, setCommentId] = useState(-1);
  const [comments, setComments] = useState([]);

  

  const Parent = ({ item }) => {
    return (
      <Form >
      
      <p>{addComments(item.id)}</p>
      <p>{addChildren(item.id)}</p>    
      </Form>
    );
  };
  const addChildren = (id) => {
    if (id === replyId) {
      return <ReplyForm postId={id} />;
    }
  };
  const handleGetComments = (id) => {
    if (commentId === -1) {
      setCommentId(id);
      getComments(id).then((data) => {
        setComments(data);
      });
    } else {
      setCommentId(-1);
    }
  };
  const addComments = (id) => {
    if (id === commentId) {
      return <Comment />;
    }
  };
  const Comment = () => {
    return (
      <List>
        {comments.map((item) => {
          return (
            <List.Item>
              Reply: {item.content}
            </List.Item>
          );
        })}
      </List>
    );
  };
  const handleReply = (props) => {
    if (replyId === -1) {
      setReplyID(props.id);
    } else {
      setReplyID(-1);
    }
  };
  const deletePostOnClick = () => {
    setDisplayModal(true);
  };

  const editPostOnClick = () => {
    setEditDisplayModal(true);
  };
  const handleCancel = () => {
    setDisplayModal(false);
  };

  const handleCancel_edit = () => {
    setEditDisplayModal(false);
  };

  const onFinish = () => {
    createDiscussion()
      .then(() => {
        setDisplayModal(false);
        message.success(`Your discussion just posted!`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const onDelete = (id) => {
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
    if (isAdmin) {
      return (
        
        <Space>
          <Button
            className="button-group"
            icon={<EditOutlined />}
            onClick={editPostOnClick}
          >
            Edit
          </Button>
          <Button
            className="button-group"
            icon={<DeleteOutlined />}
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

  const renderItem = (item) => {
    console.log(item);
    return (
      <div className="postItem">
      <List.Item >
      <List.Item.Meta
        title={<Title level={5}>{item.subject}</Title>}
        description={
          <p>
            {item.timestamp.month} {item.timestamp.dayOfMonth}{" "}
            {item.timestamp.dayOfWeek}
          </p>
        }
      />
      
      <div className="postItem-buttons">
        <Button
          className="button-group"
          icon={<FormOutlined />}
          onClick={() => handleReply(item)}
        >
          Reply
        </Button>
        <Button
          className="button-group"
          icon={<ArrowsAltOutlined />}
          onClick={() => handleGetComments(item.id)}
        >
          Check Replys
        </Button>
      </div>
      {renderDeletButton(item)}      
      </List.Item>
      <Parent item={item} addChildren={addChildren(item.id)} />
      </div>
    );
  };
  const [discussionVisible, setDiscussionVisible] = useState(false);

  const fetchDiscussionMessages = () => {
    getDiscussions()
      .then((data) => {
        setDiscussions(data);
      })
      // .catch((err) => {
      //   message.error(err.message);
      // })
      // .finally(() => {
      //   setLoadingDiscussions(false);
      // });
  };


  useEffect(() => {
    fetchDiscussionMessages();
  }, []); 

  const handleSendMessage = () => {
    fetchDiscussionMessages();
  };
  const handleDiscussionClose = () => {
    setDiscussionVisible(false);
  };
  return (
    <>
    <DiscussionPost
        visible={discussionVisible}
        onClose={handleDiscussionClose}
        onSendMessage={handleSendMessage} // <-- pass this function to the DiscussionDialog component
      />
      <Title level={3}>Discussions: </Title>
    <List
      style={{ width: '100%' }}
      dataSource={discussions.sort((a, b) => new Date(b.id) - new Date(a.id))}
      renderItem={renderItem}
    >
    </List>     
    </>
  );
};

export default Discussion;