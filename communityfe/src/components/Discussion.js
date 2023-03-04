import { useState, useEffect } from 'react';
import { Button, Input, Form, Typography, Layout, message, Modal, Space, List } from 'antd';
import { DeleteOutlined, EditOutlined, FormOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { getDiscussions, getComments, deleteAnnoucement, createDiscussion, editDiscussion, deleteDiscussion} from '../utils';
import ReplyForm from "./ReplyForm";
import DiscussionPost from "./DiscussionPost";

const { Title } = Typography;

const Discussion = (props) => {
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const [discussions, setDiscussions] = useState([]);

  const [editId, setEditId] = useState(null);

  const [loadingDiscussions, setLoadingDiscussions] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayEditModal, setEditDisplayModal] = useState(false);
  const [replyId, setReplyID] = useState(-1);
  const [commentId, setCommentId] = useState(-1);
  const [comments, setComments] = useState([]);
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

  const handleDiscussionClose = () => {
    setDiscussionVisible(false);
  };
  const handleSendMessage = () => {
    fetchDiscussionMessages();
  };

  const showModal = () => {
    setDiscussionVisible(true);
  };
  



  const Parent = ({ item }) => {
    return (
      <>      
      <p>{addComments(item.id)}</p>
      <p>{addChildren(item.id)}</p>    
      </>
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
      <Form style={{ marginLeft: 40 }}>      
        {comments.map((item) => {
          return (
            <>{item.content}</>            
          );
        })}
      </Form>
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

  const editPostOnClick = () => {  //edit
    setEditDisplayModal(true);
  };
  const handleCancel = () => {
    setDisplayModal(false);
  };

  const handleCancel_edit = () => {  //edit
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
  const onDelete = () => {
    deleteDiscussion(editId)
      .then(() => {
        setDisplayModal(false);
        setDiscussions(discussions.filter(item => item.id !== editId));
        message.success(`Your discussion has been deleted. Id = ` + editId);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onDiscussionEdit = (data, item) => {  //edit
    editDiscussion(item.id, data)
      .then(() => {
        setEditDisplayModal(false);
        message.success(`Your announcement has been updated.`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  
  const renderDeletButton = (item) => {
    if (isAdmin) {
      return (        
        <Space.Compact>
          <Button
            className="button-group"
            icon={<DeleteOutlined />}
            onClick={
              
              () => {
                setDisplayModal(true);
                setEditId(item.id);
            }}
            
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
              <Button key="submit" type="primary" onClick={onDelete}>
                Yes
              </Button>,
            ]}
          >            
            <p>Are you sure you want to delete this post?</p>
          </Modal>      
        </Space.Compact>
      );
    }
  };

  const renderItem = (item) => {
    console.log(item);
    return (
      <>
      <List className="postItem">      
      <List.Item.Meta
        title={<Title level={5}>{item.subject}</Title>}
        description={
          <>
          <p>
            Sent On: {item.timestamp.month} {item.timestamp.dayOfMonth}{" "}
            {item.timestamp.dayOfWeek}
          </p>
          <p>{item.content}</p>
          </>
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
      {renderDeletButton(item)} 
      </div>
      <Parent item={item} addChildren={addChildren(item.id)} />    
      </List>      
      </>
    );
  };

  return (
    <>
    <Form>
    <Title level={3}>Discussion: </Title>
    </Form>



    <Button className="floatPost" onClick={showModal}>
      Create Post
    </Button>
    
    <DiscussionPost
      visible={discussionVisible}
      onClose={handleDiscussionClose}
      onSendMessage={handleSendMessage} // <-- pass this function to the DiscussionDialog component
    />
    
    <List
      style={{ width: '100%' }}
      dataSource={discussions.sort((a, b) => new Date(b.id) - new Date(a.id))}
      renderItem={renderItem}
    />
    </>
  );
};

export default Discussion;