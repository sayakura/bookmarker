import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox, Avatar, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import ParticlesBg from "particles-bg";

const SignIn = () => {
  const onFinish = (values) => {
    const router = useRouter();
    if (values.username && values.password) {
      console.log('Received values of form: ', values);
      router.push(values.username);
    }
  };
  return (
    <Form
    style={{backgroundColor : "white"}}
    name="normal_login"
    className="form"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
  >
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your Username!',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <a className="login-form-forgot" href="">
        Forgot password
      </a>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button" block>
        Log in
      </Button>
      Or <a href="">register now!</a>
    </Form.Item>
  </Form>
  )
}


const Index = () => {
  const [ signIn, setSignIn ] = useState(true);
  const config = {
    num: [10, 20],
    rps: 0.1,
    radius: [20, 60],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [.1, 0.4],
    position: "all",
    color: ["random", "#ff0000"],
    cross: "dead",
    random: 15
  };
  
  return (
    <div style={{height: "100vh", width: "100%"}}>
    {/* <ParticlesBg color="#0062ff" type="cobweb" config={config} bg={true} />
    {
      signIn ? 
      <SignIn /> :
      <SignIn />
    } */}
    </div>
  );
};

class Home extends React.Component {
  render() {
    return (
      <>
        <Index/>
      </>
    )
  }
}

export default Home;