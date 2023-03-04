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
  Input
} from "antd";
import {
  getAnnouncements,
  getDiscussions,
  createPost,
  getComments,
  deleteAnnoucement,
  editAnnoucement
} from "../utils";
import PostForm from "./PostForm";
import ReplyForm from "./ReplyForm";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AnnouncementForm = (props) => {
  console.log("Announcement Form Is Admin? = ", props.isAdmin);
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const [announcements, setAnnouncements] = useState([]);
  const [editId, setEditId] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayEditModal, setEditDisplayModal] = useState(false);


  // Only execute once during initialization.
  useEffect(() => {
    getAnnouncements()
      .then((data) => {
        setAnnouncements(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
      });
  }, []);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const handleCancel_edit = () => {
    setEditDisplayModal(false);
  };

  console.log("Pros from announcement: ", props)

  const onAnnoucementDelete = () => {
    console.log("is going to delete", editId)
    deleteAnnoucement(editId)
      .then(() => {
        setAnnouncements(announcements.filter(item => item.id !== editId));
        message.success(`Your announcement has been deleted.`);
      })
      .catch((err) => {
        message.error(err.message);
      });
    setDisplayModal(false);
  };

  const onAnnoucementEdit = (data) => {
    editAnnoucement(editId, data)
      .then(() => {
        setEditDisplayModal(false);
        setAnnouncements(() => {
          return announcements.map(item => {
            if (item.id === editId) {
              item.category = data.category;
              item.content = data.content;
              item.title = data.title;
              return data;
            }
            return item;
          });
        });
        message.success(`Your announcement has been updated.`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const renderButton = (item) => {
    console.log("render item", item)
    if (isAdmin) {
      return (        
        <Space.Compact>
          <Button
            className="button-group"
            icon={<EditOutlined />}
            onClick={() => {
            setEditDisplayModal(true);
            setEditId(item.id)
            console.log('id: ', item.id)
          }}
          >Edit</Button>

          <Button
            onClick={() => {
              setDisplayModal(true);
              setEditId(item.id);
          }}
            icon={<DeleteOutlined />}
          >Delete</Button>

          <Modal
            title="Delete Post"
            open={displayModal}
            onCancel={() => {setDisplayModal(false)}}
            destroyOnClose={true} //destroy the content inside modal
            footer={[
              <Button key="submit" type="primary" onClick={onAnnoucementDelete}>
                Yes
              </Button>,
              <Button key="back" onClick={handleCancel}>
                No
              </Button>              
            ]}
            >            
            <p>Are you sure you want to delete this post?</p>
          </Modal>

          <Modal
          title="Edit an Annoucement"
          open={displayEditModal}
          onCancel={handleCancel_edit}
          destroyOnClose={true} //destroy the content inside modal
          footer = {null}          
        >
          <Form
            onFinish={(data) => {
              onAnnoucementEdit(data);
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
          
        </Space.Compact>
        
      );
    }
  };

  

  // const handleReply = (props) => {
  //   if (replyId === -1) {
  //     console.log("onclick reply ", props.id);
  //     // windows.DOM.getElementById(id)
  //     setReplyID(props.id);
  //   } else {
  //     setReplyID(-1);
  //   }
  // };

  // const handleGetComments = (id) => {
  //   if (commentId === -1) {
  //     console.log("Getting comments from post ", id);
  //     setCommentId(id);
  //     getComments(id).then((data) => {
  //       setComments(data);
  //     });

  //     console.log("Comments is ", comments);
  //   } else {
  //     setCommentId(-1);
  //   }
  // };

  // const Parent = ({ item }) => {
  //   return (
  //     <>
  //       <Form.Item id={item.id}>
  //         <Title level={5}>{"Subject: " + item.subject}</Title>
  //         <p>{item.content}</p>
  //         <p>
  //           {item.timestamp.month +
  //             " " +
  //             item.timestamp.dayOfMonth +
  //             " " +
  //             item.timestamp.dayOfWeek}
  //         </p>
  //         {renderDeletButton(item)}
  //         <Button
  //           type="primary"
  //           style={{ background: "lightgreen" }}
  //           onClick={() => handleReply(item)}
  //         >
  //           Reply
  //         </Button>
  //         <Button onClick={() => handleGetComments(item.id)}>
  //           Check Replys
  //         </Button>
  //         {addChildren(item.id)}
  //       </Form.Item>
  //       {addComments(item.id)}
  //     </>
  //   );
  // };

  // const addChildren = (id) => {
  //   if (id === replyId) {
  //     console.log("reply ID is ", replyId);

  //     return <ReplyForm postId={id} />;
  //   }
  // };

  // const addComments = (id) => {
  //   if (id === commentId) {
  //     console.log("reply ID is ", replyId);
  //     return <Comment />;
  //   }
  // };
  // const Comment = () => {
  //   return (
  //     <List>
  //       {comments.map((item) => {
  //         return (
  //           <List.Item style={{ color: "black" }}>
  //             Reply: {item.content}
  //           </List.Item>
  //         );
  //       })}
  //     </List>
  //   );
  // };

  

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
                {renderButton(item)}
              </Form.Item>
            </>
          );
        })}
        <p></p>
      </Form>
      {isAdmin && <PostForm />}
    </>
  );
};

export default AnnouncementForm;
