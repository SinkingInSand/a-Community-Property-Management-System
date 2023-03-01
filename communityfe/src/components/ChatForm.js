import { useState, useEffect } from 'react';
import { Typography, List, Tag, Button, Modal } from 'antd';
import { getOwnMessage, deleteChat } from '../utils';
import ChatDialog from './ChatDialog';
import {
  CheckCircleOutlined,
  SyncOutlined,
  DeleteOutlined
} from '@ant-design/icons';


const { Title } = Typography;

const ChatForm = () => {
  const [chatFormVisible, setChatFormVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState(null);

  const fetchChatMessages = () => {
    getOwnMessage().then((data) => {
      console.log(data);
      setChatMessages(data);
    });
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const handleChatFormClose = () => {
    setChatFormVisible(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteMessageId(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteOk = () => {
    deleteChat(deleteMessageId).then(() => {
      setDeleteModalVisible(false);
      fetchChatMessages();
    });
  };

  const handleDeleteCancel = () => {
    setDeleteMessageId(null);
    setDeleteModalVisible(false);
  };

  const TaskStatus = ({ finish }) => {
    let icon;
    let color;
    let status;

    if (finish) {
      icon = <CheckCircleOutlined />;
      color = 'success';
      status = 'Completed';
    } else {
      icon = <SyncOutlined spin />;
      color = 'processing';
      status = 'Processing';
    }

    return (
      <Tag icon={icon} color={color}>
        {status}
      </Tag>
    );
  };

  const renderItem = (item, index) => {
    return (
      <List.Item key={item.id} className='chatItem'>
        <List.Item.Meta
          title=<Title level={5}>{`${index + 1}. ${item.subject}`}</Title>
          description={
            <>
              <p style={{ marginBottom: 0, marginTop: 0, fontSize: 'small' }}>Sent On: {item.chatDate.month} {item.chatDate.dayOfMonth} {item.chatDate.year} | Sent From: {item.contactEmail} </p>
              <p>{item.content}</p>
            </>
          }
        />
        <TaskStatus finish={item.finished} />
        <Button type='link' icon={<DeleteOutlined />} onClick={() => handleDeleteClick(item.id)}>Delete</Button>
      </List.Item>
    );
  };

  const handleSendMessage = () => {
    fetchChatMessages();
  };

  const showModal = () => {
    setChatFormVisible(true);
  };
  
  return (
    <>
      <Button style={{ margin: '50px' }} onClick={showModal}>
        Contact Us
      </Button>
      <ChatDialog
        visible={chatFormVisible}
        onClose={handleChatFormClose}
        onSendMessage={handleSendMessage} // <-- pass this function to the ChatDialog component
      />
      <List
        style={{ width: '100%' }}
        dataSource={chatMessages.sort((a, b) => new Date(b.id) - new Date(a.id))}
        renderItem={renderItem}
      />
      <Modal
        visible={deleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        title='Are you sure you want to delete this message?'
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default ChatForm;