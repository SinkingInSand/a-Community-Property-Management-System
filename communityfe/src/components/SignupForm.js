import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from "../utils";

const SignupForm = (props) => {

  const [displayModal, setDisplayModal] = useState(false);

  const onFinish = (data) => {
    signup(data)
      .then(() => {
        setDisplayModal(false);
        message.success(`Successfully signed up`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

    return (
      <>
        <Button shape="round" type="link" onClick={() => {setDisplayModal(true)}}>
          register now!
        </Button>
        <Modal
          title="Register"
          open={displayModal}
          onCancel={() => {setDisplayModal(false)}}
          footer={null}
          destroyOnClose={true} //destroy the content inside modal
        >
          <Form
            name="normal_register"
            onFinish={onFinish}
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

}

export default SignupForm;