import { Button, Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login, getUser } from "../utils";
import SignupForm from "./SignupForm";

const LoginForm = (props) => {
  const { handleLoggedIn } = props;
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {//get user data
    setLoadingUser(true);    
    getUser()
      .then((data) => {
        setUserInfo(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingUser(false);          
      });
  }, []);  
  
  const onFinish = (data) => {
    setLoading(true);
  
    login(data)
      .then(() => {
        message.success(`Login Successful`);
        handleLoggedIn(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Form
        name="normal_login"
        onFinish={onFinish}
        style={{
          width: 300,
          margin: "auto",
          paddingTop: "100px",
          visibility: true,
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            loading={loading}
            style={{ marginRight: '20px' }}
          >
            Login
          </Button>
          Or <SignupForm />
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
