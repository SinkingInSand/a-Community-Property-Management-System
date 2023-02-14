import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";


const LoginForm =(props)=>{
  const [isLoggedIn, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(true);
    // console.log("login form, isloggedin ", isLoggedIn)
    props.handelTempLogin(true);
  }
  



  return (
    <Form
        name="normal_login"
        // onFinish={this.onFinish}
        style={{
          width: 300,
          margin: "auto",
          paddingTop: "100px"
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item> 
          {/* <Checkbox>Admin</Checkbox> */}
          <Button type="primary" onClick={handleLogin}>Login</Button>
          </Form.Item>
   
    </Form>
  )
}
export default LoginForm;




// class LoginForm extends React.Component {
//   state = {
//     loading: false,
//     isAdmin: false,
//   };

//   onFinish = (data) => {
//     this.setState({
//       loading: true,
//     });
//     login(data)
//       .then(() => {
//         message.success(`Login Successful`);
//         this.props.onSuccess();
//       })
//       .catch((err) => {
//         message.error(err.message);
//       })
//       .finally(() => {
//         this.setState({
//           loading: false,
//         });
//       });
//   };

//   onChange = (e) => {
//     console.log('checked = ', e.target.checked);
//     this.state = {isAdmin: !this.state.isAdmin}
//     // this.state.isAdmin(e.target.checked);
//     console.log("isAdmin? ", this.state.isAdmin);
//   };

//   render = () => {
//     return (
//       <Form
//         name="normal_login"
//         onFinish={this.onFinish}
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
//           <Checkbox onChange={this.onChange}>Admin</Checkbox>
//           <Button type="primary" htmlType="submit" loading={this.state.loading}>
//             Login
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   };
// }

// export default LoginForm;