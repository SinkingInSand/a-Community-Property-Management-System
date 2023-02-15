import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from "../utils";

class SignupForm extends React.Component {
  state = {
    displayModal: false,
  };

  handleCancel = () => {
    this.setState({
      displayModal: false,
    });
  };

  signupOnClick = () => {
    this.setState({
      displayModal: true,
    });
  };

  onFinish = (data) => {
    signup(data)
      .then(() => {
        this.setState({
          displayModal: false,
        });
        message.success(`Successfully signed up`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  render = () => {
    return (
      <>
        <Button shape="round" type="link" onClick={this.signupOnClick}>
          Register
        </Button>
        <Modal
          title="Register"
          visible={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true} //destroy the content inside modal
        >
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            preserve={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: "Please input your user name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="User Name" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="unitNumber"
              rules={[
                { required: true, message: "Please input your unit number!" },
              ]}
            >
              <Input placeholder="Unit Number" />
            </Form.Item>
      

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
}

export default SignupForm;