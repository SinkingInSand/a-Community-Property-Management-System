import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";
import SignupForm from "./SignupForm";

// const LoginForm =(props)=>{
//   const [isLoggedIn, setLogin] = useState(false);

//   const handleLogin = () => {
//     setLogin(true);
//     // console.log("login form, isloggedin ", isLoggedIn)
//     props.handelTempLogin(true);
//   }

//   return (
//     <Form
//         name="normal_login"
//         // onFinish={this.onFinish}
//         style={{
//           width: 300,
//           margin: "auto",
//           paddingTop: "100px"
//         }}
//       >
//         <Form.Item
//           name="username"
//           rules={[{ required: true, message: "Please input your Username!" }]}
//         >
//           <Input prefix={<UserOutlined />} placeholder="Username" />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please input your Password!" }]}
//         >
//           <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//         </Form.Item>

//         <Form.Item>
//           {/* <Checkbox>Admin</Checkbox> */}
//           <Button type="primary" onClick={handleLogin}>Login</Button>
//           </Form.Item>

//     </Form>
//   )
// }
// export default LoginForm;

const LoginForm = (props) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleLogin = () => {
  //   // setLogin(true);
  //   // console.log("login form, isloggedin ", isLoggedIn)
  //   props.handelTempLogin(true);
  // };

  const onFinish = (data) => {
    // props.handelTempLogin(true); //temp solution for testing
    setLoading(true);

    login(data)
      .then(() => {
        message.success(`Login Successful`);
        props.onSuccess();
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
