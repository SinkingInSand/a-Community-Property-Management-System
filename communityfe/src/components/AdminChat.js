import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Typography, Layout, message, Checkbox} from "antd";
//import { getAdminChat } from "../utils";

const { Title } = Typography;

const AdminChat = () => {

  //console.log(getAdminChat())

  const [chatMessages, setAdminChat] = useState([]);

  const handleCompleted = () => {
      //placeholder for task complete
  };

//   useEffect(() => {
//       setLoadingAdminChat(true);
//       getAdminChat()
      
//         .then((data) => {
//           setAdminChat(data);
//         })
//         .catch((err) => {
//           message.error(err.message);
//         })
//         .finally(() => {
//           setLoadingAdminChat(false);
//         });

//     }, []);

  return (
     <>
     <Form>
       <Title level={3}>Messages: </Title>
        {chatMessages.map(
          (item) => {
            return <><Form.Item className="postItem">
              <Title level={3}>{"Subject: " + item.subject}</Title>
              <p>{item.content}</p>
              {/* {renderDeletButton()} */}              
              <Checkbox>Task Completed</Checkbox>
            </Form.Item>
            </>
          }
        )}
      
    {/* checked={componentDisabled}
    onChange={(e) => setComponentDisabled(e.target.checked)} */}  

    <><Form.Item className="postItem">
        <Title level={3}>{"Subject: " }</Title>
        <p>content</p>
        {/* {renderDeletButton()} */}              
        <Checkbox onClick={handleCompleted}>Task Completed</Checkbox>
      </Form.Item>
      </>
     </Form>     
   </>
  );
};


export default AdminChat;

