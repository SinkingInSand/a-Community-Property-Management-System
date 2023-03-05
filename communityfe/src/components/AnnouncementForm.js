import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Typography,
  message,
  Modal,
  Space,
  List,
  Input
} from "antd";
import {
  getAnnouncements,
  deleteAnnoucement,
  editAnnoucement
} from "../utils";
import PostForm from "./PostForm";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AnnouncementForm = ({ isAdmin }) => {
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

  const updateAnnounce = (newAnounce) => {
    setAnnouncements(newAnounce)
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
              <Button key="back" onClick={() => {setDisplayModal(false)}}>
                No
              </Button>              
            ]}
            >            
            <p>Are you sure you want to delete this post?</p>
          </Modal>

          <Modal
          title="Edit an Annoucement"
          open={displayEditModal}
          onCancel={() => {setEditDisplayModal(false)}}
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

  return (
    <>      
      <Title level={3}>Announcements: </Title>
      <Form>
      {announcements.sort((a, b) => new Date(b.id) - new Date(a.id)).map((item) => {          
        return (
          <List.Item key={item.id} className='postItem'>
            <List.Item.Meta
              title={<Title level={5}>{item.title}</Title>}
              description={
                <>
                  <p style={{fontSize: 'small' }}>
                    Sent On: {item.timestamp.month +
                      " " +
                      item.timestamp.dayOfMonth +
                      " " +
                      item.timestamp.dayOfWeek}
                  </p>
                  <p style={{color: 'black'}}>
                    {item.content}
                  </p>
                </>
              }
            />              
            {renderButton(item)}
          </List.Item>            
        );
      })}
      </Form>
      {isAdmin && <PostForm announcements={announcements} updateAnnounce={updateAnnounce}/>}
    </>
  );
  
  
};

export default AnnouncementForm;


{/* <Form.Item className="postItem">
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
              </Form.Item> */}