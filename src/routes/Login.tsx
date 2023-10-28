import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useAuth } from "../provider/AuthProvider";
import { UserAuth } from "../types";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (data: UserAuth) => {
    if (await login?.(data)) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<UserAuth>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<UserAuth>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
