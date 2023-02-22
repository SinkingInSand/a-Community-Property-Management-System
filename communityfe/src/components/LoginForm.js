import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login, getUser } from "../utils";
import SignupForm from "./SignupForm";


const LoginForm = (props) => {
  // const [isLoggedIn, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [asAdmin, setAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  // const handleLogin = () => {
  //   // setLogin(true);
  //   // console.log("login form, isloggedin ", isLoggedIn)
  //   props.handelTempLogin(true);
  // };

  

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
    props.handelTempLogin(true); //temp solution for testing
    setLoading(true);
    props.onSuccess(userInfo);
    // if (userInfo[1] === "ADMIN"){
    //   // setAdmin(true);//set the admin is true
      
    //   props.onSuccess(userInfo);
    //   // console.log("If Admin after login: ", asAdmin);
    // }

    login(data)
      .then(() => {
        message.success(`Login Successful`);
        // props.onSuccess(); 
        // console.log("user info: ", userInfo[1])
        // console.log("user info: ", userInfo);  
 
        // if (userInfo[1] === "ADMIN"){
        //   setAdmin(true);//set the admin is true
        //   console.log("If Admin after login: ", asAdmin);
        // }
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
          <SignupForm />
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
